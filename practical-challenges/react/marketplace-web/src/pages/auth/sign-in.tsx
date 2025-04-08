import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
})

type SignInInputs = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInputs>({
    resolver: zodResolver(signInSchema),
  })

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  })

  async function handleLogin(data: SignInInputs) {
    try {
      await signInFn({ email: data.email, password: data.password })

      navigate('/')
    } catch {
      toast.error('Credenciais inválidas')
    }
  }

  return (
    <div className="flex h-full flex-col gap-3 rounded-4xl bg-white px-20 py-18">
      <div className="flex flex-col gap-2">
        <h1 className="font-DMSans text-2xl tracking-tight text-gray-500">
          Acesse sua conta
        </h1>
        <p className="text-sm text-gray-300">
          Informe seu e-mail e senha para entrar
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="mt-12 flex flex-col gap-5"
      >
        <div className="group flex flex-col">
          <Input
            label="E-mail"
            type="email"
            placeholder="Seu e-mail cadastrado"
            icon={Mail02Icon}
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <div className="group flex flex-col">
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha de acesso"
            icon={AccessIcon}
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} variant="primary">
          Acessar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </Button>
      </form>
      <div className="mt-auto flex flex-col gap-5">
        <p className="text-gray-300">Ainda não tem uma conta?</p>
        <Button variant="secondary" onClick={() => navigate('/sign-up')}>
          Cadastrar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </Button>
      </div>
    </div>
  )
}
