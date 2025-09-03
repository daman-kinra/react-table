import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Vend Sans, sans-serif",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
