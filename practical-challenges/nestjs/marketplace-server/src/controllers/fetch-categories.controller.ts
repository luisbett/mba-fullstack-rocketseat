import { Controller, HttpCode, Get } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Controller('/categories')
export class FetchCategoriesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @HttpCode(201)
  async handle() {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        title: 'asc',
      },
    })

    return {
      categories,
    }
  }
}
