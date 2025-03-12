import { SaleTag02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/button'

export function SearchBar() {
  return (
    <div className="flex flex-col rounded-[20px] bg-white p-6">
      <h1 className="font-DMSans mb-6 text-lg font-bold text-gray-300">
        Filtrar
      </h1>
      <div className="mb-5 flex gap-2 border-b-1 border-gray-200 py-3.5">
        <HugeiconsIcon icon={Search01Icon} className="text-gray-200" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full outline-0"
        />
      </div>
      <div className="mb-10 flex gap-2 border-b-1 border-gray-200 py-3.5">
        <HugeiconsIcon icon={SaleTag02Icon} className="text-gray-200" />
        <input type="text" placeholder="Status" className="w-full outline-0" />
      </div>
      <Button centralized>Aplicar filtro</Button>
    </div>
  )
}
