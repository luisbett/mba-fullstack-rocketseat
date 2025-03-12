import { Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="font-Poppins bg-background min-h-screen leading-[1.2] antialiased">
      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  )
}
