import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./processes/extensions/array.extension.ts";
import './processes/extensions/number.extension.ts'

createRoot(document.getElementById("root")!).render(<App />);
