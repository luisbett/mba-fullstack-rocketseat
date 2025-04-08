import { zodResolver } from '@hookform/resolvers/zod'
import {
  AccessIcon,
  ArrowRight02Icon,
  Call02Icon,
  ImageUpload01Icon,
  Mail02Icon,
  User02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerSeller } from '@/api/register-seller'
import { Button } from '@/components/button'
import { Input } from '@/components/input'

const signUpSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  phone: z.string().min(1, 'Telefone obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
  confirmPassword: z.string().min(1, 'Confirme senha obrigatória'),
})

type SignUpInputs = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: registerSellerFn } = useMutation({
    mutationFn: registerSeller,
  })

  async function handleSignUp(data: SignUpInputs) {
    try {
      await registerSellerFn({
        name: data.name,
        phone: data.phone,
        email: data.email,
        avatarId: '',
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      })

      toast.success('Usuário cadastrado com sucesso', {
        action: {
          label: 'Login',
          onClick: () => {
            navigate('/sign-in')
          },
        },
      })
    } catch {
      toast.error('Erro ao cadastrar usuário')
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-4xl bg-white px-20 py-18">
      <div className="flex flex-col gap-2">
        <h1 className="font-DMSans text-2xl tracking-tight text-gray-500">
          Crie sua conta
        </h1>
        <p className="text-sm text-gray-300">
          Informe os seus dados pessoais e de acesso
        </p>
      </div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="mt-12 flex flex-col gap-12"
      >
        <div className="flex flex-col gap-5">
          <h2 className="font-DMSans text-lg font-bold text-gray-500">
            Perfil
          </h2>
          <div className="bg-shape flex h-30 w-30 items-center justify-center rounded-xl">
            <HugeiconsIcon
              icon={ImageUpload01Icon}
              className="text-orange-base h-8 w-8"
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              icon={User02Icon}
              {...register('name')}
              error={errors.name?.message}
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Telefone"
              type="phone"
              placeholder="(00) 00000-0000"
              icon={Call02Icon}
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-DMSans text-lg font-bold text-gray-500">
            Acesso
          </h2>
          <div className="group flex flex-col">
            <Input
              label="E-mail"
              type="email"
              placeholder="Seu e-mail de acesso"
              icon={Mail02Icon}
              {...register('email')}
              error={errors.email?.message}
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Senha"
              type="password"
              placeholder="Senha de acesso"
              icon={AccessIcon}
              {...register('password')}
              error={errors.password?.message}
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Confirmar senha"
              type="password"
              placeholder="Confirme a senha"
              icon={AccessIcon}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Cadastrar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </Button>
      </form>
      <div className="mt-20 flex flex-col gap-5">
        <p className="text-gray-300">Já tem uma conta?</p>
        <Button variant="secondary" onClick={() => navigate('/sign-in')}>
          Acessar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </Button>
      </div>
    </div>
  )
}
