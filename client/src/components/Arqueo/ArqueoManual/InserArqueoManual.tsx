import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { ArqueoManualForm } from "@/Services/InsertArqueoMa";
import { useEmpresa } from "@/components/ui/useEmpresa";
import { set } from "date-fns";

export const InserArqueoManual = () => {
    const { empresa } = useEmpresa();
    const [calculo, setCalculo] = useState<number>(0);

    const [form, setForm] = useState({
        puntodeventa: "",
        nombre: "",
        documento: "",
        ventabruta: "",
        totalingreso: "",
        efectivocajafuerte: "",
        valor: ""
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const procesarArchivo = (file: File) => {
        // Validar que sea imagen o PDF
        const esImagen = file.type.startsWith('image/');
        const esPDF = file.type === 'application/pdf';
        
        if (!esImagen && !esPDF) {
            alert('Por favor selecciona un archivo de imagen (PNG, JPG, GIF) o PDF válido');
            return;
        }

        // Validar tamaño (máximo 20MB)
        if (file.size > 20 * 1024 * 1024) {
            alert('El archivo es demasiado grande. Máximo 20MB permitido.');
            return;
        }

        setSelectedFile(file);

        // Crear preview según el tipo de archivo
        if (esImagen) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else if (esPDF) {
            // Para PDF, mostrar un indicador en lugar de preview
            setPreviewUrl('PDF');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            procesarArchivo(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        
        const file = e.dataTransfer.files?.[0];
        if (file) {
            procesarArchivo(file);
        }
    };


    useEffect(() => {
        const { ventabruta, totalingreso, efectivocajafuerte } = form;

        // Convertir strings a números (parseFloat maneja decimales)
        const ventabrutavalue = parseFloat(ventabruta) || 0;
        const totalingresovalue = parseFloat(totalingreso) || 0;
        const efectivocajafuertevalue = parseFloat(efectivocajafuerte) || 0;

        const Faltante_sobrante = (totalingresovalue + efectivocajafuertevalue) - ventabrutavalue;;
        if (Faltante_sobrante > 0) {
            setCalculo(Faltante_sobrante);
        } else {
            setCalculo(Faltante_sobrante);
        }

        console.log('Cálculo:', Faltante_sobrante);

    }, [form, form.ventabruta, form.totalingreso, form.efectivocajafuerte]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { puntodeventa, nombre, documento, ventabruta, totalingreso, efectivocajafuerte, valor } = form;

        const ok = await ArqueoManualForm({
            puntodeventa,
            nombre,
            documento,
            ventabruta,
            totalingreso,
            efectivocajafuerte,
            sobrantefaltante: calculo.toString(),
            valor,
            empresa,
            imagen: selectedFile
        });
        if (ok) {
            setForm({
                puntodeventa: "",
                nombre: "",
                documento: "",
                ventabruta: "",
                totalingreso: "",
                efectivocajafuerte: "",
                valor: "",
            });
            setSelectedFile(null);
            setPreviewUrl(null);
            window.location.reload();
        };
    }

    return (
        <section className=" flex items-center justify-center px-4 text-center">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 p-6 w-6/12/12 bg-white border border-indigo-200 rounded-lg shadow-lg shadow-blue-300/50"
            >
                <h3 className="text-lg font-medium text-gray-700 text-center">
                    Insertar Arqueo Manual
                </h3>

                <div className="col-span-4 grid grid-cols-2 gap-4">
                    <label className="block text-sm font-medium text-gray-700 ">
                        Punto de Venta
                        <input
                            name="puntodeventa"
                            type="text"
                            placeholder="ingresar punto de venta"
                            value={form.puntodeventa}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Nombre del Responsable
                        <input
                            name="nombre"
                            type="text"
                            placeholder="ingresar nombre del responsable"
                            value={form.nombre}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Documento del Responsable
                        <input
                            name="documento"
                            type="text"
                            placeholder="ingresar documento del responsable"
                            value={form.documento}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Total Ingreso
                        <input
                            name="totalingreso"
                            type="text"
                            placeholder="ingresar total ingreso"
                            value={form.totalingreso}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Efectivo
                        <input
                            name="efectivocajafuerte"
                            type="text"
                            placeholder="ingresar efectivo "
                            value={form.efectivocajafuerte}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        Venta Bruta
                        <input
                            name="ventabruta"
                            type="text"
                            placeholder="ingresar venta bruta"
                            value={form.ventabruta}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                    <input
                        name="sobrantefaltante"
                        type="text"  // Cambiado de text a text
                        placeholder="ingresar sobrante/faltante"
                        value={calculo ? calculo > 0 ? `Sobrante: ${calculo}` : `Faltante: ${calculo}` : "0"}
                        readOnly  // Agregar readOnly ya que es calculado
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                    />

                    <label className="block text-sm font-medium text-gray-700">
                        Valor
                        <input
                            name="valor"
                            type="text"
                            placeholder="ingresar valor"
                            value={form.valor}
                            onChange={handleChange}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-zinc-800"
                        />
                    </label>

                </div>

                <div className="flex items-center justify-center w-full">
                    {previewUrl ? (
                        <div className="relative w-full">
                            {previewUrl === 'PDF' ? (
                                <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-base border border-default-strong">
                                    <svg className="w-20 h-20 text-red-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z"/>
                                        <text x="6" y="14" fontSize="8" fill="white" fontWeight="bold">PDF</text>
                                    </svg>
                                    <p className="text-sm font-semibold text-gray-700">{selectedFile?.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{(selectedFile?.size! / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <img
                                    src={previewUrl}
                                    alt="Vista previa"
                                    className="w-full h-64 object-contain rounded-base border border-default-strong"
                                />
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <label 
                            htmlFor="dropzone-file" 
                            className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border-2 border-dashed border-blue-400 rounded-base cursor-pointer hover:bg-blue-50 hover:border-blue-600 transition-all"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                <svg className="w-12 h-12 mb-4 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-700">
                                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                                </p>
                                <p className="text-xs text-gray-600">PNG, JPG, GIF o PDF (MÁX. 20MB)</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>

                <Button>Insertar Arqueo</Button>
            </form>
        </section>
    );

};
