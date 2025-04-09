import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft02Icon,
  Tick02Icon,
  UnavailableIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ProductTag } from '@/components/product-tag'
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

const editProductSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  price: z.number().min(1, 'Valor obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  category: z.string().min(1, 'Categoria obrigatória'),
})

type EditProductInputs = z.infer<typeof editProductSchema>

export function EditProduct() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<EditProductInputs>({
    resolver: zodResolver(editProductSchema),
  })

  const selectedOption = watch('category')

  const clearSelection = () => {
    setValue('category', '')
  }

  function handleEditProduct(data: EditProductInputs) {
    console.log(data)
  }

  return (
    <div className="flex flex-col px-42 py-16">
      <div className="grid w-full gap-2">
        <div
          className="text-orange-base hover:text-orange-dark flex cursor-pointer items-center gap-2 text-sm font-medium"
          onClick={() => navigate('/products')}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
          Voltar
        </div>
        <h1 className="font-DMSans text-2xl font-bold text-gray-500">
          Editar produto
        </h1>
        <div className="flex justify-between">
          <p className="text-sm text-gray-300">
            Gerencie as informações do produto cadastrado
          </p>
          <div className="text-orange-base flex items-center gap-4 text-sm font-medium">
            <div className="hover:text-orange-dark flex cursor-pointer items-center gap-2">
              <HugeiconsIcon icon={Tick02Icon} />
              <span>Marcar como vendido</span>
            </div>
            <div className="hover:text-orange-dark flex cursor-pointer items-center gap-2">
              <HugeiconsIcon icon={UnavailableIcon} />
              <span>Desativar anúncio</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[415px_1fr] gap-6">
        <div className="bg-shape flex h-[340px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[20px]">
          <img
            src="/assets/clio.jpg"
            alt=""
            className="min-h-full min-w-full object-cover"
          />
        </div>
        <div className="rounded-[20px] bg-white p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-DMSans text-lg font-bold text-gray-300">
              Dados do produto
            </h1>
            <ProductTag status="available" />
          </div>
          <form
            onSubmit={handleSubmit(handleEditProduct)}
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
                size="medium"
                type="submit"
                centralized
                disabled={isSubmitting}
              >
                Salvar e atualizar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
