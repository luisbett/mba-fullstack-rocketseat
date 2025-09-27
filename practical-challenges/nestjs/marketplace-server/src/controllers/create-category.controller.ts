import { Body, Controller, Post, UsePipes, HttpCode } from '@nestjs/common'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'
import { PrismaService } from '@/prisma/prisma.service'
import z from 'zod'

function slugify(title: string) {
  return title
    .toLowerCase() // lowercase
    .trim() // remove spaces from start and end
    .normalize('NFD') // normalize accents
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/-+/g, '-') // collapse multiple -
}

const createCategoryBodySchema = z.object({
  title: z.string(),
})

type CreateCategoryBodySchema = z.infer<typeof createCategoryBodySchema>

@Controller('/categories')
export class CreateCategoryController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCategoryBodySchema))
  async handle(
    @Body()
    body: CreateCategoryBodySchema,
  ) {
    const { title } = body

    const slug = slugify(title)

    await this.prisma.category.create({
      data: {
        title,
        slug,
      },
    })
  }
}
