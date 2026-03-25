
interface PropsFooter {
  page: number;
  total: number;
  setPage: (newPage: number) => void
}

export const RenderFooterClients = ({ page, total, setPage }: PropsFooter) => {
  const safeTotal = Math.max(total, 1);

  return (
    <footer className='pager-shell'>
      <button
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
        className='pager-btn'
      >
        <span>Anterior</span>
      </button>

      <div className='flex items-center gap-2'>
        <div className='pager-pill'>
          Página {page} de {safeTotal}
        </div>
      </div>

      <button
        disabled={page >= safeTotal}
        onClick={() => setPage(page + 1)}
        className='pager-btn'
      >
        <span>Siguiente</span>
      </button>
    </footer>
  )
}