import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Componente MapaUbicacion
//
// Cómo funciona:
// 1. Recibe lat (latitud) y lng (longitud) como props numéricas.
// 2. Al montarse, crea un mapa Leaflet dentro del div contenedor usando
//    useRef (para no perder la referencia al elemento DOM).
// 3. useEffect se ejecuta solo cuando lat/lng cambian, destruye el mapa
//    anterior si existe y crea uno nuevo centrado en la coordenada indicada.
// 4. El mapa usa tiles de OpenStreetMap (gratuito, sin API key).
// 5. Coloca un marcador (pin) en la coordenada y abre un Popup con el nombre.
// ─────────────────────────────────────────────────────────────────────────────

interface MapaUbicacionProps {
  lat: number;
  lng: number;
  nombre?: string | number;
}

export default function MapaUbicacion({ lat, lng, nombre }: MapaUbicacionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Guardamos la instancia del mapa para destruirla si las coords cambian
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Importación dinámica de leaflet para evitar problemas de SSR en Astro
    import("leaflet").then((L) => {
      // Arregla el ícono del marcador (problema conocido de Leaflet con Vite)
      // Usamos las imágenes desde el CDN en vez del bundle local
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      // Si ya existe un mapa anterior en este div, lo destruimos primero
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // Creamos el mapa centrado en la coordenada, zoom 16 (~nivel de calle)
      const map = L.map(containerRef.current!).setView([lat, lng], 18);

      // Capa de tiles de OpenStreetMap (gratuita, sin API Key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Marcador en la coordenada con un Popup informativo
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          `<div style="font-size:12px;font-weight:bold">${nombre ?? "Punto de Venta"}</div>
           <div style="font-size:11px;color:#555">${lat}, ${lng}</div>`
        )
        .openPopup();

      // Guardamos la referencia para limpieza posterior
      mapRef.current = map;
    });

    // Cleanup: destruir el mapa cuando el componente se desmonta
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng]); // Solo se re-ejecuta si cambian las coordenadas

  return (
    <>
      {/* CSS de Leaflet cargado dinámicamente para no perder estilos */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      {/* Contenedor del mapa — Leaflet inyecta el canvas aquí */}
      <div ref={containerRef} style={{ height: "300px", width: "100%" }} />
    </>
  );
}
