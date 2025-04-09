import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/api/get-products'
import { ProductCard } from '@/components/product-card'

import { SearchBar } from './search-bar'

export function Products() {
  const { data: products } = useQuery({
    queryKey: ['me', 'products'],
    queryFn: getProducts,
  })

  return (
    <div className="flex flex-col px-42 py-16">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-DMSans text-2xl font-bold text-gray-500">
          Seus produtos
        </h1>
        <p className="text-sm text-gray-300">
          Acesse e gerencie a sua lista de produtos à venda
        </p>
      </div>
      <div className="mt-10 grid grid-cols-[330px_1fr] gap-6">
        <div>
          <SearchBar />
        </div>
        <div className="flex flex-wrap gap-4">
          {products?.products.map((product) => (
            <ProductCard
              key={product.id}
              status={product.status}
              category={product.category.slug}
              title={product.title}
              description={product.description}
              price={product.priceInCents / 100}
              imgUrl={product.attachments[0].url}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
