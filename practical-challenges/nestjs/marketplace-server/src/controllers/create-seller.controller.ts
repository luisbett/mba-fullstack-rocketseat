import {
  ConflictException,
  Body,
  Controller,
  Post,
  UsePipes,
  HttpCode,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import z from 'zod'

const createSellerBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.email(),
  avatarId: z.uuid().optional(),
  password: z.string(),
  passwordConfirmation: z.string(),
})

type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>

@Controller('/sellers')
export class CreateSellerController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createSellerBodySchema))
  async handle(
    @Body()
    body: CreateSellerBodySchema,
  ) {
    const { name, phone, email, avatarId, password, passwordConfirmation } =
      body

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

    const attachment = await this.prisma.attachments.findUnique({
      where: {
        id: avatarId,
      },
    })

    if (!attachment) {
      throw new NotFoundException('Attachment not found')
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException(
        'Password and password confirmation does not match.',
      )
    }

    const hashedPassword = await hash(password, 8)

    const response = await this.prisma.seller.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        attachmentId: avatarId,
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
