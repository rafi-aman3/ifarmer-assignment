"use client";
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ProgressProvider
      height="4px"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <Provider store={store}>{children}</Provider>
    </ProgressProvider>
  );
};

export default MainLayout;
