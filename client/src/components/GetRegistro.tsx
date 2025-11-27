import { useVisita } from '@/Services/Visita';
import { type JSX } from 'react'
import TableVista from './RegisVisita/GetVisita';
import TableSeguimiento from './RegisVisita/GetSeguimientoAr';
import { useArqueo } from '@/Services/Arqueo';

function GetRegistro(): JSX.Element {

    const { data } = useVisita();
    
    const { dataSegui } = useArqueo();
    return (
        <>
            <div className="flex  gap-72 w-full p-4 ">
                <div className="flex">
                    <TableVista datos={data} />
                </div>

                <div className="flex">
                    <TableSeguimiento datos={dataSegui} />
                </div>
            </div >
        </>
    )
}

export default GetRegistro