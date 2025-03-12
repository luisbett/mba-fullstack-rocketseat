import {
  ChartHistogramIcon,
  Package03Icon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router'

import { Button } from './button'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <div className="border-shape flex items-center justify-between border-b-1 px-5 py-5">
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
        <Button size="small">
          <HugeiconsIcon icon={PlusSignIcon} />
          Novo produto
        </Button>
        <img
          src="https://github.com/luisbett.png"
          alt=""
          className="h-12 w-12 rounded-xl"
        />
      </div>
    </div>
  )
}
