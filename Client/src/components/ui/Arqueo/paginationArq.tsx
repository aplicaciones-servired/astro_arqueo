
interface PropsFooter {
  page: number;
  total: number;
  setPage: (newPage: number) => void
}

export const RenderFooterClients = ({ page, total, setPage }: PropsFooter) => {
  
  return (
    <footer className='flex items-center justify-between py-4 bg-white border-t border-gray-200 shadow-sm'>
      {/* Previous Button */}
      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
        className={`
          flex items-center w-52 gap-2 px-4 py-2 text-sm   font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer border border-gray-500 
          ${page === 1 
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed w-52 shadow-blue-400' 
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-100 hover:border-gray-300 hover:shadow-sm w-52 shadow-blue-400'
          }
        `}
      >
        <span>Anterior</span>
      </button>

      {/* Page Indicator */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg'>
          <span className='text-sm font-medium text-blue-700'>
            Página {page} de {total}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <button 
        disabled={page === total} 
        onClick={() => setPage(page + 1)}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 mx-2 cursor-pointer border border-gray-500 
          ${page === total 
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed w-52 shadow-blue-400' 
            : 'text-gray-700 bg-white border border-gray-200 hover:bg-blue-100 hover:border-gray-300 hover:shadow-sm w-52 shadow-blue-400'
          }
        `}
      >
        <span>Siguiente</span>
      </button>
    </footer>
  )
}