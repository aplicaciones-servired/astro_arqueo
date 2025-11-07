import { useMemo, useState } from 'react';
import { format, parse } from 'date-fns';
function filterByToday(pdv) {
    const hoy = format(new Date(), 'yyyy-MM-dd');
    return pdv.filter(({ fechavisita }) => {
        if (!fechavisita)
            return false;
        const parsedDate = parse(fechavisita, 'yyyy-MM-dd', new Date());
        return format(parsedDate, 'yyyy-MM-dd') === hoy;
    });
}
export function useFilterPro(pdv) {
    const [searchPDV, setSearchPDV] = useState('');
    const [searchPDS, setSearchPDS] = useState('');
    const [searchPVDS, setSearchPVDS] = useState('');
    const safePDV = Array.isArray(pdv) ? pdv : []; // ✅ evita crash si pdv no es array
    const filteredPDV = useMemo(() => {
        let filtered = filterByToday(safePDV);
        return filtered;
    }, [safePDV, searchPDS]);
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
