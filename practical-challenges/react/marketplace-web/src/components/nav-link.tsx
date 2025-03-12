import { Link, LinkProps, useLocation } from 'react-router'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="hover:text-orange-base data-[current=true]:bg-shape data-[current=true]:text-orange-base flex items-center gap-2 rounded-[10px] px-4 py-3 text-gray-300 data-[current=true]:font-medium"
      {...props}
    />
  )
}
