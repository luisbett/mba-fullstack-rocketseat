import {
  AccessIcon,
  ArrowRight02Icon,
  Call02Icon,
  ImageUpload01Icon,
  Mail02Icon,
  User02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function SignUp() {
  const navigate = useNavigate()

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
      <form className="mt-12 flex flex-col gap-12">
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
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Telefone"
              type="phone"
              placeholder="(00) 00000-0000"
              icon={Call02Icon}
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
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Senha"
              type="password"
              placeholder="Senha de acesso"
              icon={AccessIcon}
            />
          </div>
          <div className="group flex flex-col">
            <Input
              label="Confirmar senha"
              type="password"
              placeholder="Confirme a senha"
              icon={AccessIcon}
            />
          </div>
        </div>
        <Button type="submit">
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
