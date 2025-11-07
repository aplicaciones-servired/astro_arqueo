import { useMemo, useState } from 'react';
function filterByFecha(pdv, searchFecha) {
    return pdv.filter(({ fechavisita }) => fechavisita?.toLowerCase().includes(searchFecha.toLowerCase()) ?? false);
}
function filterByPDV(pdv, searchPDV) {
    return pdv.filter(({ puntodeventa }) => puntodeventa?.toString().includes(searchPDV.toLowerCase()) ?? false);
}
export function useFilter(pdv) {
    const [searchfecha, setSearchFecha] = useState('');
    const [searchPDV, setSearchPDV] = useState('');
    const filteredPDV = useMemo(() => {
        let filtered = pdv;
        if (searchfecha.length > 0)
            filtered = filterByFecha(filtered, searchfecha);
        if (searchPDV.length > 0)
            filtered = filterByPDV(filtered, searchPDV);
        return filtered;
    }, [pdv, searchPDV, searchfecha]);
    return { searchfecha, searchPDV, setSearchFecha, setSearchPDV, filteredPDV };
}
