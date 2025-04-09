import { ProductTag } from './product-tag'

export interface ProductCardProps {
  status: 'available' | 'sold' | 'cancelled'
  category: string
  title: string
  description: string
  price: number
  imgUrl: string
}

export function ProductCard({
  status = 'available',
  category,
  title,
  description,
  price,
  imgUrl,
}: ProductCardProps) {
  return (
    <div className="hover:border-blue-base flex max-w-[330px] cursor-pointer flex-col rounded-[20px] border-2 border-transparent bg-white p-1 hover:border-2">
      <div className="relative">
        <img
          src={imgUrl}
          alt=""
          className="h-36 w-full rounded-2xl object-cover"
        />
        <div className="absolute top-2 right-3 flex gap-1">
          <ProductTag status={status} />
          <span className="flex h-5 items-center justify-center rounded-full bg-gray-400 px-1 py-2 text-[10px] font-medium text-white">
            {category.toLocaleUpperCase()}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div className="flex justify-between">
          <h1 className="font-semibold text-gray-400">{title}</h1>
          <h1 className="font-DMSans text-lg font-bold text-gray-500">
            <span className="mr-1 text-xs font-medium text-gray-500">R$</span>
            {price.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}
