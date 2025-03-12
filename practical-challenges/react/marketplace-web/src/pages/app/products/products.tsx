import { SearchBar } from './search-bar'

export function Products() {
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
        <div>Cards</div>
      </div>
    </div>
  )
}
