import { ImageUpload01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { TextArea } from '@/components/textarea'

export function NewProduct() {
  const navigate = useNavigate()

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
          <form className="mt-8 flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="group flex flex-1 flex-col">
                <Input
                  label="Título"
                  type="text"
                  placeholder="Nome do produto"
                />
              </div>
              <div className="group flex flex-col">
                <Input label="Valor" type="text" placeholder="0,00" />
              </div>
            </div>
            <div className="group">
              <TextArea
                label="Descrição"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
              />
            </div>
            <div className="group">
              <Select label="Categoria" id="category" options={options} />
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
              <Button size="medium" type="submit" centralized>
                Salvar e publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
