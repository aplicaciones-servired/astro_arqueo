import { useMemo, useState } from 'react';
import { format, parse } from 'date-fns';
// 🔥 Filtro por el día actual
function filterByToday(pdv) {
    const hoy = format(new Date(), 'yyyy-MM-dd');
    return pdv.filter(({ fechavisita }) => {
        if (fechavisita.length === 0)
            return false;
        const parsedDate = parse(fechavisita, 'yyyy-MM-dd', new Date());
        return format(parsedDate, 'yyyy-MM-dd') === hoy;
    });
}
function filterByPDV(pdv, searchPDV) {
    return pdv.filter(({ fechavisita }) => {
        if (fechavisita.length === 0)
            return false;
        const parsedDate = parse(fechavisita, 'yyyy-MM-dd', new Date());
        const fecha = format(parsedDate, 'yyyy-MM-dd');
        return fecha.includes(searchPDV);
    });
}
export function useFilterPro(pdv) {
    const [searchPDV, setSearchPDV] = useState('');
    const [searchPDS, setSearchPDS] = useState('');
    const [searchPVDS, setSearchPVDS] = useState('');
    const filteredPDV = useMemo(() => {
        let filtered = pdv;
        // 👇 Siempre filtra por el día actual en lugar del mes
        filtered = filterByToday(filtered);
        // Si el usuario busca manualmente, sobreescribe el filtro de hoy
        if (searchPDV.length > 0) {
            filtered = filterByPDV(filtered, searchPDV);
        }
        return filtered;
    }, [pdv, searchPDV, searchPDS, searchPVDS]);
    return {
        searchPDV,
        searchPDS,
        searchPVDS,
        setSearchPDV,
        setSearchPDS,
        setSearchPVDS,
        filteredPDV
    };
}
