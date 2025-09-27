import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/current-user-decorator'
import type { UserPayload } from 'src/auth/jwt.strategy'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import z from 'zod'

const createProductBodySchema = z.object({
  title: z.string(),
  categoryId: z.uuid(),
  description: z.string(),
  priceInCents: z.number(),
  attachmentsId: z.string(),
})

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class CreateProductController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateProductBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, categoryId, priceInCents, attachmentsId } = body

    const seller = await this.prisma.seller.findUnique({
      where: {
        id: user.sub,
      },
    })

    if (!seller) {
      throw new NotFoundException('Seller not found')
    }

    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    const attachment = await this.prisma.attachments.findUnique({
      where: {
        id: attachmentsId,
      },
    })

    if (!attachment) {
      throw new NotFoundException('Attachment not found')
    }

    const response = await this.prisma.product.create({
      data: {
        title,
        description,
        priceInCents,
        status: 'available',
        categoryId,
        sellerId: user.sub,
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

    return {
      product: response,
    }
  }
}
