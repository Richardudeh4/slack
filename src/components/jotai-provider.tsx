"use client";
import {Provider} from "jotai";
import React from "react";

interface jotaiProviderProps {
    children: React.ReactNode
}
export const JotaiProvider = ({children}: jotaiProviderProps) => {
    return (
<Provider>
    {children}
</Provider>
    )
}