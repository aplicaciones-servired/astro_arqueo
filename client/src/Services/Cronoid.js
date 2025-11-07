import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useEmpresa } from "../components/ui/useEmpresa";
import axios from "axios";
import { API_URL } from "@/utils/constans";
export function Cronoid(id) {
    const [data, setData] = useState([]);
    const { empresa } = useEmpresa();
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.post(`http://localhost:3000/cronogramaid/${empresa}/${id}`);
                const response = await axios.post(`${API_URL}/cronogramaid/${empresa}/${id}`);
                setData(response.data.datos);
            }
            catch {
                toast.error("Error al cargar los datos", { duration: 1000 });
            }
        };
        void fetchData();
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    }, []);
    return {
        data,
    };
}
