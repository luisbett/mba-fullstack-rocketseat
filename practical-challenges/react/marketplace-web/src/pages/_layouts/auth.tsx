import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="bg-background grid min-h-screen grid-cols-2">
      <div className="col-span-1 flex flex-col">
        <div className="mt-10 mb-[50px] ml-10 flex items-center gap-5">
          <img
            src="/assets/logo.svg"
            alt="Marketplace logo"
            className="h-[70px] w-[90px]"
          />
          <div className="font-Poppins flex flex-col">
            <h1 className="text-2xl leading-[1.2] font-bold text-gray-500">
              Marketplace
            </h1>
            <span className="text-gray-400">Painel de Vendedor</span>
          </div>
        </div>
        <img src="/assets/background.png" alt="Box of products" />
      </div>
      <div className="col-span-1 max-h-screen overflow-y-scroll p-6">
        <Outlet />
      </div>
    </div>
  )
}
