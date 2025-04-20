import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircleIcon, ImageUpload01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { getCategories } from '@/api/get-categories'
import { registerProduct } from '@/api/register-product'
import { UploadImage } from '@/api/upload-image'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { TextArea } from '@/components/textarea'

const ACCEPTED_IMAGE_TYPES = ['image/png']

const newProductSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'Imagem do produto obrigatória')
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      )
    }, 'Imagem precisa ser do tipo png'),
  title: z.string().min(1, 'Título obrigatório'),
  price: z.number().min(1, 'Valor obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  category: z.string().min(1, 'Categoria obrigatória'),
})

type NewProductSchemaInputs = z.infer<typeof newProductSchema>

export function NewProduct() {
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState('')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
    reset,
  } = useForm<NewProductSchemaInputs>({
    resolver: zodResolver(newProductSchema),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const selectedOption = watch('category')

  const clearSelection = () => {
    setValue('category', '')
  }

  const { mutateAsync: uploadImageFn } = useMutation({
    mutationFn: UploadImage,
  })

  const { mutateAsync: registerProductFn } = useMutation({
    mutationFn: registerProduct,
  })

  async function handleNewProdcut(data: NewProductSchemaInputs) {
    try {
      let fileId = ''

      if (data.file?.length && data.file.length > 0) {
        const files = new FormData()
        files.append('files', data.file[0])

        const uploadedFiles = await uploadImageFn({
          files,
        })

        fileId = uploadedFiles.attachments[0].id
      }

      const product = await registerProductFn({
        title: data.title,
        categoryId: data.category,
        description: data.description,
        priceInCents: data.price * 100,
        attachmentsIds: [fileId],
      })

      reset()

      toast.success('Produto cadastrado com sucesso', {
        action: {
          label: 'Ver produto',
          onClick: () => {
            navigate(`/edit-product/${product.product.id}`)
          },
        },
      })
    } catch {
      toast.error('Erro ao cadastrar produto')
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
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
        <div className="flex flex-col">
          <label
            htmlFor="file"
            className="bg-shape flex h-[340px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[20px]"
          >
            <input
              type="file"
              id="file"
              className="hidden"
              {...register('file')}
              onChange={(event) => {
                handleImageChange(event)

                register('file').onChange(event)
              }}
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt=""
                className="h-full w-full cursor-pointer rounded-[20px] object-cover"
              />
            ) : (
              <>
                <HugeiconsIcon
                  icon={ImageUpload01Icon}
                  className="text-orange-base h-10 w-10"
                />
                <span className="text-sm text-gray-300">
                  Selecione a imagem do produto
                </span>
              </>
            )}
          </label>
          {errors.file && (
            <div className="text-danger flex items-center gap-1 py-2">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-4 w-4" />
              <span className="text-xs">{errors.file.message}</span>
            </div>
          )}
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
                options={categoriesData?.categories || []}
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
