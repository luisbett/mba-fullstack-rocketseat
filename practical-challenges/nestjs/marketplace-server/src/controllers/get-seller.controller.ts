import { Controller, HttpCode, Get, UseGuards } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CurrentUser } from '@/auth/current-user-decorator'
import type { UserPayload } from '@/auth/jwt.strategy'
import { AuthGuard } from '@nestjs/passport'

@Controller('/sellers/me')
@UseGuards(AuthGuard('jwt'))
export class GetSellerController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(200)
  async handle(@CurrentUser() user: UserPayload) {
    const userId = user.sub

    const response = await this.prisma.seller.findUnique({
      where: {
        id: userId,
      },
      include: {
        avatar: true,
      },
      omit: {
        password: true,
        attachmentId: true,
      },
    })

    return {
      seller: response,
    }
  }
}
