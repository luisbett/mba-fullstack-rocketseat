import { zodResolver } from '@hookform/resolvers/zod'
import { SaleTag02Icon, Search01Icon } from '@hugeicons/core-free-icons'
import { useForm } from 'react-hook-form'
import { SetURLSearchParams } from 'react-router'
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

export interface SearchBarProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
  setSearchParams: SetURLSearchParams
}

const searchBarSchema = z.object({
  query: z.string(),
  status: z.string(),
})

type SearchBarInputs = z.infer<typeof searchBarSchema>

export function SearchBar({
  search,
  setSearch,
  status,
  setStatus,
  setSearchParams,
}: SearchBarProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<SearchBarInputs>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      query: search,
      status,
    },
  })

  const selectedOption = watch('status')

  const clearSelection = () => {
    setValue('status', '')
  }

  function handleSearch(data: SearchBarInputs) {
    setSearch(data.query)
    setStatus(data.status)

    const params: Record<string, string> = {}

    if (data.query.trim() !== '') {
      params.search = data.query
    }

    if (data.status.trim() !== '') {
      params.status = data.status
    }

    setSearchParams(params)
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
            {...register('status')}
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
