import { API_URL } from "@/utils/constans";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DeletCronogramaProps {
  id?: number;
  empresa?: string;
  sourceTable?: string;
  handleDelete?: () => void;
}

export function DeletCrom({ id, empresa, sourceTable }: DeletCronogramaProps) {
  const [message, setMessage] = useState<string>("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_URL}/deletecronograma?id=${id}&zona=${empresa}&sourceTable=${encodeURIComponent(sourceTable ?? "")}`
      );
      setMessage(response.data.message);
      toast.success(response.data.message, { duration: 2000 });
    } catch (error) {
      error instanceof Error
        ? toast.error(error.message, { duration: 2000 })
        : toast.error("Error al eliminar el cronograma", { duration: 2000 });
    }
  };

  return { handleDelete, message };
}
