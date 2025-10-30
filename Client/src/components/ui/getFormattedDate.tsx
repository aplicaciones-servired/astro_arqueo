const getFormattedDate = (dateString: string): string => {
  try {
    if (!dateString) return "";

    // Si la fecha viene en formato "YYYY-MM-DD"
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;

    // Devuelve DD/MM/YYYY sin tocar la zona horaria
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export default getFormattedDate;
