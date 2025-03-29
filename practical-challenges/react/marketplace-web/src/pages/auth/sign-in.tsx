import {
  AccessIcon,
  ArrowRight02Icon,
  Mail02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function SignIn() {
  const navigate = useNavigate()

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
      <form className="mt-12 flex flex-col gap-5">
        <div className="group flex flex-col">
          <Input
            label="E-mail"
            type="email"
            placeholder="Seu e-mail cadastrado"
            icon={Mail02Icon}
          />
        </div>
        <div className="group flex flex-col">
          <Input
            label="Senha"
            type="password"
            placeholder="Sua senha de acesso"
            icon={AccessIcon}
          />
        </div>
        <Button type="submit" variant="primary">
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
