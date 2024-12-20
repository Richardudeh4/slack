
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useRemoveChannel } from '@/src/app/features/channels/api/use-remove-channel';
import { useUpdateChannel } from '@/src/app/features/channels/api/use-update-channel';
import { useCurrentMember } from '@/src/app/features/members/api/use-current-member';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/src/components/ui/dialog'
import { useChannelId } from '@/src/hooks/use-channel-id';
import { UseConfirm } from '@/src/hooks/use-confirm';
import { useWorkspaceId } from '@/src/hooks/use-workspace-id';
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { toast } from 'sonner';

interface HeaderProps{
title: string
}

const Header = ({title}: HeaderProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog, confirm] = UseConfirm("Delete this channel", "You are about to delete this channel. this action is irreversable");
    const channelId = useChannelId();
    const [editOpen, setEditOpen] = useState(false);
    const {data: member} = useCurrentMember({workspaceId})
    const [value, setValue] = useState(title);
    const {mutate: updateChannel, isPending: updatingChannel} = useUpdateChannel()
    const {mutate: removeChannel , isPending: removingChannel} = useRemoveChannel();

    const handleEditOpen = (value:boolean) => {
            if(member?.role !== "admin") return;
            setEditOpen(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
        setValue(value);
    }

    const handleDelete = async () => {
        
        const ok = await confirm();
        if(!ok) return; 
        removeChannel({id:channelId}, {
            onSuccess:() => {
                toast.success("Channel Deleted");
                router.push(`/workspace/${workspaceId}`);
            },
            onError:() => {
            toast.error("Failed to delete");
            }
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateChannel({id:channelId, name: value}, {
            onSuccess: () => {
                toast.success("Channel Updated");
                setEditOpen(false);
            },
            onError: () => {
                toast.error("Failed to update channel")
            }
        })
    }
  return (

    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
        <ConfirmDialog/>
        <Dialog>
            <DialogTrigger asChild>
            <Button variant="ghost" className="text-lg font-semibold px-2 overflow-hidden w-auto" size="sm">
       <span className='truncate'> # {title}</span>
       <FaChevronDown className="size-2.5 ml-2 "/>
        </Button>
            </DialogTrigger>
        <DialogContent className='p-0 bg-gray-50 overflow-hidden'>
            <DialogHeader className='p-4 border-b bg-white'>
                <DialogTitle>
                    # {title}
                </DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
                <Dialog open={editOpen} onOpenChange={handleEditOpen}>
                    <DialogTrigger asChild>
                    <div className="px-5 py-4 bg-white rounded-lg border  cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                            <p className='text-sm font-semibold'>Channel Name</p>
                            {
                                member?.role === "admin" && (
                                    <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
                                )
                                 
                            }
                          
                    </div>
                    <p className='text-sm'># {title}</p>
                    </div>
                    </DialogTrigger> 
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Rename this channel</DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <Input
                            value={value}
                            disabled={updatingChannel}
                            onChange= {handleChange }
                            required 
                            autoFocus
                            minLength={3}
                            maxLength={80} 
                            placeholder= "connect with your team"
                            />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" disabled={updatingChannel} >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={updatingChannel}>
                                Save
                            </Button>
                        </DialogFooter>
                        </form> 
                    </DialogContent>
                    </Dialog>
                    {
                        member?.role === "admin" && (
                            <button 
                            onSubmit={handleDelete}
                             disabled={removingChannel} 
                             className='flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer border hover:bg-gray-50 text-rose-600 '>
                            <TrashIcon className='size-4'/>
                            <p className='text-sm font-semibold'>Delete Channel</p>
                        </button>
                        )
                    }
                   
            </div>
        </DialogContent>
        </Dialog>
     

</div>
  )
}

export default Header