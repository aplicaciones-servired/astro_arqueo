import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster } from "sonner";
export default function ToasterProvider() {
    return _jsx(Toaster, { richColors: true, position: "top-right" });
}
