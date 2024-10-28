import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import React from 'react'


interface InviteModalProps{
open: boolean;
setOpen: (open:boolean) => void;
name: string;
joinCode: string;
}
const InviteModal = ({open,setOpen , name,joinCode }:InviteModalProps) => {
  return (
   <Dialog open={open} onOpenChange={setOpen}>
 <DialogContent>
    <DialogHeader>
        <DialogTitle>Invite People {name}</DialogTitle>
        <DialogDescription>
            Use the code below to invite peeole to your workspace 
        </DialogDescription>
    </DialogHeader>
    <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
        {joinCode}
    </div>
 </DialogContent>
   </Dialog>
  )
}

export default InviteModal