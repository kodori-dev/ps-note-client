"use client";

import { useEffect } from "react";
import { useColorMode } from "./ui/color-mode";

function ColorModeSync() {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const body = window.document.body;

    body.classList.toggle("dark", colorMode === "dark");
  }, [colorMode]);

  return null;
}

export default ColorModeSync;
