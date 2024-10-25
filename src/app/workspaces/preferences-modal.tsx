import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog';
import { Trash } from 'lucide-react';
import React, { useState } from 'react'
import { useUpdateWorkspace } from '../features/workspaces/api/use-update-workspace';
import { useRemoveWorkspace } from '../features/workspaces/api/use-remove-workspace';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useWorkspaceId } from '@/src/hooks/use-workspace-id';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { UseConfirm } from '@/src/hooks/use-confirm';

interface PreferencesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue: string
}
const PreferencesModal = ({open, setOpen, initialValue}:PreferencesModalProps) => {
    const [value, setValue] = useState(initialValue);
    const [editOpen, setEditOpen] = useState(false);
    const router = useRouter();

    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = UseConfirm(
        "Are you sure?", "This action is irreversible"
    );
    const { mutate: updateWorkSpace, isPending: isUpdatingWorkspace } = useUpdateWorkspace();
    const { mutate: removeWorkSpace, isPending: isRemovingWorkspace } = useRemoveWorkspace();

    const handleRemove = async () => {
        const ok = await confirm();
        if(!ok) return; 

        removeWorkSpace({
            id: workspaceId
        }, {
            onSuccess: () => {
                router.replace("/");
                toast.success("workspace removed");
            },
            onError:() => {
                toast.error("Failed to remove workspace");
            }
        })
    };

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkSpace({
            id:  workspaceId,
            name: value,
        }, {
            onSuccess: () => {
                setEditOpen(false);  
                toast.success("workspace updated");
            },
            onError:() => {
                toast.error("something went wrong");
            }
        })
    }
  return (
    <>
    <ConfirmDialog/> 
   <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
        <DialogHeader className='p-4 border-b bg-white'>
            <DialogTitle>
                {value}
            </DialogTitle>
        </DialogHeader>
        <div className='px-4 pb-4 flex flex-col  gap-y-2 '>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger>
                <div className='px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50'>
            <div className='flex items-center justify-between'>
                <p className='text-sm font-semibold'>
                    Workspace Name
                </p>
                <p className='text-sm text-[#1264a3] hover:underline font-semibold'>
                    Edit 
                </p>
            </div>
            <p className="text-sm">
                {value}
            </p>
        </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>Rename this workspace</DialogHeader>
            <form onSubmit={handleEdit} className='space-y-4'>
                <Input value={value}
                 disabled={isUpdatingWorkspace} 
                 onChange={(e) => setValue(e.target.value)}
                  required autoFocus minLength={3} maxLength={80}
                 placeholder="Workspace name e.g. 'work', 'personal', 'home'"/>
                 <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isUpdatingWorkspace}>
                             Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={isUpdatingWorkspace}>Save</Button>
                 </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
        <button disabled={isRemovingWorkspace} onClick={handleRemove} className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600'>
            <Trash className='size-4'/>
            <p className='text-sm font-semibold'>Delete Workspace</p>
        </button>
        </div>
    </DialogContent>
   </Dialog>
   </>
  )
}

export default PreferencesModal;