import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const createSellerBodySchema = z.object({
//   name: z.string(),
//   email: z.email(),
//   password: z.string(),
//   phone: z.string(),
// })

// type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  //   @UsePipes(new ZodValidationPipe(createSellerBodySchema))
  async handle() {
    const payload = { sub: 'user-id' }
    const token = this.jwt.sign(payload)
    return {
      token,
    }
  }
}
