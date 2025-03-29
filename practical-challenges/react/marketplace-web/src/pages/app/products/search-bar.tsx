import { SaleTag02Icon, Search01Icon } from '@hugeicons/core-free-icons'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

export function SearchBar() {
  return (
    <div className="flex flex-col rounded-[20px] bg-white p-6">
      <h1 className="font-DMSans mb-6 text-lg font-bold text-gray-300">
        Filtrar
      </h1>
      <div className="group mb-5">
        <Input type="text" placeholder="Pesquisar" icon={Search01Icon} />
      </div>
      <div className="group mb-10">
        <Input type="text" placeholder="Status" icon={SaleTag02Icon} />
      </div>
      <Button centralized>Aplicar filtro</Button>
    </div>
  )
}
