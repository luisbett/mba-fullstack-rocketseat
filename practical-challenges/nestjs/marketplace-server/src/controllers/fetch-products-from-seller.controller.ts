import { CurrentUser } from '@/auth/current-user-decorator'
import type { UserPayload } from '@/auth/jwt.strategy'
import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/products/me')
@UseGuards(AuthGuard('jwt'))
export class FetchProductsFromSellerController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const seller = await this.prisma.seller.findUnique({
      where: {
        id: user.sub,
      },
    })

    if (!seller) {
      throw new NotFoundException('Seller not found')
    }

    const products = await this.prisma.product.findMany({
      where: {
        owner: {
          id: user.sub,
        },
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
