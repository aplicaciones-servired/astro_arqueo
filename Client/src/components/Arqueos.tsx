import { type JSX } from 'react'
import { RenderFooterClients } from './ui/Arqueo/paginationArq'
import { Exportcom } from './ui/Arqueo/Exportcom'
import { useArqueo } from '../Services/Arqueo'
import { TableArqueo } from './ui/Arqueo/tableArqueo'


const Arqueo = (): JSX.Element => {

    const { data, page, handlePageChange, total } = useArqueo();

    return (
        <section className="container px-4 mx-auto">
            <Exportcom data={data} />

            <TableArqueo datos={data} />

            <RenderFooterClients
                page={page}
                total={total}
                setPage={handlePageChange}
            />
        </section>
    )
}

export default Arqueo
