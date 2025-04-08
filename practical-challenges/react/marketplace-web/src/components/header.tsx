import {
  ChartHistogramIcon,
  Logout01Icon,
  Package03Icon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { SignOut } from '@/api/sign-out'

import { Button } from './button'
import { NavLink } from './nav-link'

export function Header() {
  const navigate = useNavigate()

  const [showPopOver, setShowPopOver] = useState(false)

  const imageSrc = 'https://github.com/luisbett.png'

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: SignOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  return (
    <div className="border-shape relative flex items-center justify-between border-b-1 px-5 py-5">
      <Link to={'/'}>
        <img
          src="/assets/logo.svg"
          alt="Marketplace logo"
          className="h-10 w-13"
        />
      </Link>
      <nav className="flex items-center gap-2">
        <NavLink to={'/'}>
          <HugeiconsIcon icon={ChartHistogramIcon} />
          Dashboard
        </NavLink>
        <NavLink to={'/products'}>
          <HugeiconsIcon icon={Package03Icon} />
          Produtos
        </NavLink>
      </nav>
      <div className="flex items-center gap-4">
        <Button size="small" onClick={() => navigate('/new-product')}>
          <HugeiconsIcon icon={PlusSignIcon} />
          Novo produto
        </Button>
        <img
          src={imageSrc}
          alt=""
          className="h-12 w-12 cursor-pointer rounded-lg"
          onClick={() => setShowPopOver(!showPopOver)}
        />
      </div>
      {showPopOver && (
        <div className="absolute top-20 right-5 z-10 w-42 rounded-xl bg-white p-4">
          <div className="flex items-center gap-3">
            <img src={imageSrc} alt="" className="h-8 w-8 rounded-xl" />
            <span className="text-sm text-gray-300">Luis Bett</span>
          </div>
          <div className="bg-shape my-5 h-[1px]" />
          <div
            className="text-orange-base flex cursor-pointer items-center justify-between"
            onClick={() => signOutFn()}
          >
            <span className="text-sm font-medium">Sair</span>
            <HugeiconsIcon icon={Logout01Icon} />
          </div>
        </div>
      )}
    </div>
  )
}
