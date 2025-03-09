import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="font-Poppins">
      <h1>Cabeçalho</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
