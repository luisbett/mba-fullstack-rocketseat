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

import { Label } from '../../components/label'

export function SignUp() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-3 rounded-4xl bg-white px-20 py-18">
      <div className="flex flex-col gap-2">
        <h1 className="font-DMSans text-2xl leading-[1.2] tracking-tight text-gray-500">
          Crie sua conta
        </h1>
        <p className="font-Poppins text-sm leading-[1.2] text-gray-300">
          Informe os seus dados pessoais e de acesso
        </p>
      </div>
      <form className="mt-12 flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <h2 className="font-DMSans text-lg leading-[1.2] font-bold text-gray-500">
            Perfil
          </h2>
          <div className="bg-shape flex h-30 w-30 items-center justify-center rounded-xl">
            <HugeiconsIcon
              icon={ImageUpload01Icon}
              className="text-orange-base h-8 w-8"
            />
          </div>
          <div className="flex flex-col">
            <Label>NOME</Label>
            <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
              <HugeiconsIcon
                icon={User02Icon}
                className="h-6 w-6 text-gray-200"
              />
              <input
                type="text"
                placeholder="Seu nome completo"
                className="font-Poppins w-full outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label>TELEFONE</Label>
            <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
              <HugeiconsIcon icon={Call02Icon} className="text-gray-200" />
              <input
                type="phone"
                placeholder="(00) 00000-0000"
                className="font-Poppins w-full outline-0"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="font-DMSans text-lg leading-[1.2] font-bold text-gray-500">
            Acesso
          </h2>
          <div className="flex flex-col">
            <Label>E-MAIL</Label>
            <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
              <HugeiconsIcon icon={Mail02Icon} className="text-gray-200" />
              <input
                type="email"
                placeholder="Seu e-mail de acesso"
                className="font-Poppins w-full outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label>SENHA</Label>
            <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
              <HugeiconsIcon icon={AccessIcon} className="text-gray-200" />
              <input
                type="password"
                placeholder="Senha de acesso"
                className="font-Poppins w-full outline-0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label>CONFIRMAR SENHA</Label>
            <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
              <HugeiconsIcon icon={AccessIcon} className="text-gray-200" />
              <input
                type="password"
                placeholder="Confirme a senha"
                className="font-Poppins w-full outline-0"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="font-Poppins bg-orange-base flex cursor-pointer items-center justify-between rounded-[10px] px-5 py-4 leading-[1.2] font-medium text-white"
        >
          Cadastrar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </button>
      </form>
      <div className="mt-20 flex flex-col gap-5">
        <p className="font-Poppins leading-[1.2] text-gray-300">
          Já tem uma conta?
        </p>
        <button
          type="button"
          onClick={() => navigate('/sign-in')}
          className="font-Poppins border-orange-base text-orange-base flex cursor-pointer items-center justify-between rounded-[10px] border px-5 py-4 leading-[1.2] font-medium"
        >
          Acessar
          <HugeiconsIcon icon={ArrowRight02Icon} />
        </button>
      </div>
    </div>
  )
}
