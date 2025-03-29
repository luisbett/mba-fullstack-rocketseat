import {
  ArrowLeft02Icon,
  Tick02Icon,
  UnavailableIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ProductTag } from '@/components/product-tag'
import { Select } from '@/components/select'
import { TextArea } from '@/components/textarea'

export function EditProduct() {
  const navigate = useNavigate()

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
            <ProductTag status="advertised" />
          </div>
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
              <Select label="Categoria" />
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
                Salvar e atualizar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
