import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>
);
