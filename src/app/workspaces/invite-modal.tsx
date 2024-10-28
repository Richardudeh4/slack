import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { useWorkspaceId } from '@/src/hooks/use-workspace-id';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';
import { useNewJoincode } from '../features/workspaces/api/use-new-joincode';
import { UseConfirm } from '@/src/hooks/use-confirm';


interface InviteModalProps{
open: boolean;
setOpen: (open:boolean) => void;
name: string;
joinCode: string;
}
const InviteModal = ({open,setOpen , name,joinCode }:InviteModalProps) => {
  const { mutate, isPending } =useNewJoincode();
  const [ConfirmDialog, confirm] = useConfirm("Are you sure?", "this action will disabled the current code and generate new one");

  const handleNewCode = () =>{
    mutate({workspaceId}, {
      onSuccess:() => {
        toast.success("Invite code regenerated");
      },
      onError:() => {
        toast.error("Failed to regenerate invite code");
      }
    });
  }
  const workspaceId = useWorkspaceId();
  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;

    navigator.clipboard
    .writeText(inviteLink)
    .then(() => toast.success("Invite link copied "));
  }
  return (
    <>
    <ConfirmDialog/>
   <Dialog open={open} onOpenChange={setOpen}>
 <DialogContent>
    <DialogHeader>
        <DialogTitle>Invite People {name}</DialogTitle>
        <DialogDescription>
            Use the code below to invite peeole to your workspace 
        </DialogDescription>
    </DialogHeader>
    <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
      <p className="uppercase text-4xl font-bold tracking-widest">
      {joinCode}
      </p>
      <Button variant="ghost" size="sm" onClick={handleCopy}> 
        Copy link
        <CopyIcon className="size-4 ml-2"/>
      </Button>
    </div>
    <div className='w-full flex items-center justify-between'>
    <Button disabled={isPending} onClick={handleNewCode} variant="outline">
      New code
      <RefreshCcw className='size-4 ml-2'/>
    </Button>
    <DialogClose asChild>
      <Button>Close</Button>
    </DialogClose>
    </div>
 </DialogContent>
   </Dialog>
   </>
  )
}

export default InviteModal