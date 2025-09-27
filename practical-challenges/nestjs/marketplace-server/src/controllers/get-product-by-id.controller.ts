import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class GetProductByIDController {
  constructor(private prisma: PrismaService) {}

  @Get('/:id')
  async handle(@Param() params: { id: string }) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: params.id,
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

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return { product }
  }
}
