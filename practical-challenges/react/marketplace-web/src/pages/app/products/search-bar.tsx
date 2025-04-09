import { zodResolver } from '@hookform/resolvers/zod'
import { SaleTag02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'

const options = [
  {
    key: '',
    value: 'Status',
  },
  {
    key: 'available',
    value: 'Anunciado',
  },
  {
    key: 'sold',
    value: 'Vendido',
  },
  {
    key: 'cancelled',
    value: 'Desativado',
  },
]

const searchBarSchema = z.object({
  query: z.string(),
  category: z.string(),
})

type SearchBarInputs = z.infer<typeof searchBarSchema>

export function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<SearchBarInputs>({
    resolver: zodResolver(searchBarSchema),
  })

  const selectedOption = watch('category')

  const clearSelection = () => {
    setValue('category', '')
  }

  function handleSearch(data: SearchBarInputs) {
    console.log(data)
  }

  return (
    <div className="flex flex-col rounded-[20px] bg-white p-6">
      <h1 className="font-DMSans mb-6 text-lg font-bold text-gray-300">
        Filtrar
      </h1>
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="group mb-5">
          <Input
            type="text"
            placeholder="Pesquisar"
            icon={Search01Icon}
            {...register('query')}
          />
        </div>
        <div className="group mb-10">
          <Select
            icon={SaleTag02Icon}
            id="status"
            options={options}
            {...register('category')}
            selectedOption={selectedOption}
            clearSelection={clearSelection}
          />
        </div>
        <Button disabled={isSubmitting} type="submit" centralized>
          Aplicar filtro
        </Button>
      </form>
    </div>
  )
}
