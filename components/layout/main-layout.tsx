"use client"
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainLayout;
