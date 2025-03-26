import {
  ArrowLeft02Icon,
  Tick02Icon,
  UnavailableIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Label } from '@/components/label'

export function EditProduct() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col px-42 py-16">
      <div className="grid w-full gap-2">
        <div
          className="text-orange-base flex cursor-pointer items-center gap-2 text-sm font-medium"
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
            <div className="flex cursor-pointer items-center gap-2">
              <HugeiconsIcon icon={Tick02Icon} />
              <span>Marcar como vendido</span>
            </div>
            <div className="flex cursor-pointer items-center gap-2">
              <HugeiconsIcon icon={UnavailableIcon} />
              <span>Desativar anúncio</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[415px_1fr] gap-6">
        <div className="bg-shape flex h-[340px] flex-col items-center justify-center gap-4 rounded-[20px]"></div>
        <div className="rounded-[20px] bg-white p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-DMSans text-lg font-bold text-gray-300">
              Dados do produto
            </h1>
            <span className="bg-blue-dark flex h-5 items-center justify-center rounded-full px-1 py-2 text-[10px] font-medium text-white">
              ANUNCIADO
            </span>
          </div>
          <form className="mt-8 flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="flex flex-1 flex-col">
                <Label>TÍTULO</Label>
                <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
                  <input
                    type="text"
                    placeholder="Nome do produto"
                    className="w-full outline-0"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Label>VALOR</Label>
                <div className="flex gap-2 border-b-1 border-gray-200 py-3.5">
                  <input
                    type="text"
                    placeholder="0,00"
                    className="w-full outline-0"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 border-b-1 border-gray-200 py-3.5">
              <Label>DESCRIÇÃO</Label>
              <textarea
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                className="outline-0"
              />
            </div>
            <div className="flex flex-col gap-3.5 border-b-1 border-gray-200 py-3.5">
              <Label>CATEGORIA</Label>
              <select
                name="category"
                id="category"
                className="text-gray-300 outline-0"
              >
                <option value="">Selecione</option>
                <option value="toy">Brinquedo</option>
                <option value="furniture">Móvel</option>
                <option value="stationary">Papelaria</option>
                <option value="health">Saúde & Beleza</option>
                <option value="utensil">Utensílio</option>
                <option value="clothing">Vestuário</option>
              </select>
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
