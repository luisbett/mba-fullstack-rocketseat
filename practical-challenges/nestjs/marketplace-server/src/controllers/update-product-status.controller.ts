import { CurrentUser } from '@/auth/current-user-decorator'
import type { UserPayload } from '@/auth/jwt.strategy'
import {
  Controller,
  ForbiddenException,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class UpdateProductStatusController {
  constructor(private prisma: PrismaService) {}

  @Patch('/:id/:status')
  async handle(
    @Param() params: { id: string; status: 'available' | 'cancelled' | 'sold' },
    @CurrentUser() user: UserPayload,
  ) {
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

    if (product.status === params.status) {
      throw new ForbiddenException('Product is with same status already.')
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        status: params.status,
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
