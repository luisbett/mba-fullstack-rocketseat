export interface ProductTagProps {
  status: 'available' | 'sold' | 'cancelled'
}

export function ProductTag({ status }: ProductTagProps) {
  return (
    <>
      {status === 'available' && (
        <span className="bg-blue-dark flex h-5 items-center justify-center rounded-full px-1 py-2 text-[10px] font-medium text-white">
          ANUNCIADO
        </span>
      )}
      {status === 'sold' && (
        <span className="bg-success flex h-5 items-center justify-center rounded-full px-1 py-2 text-[10px] font-medium text-white">
          VENDIDO
        </span>
      )}
      {status === 'cancelled' && (
        <span className="flex h-5 items-center justify-center rounded-full bg-gray-300 px-1 py-2 text-[10px] font-medium text-white">
          DESATIVADO
        </span>
      )}
    </>
  )
}
