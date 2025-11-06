import { type JSX } from 'react'
import { RenderFooterClients } from './Arqueo/paginationArq'
import { useCrono } from '@/Services/GetCrono';
import { TableCronograma } from './GetCrono/TableCronograma';
import { Exportcom } from './Arqueo/Exportcom';


const GetCronograma = (): JSX.Element => {

    const { data, page, handlePageChange, total } = useCrono();


    return (
        <div className="container px-4 mx-auto">
            <Exportcom data={data} tipo="cronograma" />
            
            <TableCronograma datos={data} />

            <RenderFooterClients
                page={page}
                total={total}
                setPage={handlePageChange}
            />

        </div>
    )
}

export default GetCronograma
