import {
  ConflictException,
  Body,
  Controller,
  Post,
  UsePipes,
  HttpCode,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
import z from 'zod'

const createSellerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  phone: z.string(),
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
    const { name, email, password, phone } = body

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

    const hashedPassword = await hash(password, 8)

    await this.prisma.seller.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    })
  }
}
