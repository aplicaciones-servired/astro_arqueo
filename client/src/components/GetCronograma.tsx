import { type JSX } from 'react'
import { RenderFooterClients } from './paginationArq'
import { useCrono } from '@/Services/GetCrono';
import { TableCronograma } from './GetCrono/TableCronograma';
import { Exportcom } from './Exportcom';
import { ExportCronogramaBtn } from './ExportCronogramaBtn';


const GetCronograma = (): JSX.Element => {

    const { data, page, handlePageChange, total, searchFecha, searchPDV, handleSearchFecha, handleSearchPDV } = useCrono();


    return (
        <div className="container px-4 mx-auto">
            <ExportCronogramaBtn data={data} />
            
            <TableCronograma 
                datos={data} 
                searchFecha={searchFecha}
                searchPDV={searchPDV}
                onSearchFechaChange={handleSearchFecha}
                onSearchPDVChange={handleSearchPDV}
            />

            <RenderFooterClients
                page={page}
                total={total}
                setPage={handlePageChange}
            />

        </div>
    )
}

export default GetCronograma
