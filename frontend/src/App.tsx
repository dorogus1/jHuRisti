import React from "react";
import "./App.css";
import AppRoutes from "./Routes";
import { SoundProvider } from "./Context/SoundContext";


export default function MyApp()
{
  return (
      <SoundProvider>
        <AppRoutes />
      </SoundProvider>
  );
}

