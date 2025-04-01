import { SaleTag02Icon, Search01Icon } from '@hugeicons/core-free-icons'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

export function SearchBar() {
  const options = [
    {
      key: '',
      value: 'Status',
    },
    {
      key: 'advertised',
      value: 'Anunciado',
    },
    {
      key: 'sold',
      value: 'Vendido',
    },
    {
      key: 'inactive',
      value: 'Desativado',
    },
  ]
  return (
    <div className="flex flex-col rounded-[20px] bg-white p-6">
      <h1 className="font-DMSans mb-6 text-lg font-bold text-gray-300">
        Filtrar
      </h1>
      <div className="group mb-5">
        <Input type="text" placeholder="Pesquisar" icon={Search01Icon} />
      </div>
      <div className="group mb-10">
        <Select icon={SaleTag02Icon} id="status" options={options} />
      </div>
      <Button centralized>Aplicar filtro</Button>
    </div>
  )
}
