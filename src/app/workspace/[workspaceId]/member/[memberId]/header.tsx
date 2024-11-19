
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { useRemoveChannel } from '@/src/app/features/channels/api/use-remove-channel';
import { useUpdateChannel } from '@/src/app/features/channels/api/use-update-channel';
import { useCurrentMember } from '@/src/app/features/members/api/use-current-member';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
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
memberName?: string;
memberImage?:string;
onClick?: () =>void;
}

const Header = ({memberImage,memberName,onClick}: HeaderProps) => {
  const avatarFallback = memberName?.charAt(0).toUpperCase();
  return (

    <div className='bg-white border-b h-[49px] flex items-center px-4 overflow-hidden'>
       <Button variant="ghost" className='text-lg font-semibold px-2 overflow-hidden w-auto' size="sm" onClick={onClick }>
        <Avatar className='size-6 mr-2'>
        <AvatarImage src={memberImage}/>
        <AvatarFallback>
            {avatarFallback}
        </AvatarFallback>
        </Avatar>
        <span className='truncate'>
        {memberName}
        </span>
        <FaChevronDown className='size-2.5 ml-2'/>
       </Button>
    </div>
  )
}

export default Header