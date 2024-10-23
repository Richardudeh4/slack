"use client";
import React from "react";
import Toolbar from "../toolbar";

import SideBar from "../sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import WorkspaceSidebar from "../workspace-sidebar";
interface WorkspaceIdLayoutProps{
    children: React.ReactNode
}
export default function WorkspaceIdLayout({children}: WorkspaceIdLayoutProps){
    return (
        <div className="h-full">
            <Toolbar/>
            <div className="flex h-[calc(100vh-40px)]">
                <SideBar/>
                <ResizablePanelGroup direction="horizontal" autoSaveId="ca-workspace-layout">
                    <ResizablePanel
                    defaultSize={20}
                    minSize={11}
                    className="bg-[#5E2C5F]"
                    >
                    <WorkspaceSidebar/>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel minSize={20}>
                    {children} 
                    </ResizablePanel>
                </ResizablePanelGroup>
           
            </div>
        </div>
    )
}