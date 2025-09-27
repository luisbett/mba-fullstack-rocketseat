import { Controller, Post } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/sign-out')
export class SignOutController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle() {
    // Delete cookie
  }
}
