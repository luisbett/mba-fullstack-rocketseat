import { ImageUpload01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/button'
import { Label } from '@/components/label'

export function NewProduct() {
  const navigate = useNavigate()

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
                Salvar e publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
