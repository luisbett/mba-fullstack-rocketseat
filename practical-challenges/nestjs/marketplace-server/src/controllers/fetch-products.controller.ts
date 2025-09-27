import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class FetchProductsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const products = await this.prisma.product.findMany({
      orderBy: {
        title: 'asc',
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

    return { products }
  }
}
