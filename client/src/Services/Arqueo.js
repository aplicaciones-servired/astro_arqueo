import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";
export function useArqueo() {
    const [data, setData] = useState([]);
    const [dataSegui, setDataSegui] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [state, setState] = useState({
        totalClients: 0,
    });
    const [totalClients, setTotalClients] = useState();
    const { empresa } = useEmpresa();
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.get<ArqueoResponse>(`http://localhost:3000/arqueo?zona=${empresa}&page=${page}&pageSize=${pageSize}`);
                const response = await axios.get(`${API_URL}/arqueo?zona=${empresa}&page=${page}&pageSize=${pageSize}`);
                if (response.status === 200) {
                    setData(response.data.datos);
                    setDataSegui(response.data.datos);
                    setTotalClients(response.data.count);
                    setState((prev) => ({
                        ...prev,
                        totalClients: response.data.count,
                    }));
                }
            }
            catch {
                toast.error("Error al cargar los datos", { duration: 1000 });
            }
        };
        void fetchData();
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    }, [page, pageSize, empresa]);
    const total = Math.ceil(state.totalClients / pageSize);
    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
    }, []);
    return {
        data,
        page,
        totalClients,
        handlePageChange,
        total,
        dataSegui
    };
}
