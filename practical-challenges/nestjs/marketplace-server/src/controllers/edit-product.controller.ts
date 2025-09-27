import { CurrentUser } from '@/auth/current-user-decorator'
import type { UserPayload } from '@/auth/jwt.strategy'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'
import z from 'zod'

const updateProductBodySchema = z.object({
  title: z.string(),
  categoryId: z.uuid(),
  description: z.string(),
  priceInCents: z.number(),
  attachmentsId: z.string(),
})

type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateProductBodySchema)

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class UpdateProductController {
  constructor(private prisma: PrismaService) {}

  @Put('/:id')
  async handle(
    @Param() params: { id: string },
    @Body(bodyValidationPipe) body: UpdateProductBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, categoryId, priceInCents, attachmentsId } = body

    const product = await this.prisma.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    if (product.sellerId !== user.sub) {
      throw new ForbiddenException('You are not the owner of this product.')
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
        categoryId,
        priceInCents,
        attachmentId: attachmentsId,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            avatar: true,
          },
        },
        category: true,
        attachments: true,
      },
      omit: {
        sellerId: true,
        categoryId: true,
        attachmentId: true,
      },
    })

    return { product: updatedProduct }
  }
}
