import {
  ConflictException,
  Body,
  Controller,
  UsePipes,
  BadRequestException,
  Put,
  UseGuards,
  NotFoundException,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import z from 'zod'
import { CurrentUser } from '@/auth/current-user-decorator'
import type { UserPayload } from '@/auth/jwt.strategy'
import { AuthGuard } from '@nestjs/passport'

const updateSellerBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.email(),
  avatarId: z.uuid().optional(),
  password: z.string(),
  newPassword: z.string(),
})

type UpdateSellerBodySchema = z.infer<typeof updateSellerBodySchema>

@Controller('/sellers')
@UseGuards(AuthGuard('jwt'))
export class UpdateSellerController {
  constructor(private prisma: PrismaService) {}

  @Put()
  @UsePipes(new ZodValidationPipe(updateSellerBodySchema))
  async handle(
    @Body()
    body: UpdateSellerBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, phone, email, avatarId, password, newPassword } = body

    const seller = await this.prisma.seller.findUnique({
      where: {
        id: user.sub,
      },
    })

    if (!seller) {
      throw new NotFoundException('Seller not found')
    }

    const attachment = await this.prisma.attachments.findUnique({
      where: {
        id: avatarId,
      },
    })

    if (!attachment) {
      throw new NotFoundException('Attachment not found')
    }

    const userWithSamePhone = await this.prisma.seller.findUnique({
      where: {
        phone,
      },
    })

    if (userWithSamePhone) {
      throw new ConflictException(
        'Seller with same phone number already exists.',
      )
    }

    const userWithSameEmail = await this.prisma.seller.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'Seller with same e-mail address already exists.',
      )
    }

    const userPassword = await this.prisma.seller.findUnique({
      where: {
        id: user.sub,
      },
    })

    if (password !== userPassword?.password) {
      throw new BadRequestException('Invalid credentials.')
    }

    if (password === newPassword) {
      throw new BadRequestException('New password must be different.')
    }

    const hashedPassword = await hash(newPassword, 8)

    const response = await this.prisma.seller.update({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        attachmentId: avatarId,
      },
      where: {
        id: user.sub,
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
