import { API_URL } from "@/utils/constans";
import axios from "axios";
import { toast } from "sonner";
export async function CronogramaSer({ puntovdt, empresa, nota, fecha }) {
    if (!puntovdt || !empresa || !fecha) {
        toast.warning("Todos los campos son obligatorios");
        return;
    }
    try {
        // toast.promise(axios.post("http://localhost:3000/cronograma", {
        //     puntovdt,
        //     empresa,
        //     nota,
        //     fecha,
        //   }),
        toast.promise(axios.post(`${API_URL}/cronograma`, {
            puntovdt,
            empresa,
            nota,
            fecha,
        }), {
            loading: "Insertando cronograma...",
            success: "Se registró correctamente el cronograma",
            error: (err) => "Error al registrar: " + String(err.message || err),
            duration: 3000,
        });
        return true;
    }
    catch {
        return false;
    }
}
