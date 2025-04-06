import { zodResolver } from '@hookform/resolvers/zod'
import { ImageUpload01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { TextArea } from '@/components/textarea'

const options = [
  {
    key: '',
    value: 'Selecione',
  },
  {
    key: 'toy',
    value: 'Brinquedo',
  },
  {
    key: 'furniture',
    value: 'Móvel',
  },
  {
    key: 'stationary',
    value: 'Papelaria',
  },
  {
    key: 'health',
    value: 'Saúde & Beleza',
  },
  {
    key: 'utensil',
    value: 'Utensílio',
  },
  {
    key: 'clothing',
    value: 'Vestuário',
  },
]

const newProductSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  price: z.number().min(1, 'Valor obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  category: z.string().min(1, 'Categoria obrigatória'),
})

type NewProductSchemaInputs = z.infer<typeof newProductSchema>

export function NewProduct() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<NewProductSchemaInputs>({
    resolver: zodResolver(newProductSchema),
  })

  const selectedOption = watch('category')

  const clearSelection = () => {
    setValue('category', '')
  }

  function handleNewProdcut(data: NewProductSchemaInputs) {
    console.log(data)
  }

  return (
    <div className="flex flex-col px-42 py-16">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-DMSans text-2xl font-bold text-gray-500">
          Novo produto
        </h1>
        <p className="text-sm text-gray-300">
          Cadastre um produto para venda no marketplace
        </p>
      </div>
      <div className="mt-10 grid grid-cols-[415px_1fr] gap-6">
        <div className="bg-shape flex h-[340px] flex-col items-center justify-center gap-4 rounded-[20px]">
          <HugeiconsIcon
            icon={ImageUpload01Icon}
            className="text-orange-base h-10 w-10"
          />
          <span className="text-sm text-gray-300">
            Selecione a imagem do produto
          </span>
        </div>
        <div className="rounded-[20px] bg-white p-8">
          <h1 className="font-DMSans text-lg font-bold text-gray-300">
            Dados do produto
          </h1>
          <form
            onSubmit={handleSubmit(handleNewProdcut)}
            className="mt-8 flex flex-col gap-5"
          >
            <div className="flex gap-5">
              <div className="group flex flex-1 flex-col">
                <Input
                  label="Título"
                  type="text"
                  placeholder="Nome do produto"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>
              <div className="group flex flex-col">
                <Input
                  label="Valor"
                  type="text"
                  placeholder="0,00"
                  {...register('price', { valueAsNumber: true })}
                  error={errors.price?.message}
                />
              </div>
            </div>
            <div className="group">
              <TextArea
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                {...register('description')}
                error={errors.description?.message}
              />
            </div>
            <div className="group">
              <Select
                label="Categoria"
                id="category"
                options={options}
                {...register('category')}
                error={errors.category?.message}
                selectedOption={selectedOption}
                clearSelection={clearSelection}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="medium"
                type="button"
                centralized
                onClick={() => navigate('/products')}
              >
                Cancelar
              </Button>
              <Button
                disabled={isSubmitting}
                size="medium"
                type="submit"
                centralized
              >
                Salvar e publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
