"use client";
import { Dialog, DialogContent, DialogHeader, DialogDescription , DialogTitle } from "@/src/components/ui/dialog";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const CreateWorkspaceModal = () => {
    const router = useRouter();
    const [open, setOpen] =  useCreateWorkspaceModal();
    const [name, setName] = useState("");
    const {mutate,isPending, isError, isSuccess, data, error } = useCreateWorkspace();
     
    const handleClose = () => {
            setOpen(false);
            setName("");
    };
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({name}, {
            onSuccess(id){
                toast.success("Workspace created!")
                router.push(`/workspaces/${id}`);
                handleClose();
            }
        })
    }
    //     try{
    //    const data = await mutate({
    //         name: "Workspace 1",
    //     },{
    //         onSuccess(data){
    //             //redirect to that workspace id 
    //             router.push("/workspaces/${data}")
    //         },
    //         onError(error){

    //         }
    //     })
    // }
    // catch(error){
    return (
        <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a workspace</DialogTitle> 
                        <form onSubmit={handleSubmit} className="space-y-4">
                        <Input disabled={isPending} value={name} onChange={(e) => setName(e.target.value)} required autoFocus minLength={3} placeholder="Workspace name e.g 'work, personal or home '"/>
                        <div className="flex justify-end">
                            <Button disabled={isPending}>
                                Create
                            </Button>
                        </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
        </Dialog>
    ) 
}