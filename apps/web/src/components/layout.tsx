"use client";

import React from "react";
import { ThemeProvider } from "@material-tailwind/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider><div>{children}</div></ThemeProvider>;
}

export default Layout;
