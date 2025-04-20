import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeft02Icon,
  Tick02Icon,
  UnavailableIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { editProduct } from '@/api/edit-product'
import { getCategories } from '@/api/get-categories'
import { getProductById } from '@/api/get-product-by-id'
import { setProductStatus } from '@/api/set-product-status'
import { UploadImage } from '@/api/upload-image'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ProductTag } from '@/components/product-tag'
import { Select } from '@/components/select'
import { TextArea } from '@/components/textarea'
import { urlToFileList } from '@/hooks/useUrlToFilelist'

const ACCEPTED_IMAGE_TYPES = ['image/png']

const editProductSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'Imagem do produto obrigatória')
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      )
    }, 'Imagem precisa ser do tipo png')
    .optional(),
  title: z.string().min(1, 'Título obrigatório'),
  price: z.number().min(1, 'Valor obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  category: z.string().min(1, 'Categoria obrigatória'),
})

type EditProductInputs = z.infer<typeof editProductSchema>

export function EditProduct() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const { data: productData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id: id || '' }),
  })

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      toast.success('Produto alterado com sucesso')
      setTimeout(() => navigate(0), 1000)
    },
    onError: () => {
      toast.error('Erro ao alterar produto')
    },
  })

  const { mutateAsync: setProductStatusFn } = useMutation({
    mutationFn: setProductStatus,
    onSuccess: () => {
      toast.success('Status alterado com sucesso')
      setTimeout(() => navigate(0), 1000)
    },
    onError: () => {
      toast.error('Erro ao alterar status')
    },
  })

  const [imagePreview, setImagePreview] = useState(
    productData?.product.attachments[0].url,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<EditProductInputs>({
    resolver: zodResolver(editProductSchema),
  })

  useEffect(() => {
    async function fetchFile() {
      if (productData?.product.attachments[0]?.url) {
        const fileList = await urlToFileList(
          productData.product.attachments[0].url,
          'image.png',
        )
        setValue('file', fileList)
      }
      setValue('title', productData?.product.title || '')
      setValue('price', (productData?.product.priceInCents || 0) / 100)
      setValue('description', productData?.product.description || '')
      setValue('category', productData?.product.category.id || '')
      setImagePreview(productData?.product.attachments[0]?.url)
    }

    fetchFile()
  }, [productData, setValue])

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImagePreview(url)
    }
  }

  const selectedOption = watch('category')

  const clearSelection = () => {
    setValue('category', '')
  }

  const { mutateAsync: uploadImageFn } = useMutation({
    mutationFn: UploadImage,
  })

  async function handleProductStatusChange(
    status: 'available' | 'sold' | 'cancelled',
  ) {
    await setProductStatusFn({
      id: id || '',
      status,
    })
  }

  async function handleEditProduct(data: EditProductInputs) {
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

      await editProductFn({
        id: id || '',
        title: data.title,
        categoryId: data.category,
        description: data.description,
        priceInCents: data.price * 100,
        attachmentsIds: [fileId],
      })

      toast.success('Produto alterado com sucesso')
    } catch {
      toast.error('Erro ao cadastrar produto')
    }
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
            {productData?.product.status === 'sold' ? (
              <div
                onClick={() => handleProductStatusChange('available')}
                className="hover:text-orange-dark flex cursor-pointer items-center gap-2"
              >
                <HugeiconsIcon icon={Tick02Icon} />
                <span>Marcar como disponível</span>
              </div>
            ) : productData?.product.status === 'cancelled' ? (
              <div className="text-orange-dark/65 flex cursor-not-allowed items-center gap-2">
                <HugeiconsIcon icon={Tick02Icon} />
                <span>Produto desabilitado</span>
              </div>
            ) : (
              <div
                onClick={() => handleProductStatusChange('sold')}
                className="hover:text-orange-dark flex cursor-pointer items-center gap-2"
              >
                <HugeiconsIcon icon={Tick02Icon} />
                <span>Marcar como vendido</span>
              </div>
            )}
            {productData?.product.status === 'sold' ? (
              <div className="text-orange-base/65 flex cursor-not-allowed items-center gap-2">
                <HugeiconsIcon icon={UnavailableIcon} />
                <span>Produto vendido</span>
              </div>
            ) : productData?.product.status === 'cancelled' ? (
              <div
                onClick={() => handleProductStatusChange('available')}
                className="hover:text-orange-dark flex cursor-pointer items-center gap-2"
              >
                <HugeiconsIcon icon={UnavailableIcon} />
                <span>Reativar anúncio</span>
              </div>
            ) : (
              <div
                onClick={() => handleProductStatusChange('cancelled')}
                className="hover:text-orange-dark flex cursor-pointer items-center gap-2"
              >
                <HugeiconsIcon icon={UnavailableIcon} />
                <span>Desativar anúncio</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-[415px_1fr] gap-6">
        <label
          htmlFor="file"
          className="bg-shape flex h-[340px] flex-col items-center justify-center gap-4 overflow-hidden rounded-[20px]"
        >
          <input
            type="file"
            id="file"
            className="hidden"
            disabled={
              productData?.product.status === 'sold' ||
              productData?.product.status === 'cancelled'
            }
            {...register('file')}
            onChange={(event) => {
              handleImageChange(event)

              register('file').onChange(event)
            }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt=""
              className="min-h-full min-w-full object-cover"
            />
          )}
        </label>
        <div className="rounded-[20px] bg-white p-8">
          <div className="flex items-center justify-between">
            <h1 className="font-DMSans text-lg font-bold text-gray-300">
              Dados do produto
            </h1>
            <ProductTag status={productData?.product.status || 'available'} />
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
                disabled={
                  productData?.product.status === 'sold' ||
                  productData?.product.status === 'cancelled'
                }
                onClick={() => navigate('/products')}
              >
                Cancelar
              </Button>
              <Button
                size="medium"
                type="submit"
                centralized
                disabled={
                  isSubmitting ||
                  productData?.product.status === 'sold' ||
                  productData?.product.status === 'cancelled'
                }
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
