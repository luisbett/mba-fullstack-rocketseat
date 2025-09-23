import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/products')
@UseGuards(AuthGuard('jwt'))
export class FetchAllProductsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle() {
    const products = await this.prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
    })

    return { products }
  }
}
