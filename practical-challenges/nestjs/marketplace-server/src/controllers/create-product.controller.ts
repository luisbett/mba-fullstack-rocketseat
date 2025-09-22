import { Body, Controller, Post, UseGuards } from '@nestjs/common'
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
  attachmentsIds: z.string(),
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
    const { title, description, categoryId, priceInCents, attachmentsIds } =
      body

    await this.prisma.product.create({
      data: {
        title,
        description,
        categoryId,
        priceInCents,
        attachmentsIds,
        sellerId: user.sub,
      },
    })
  }
}
