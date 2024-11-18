import { Button } from '@/components/ui/button';
import { MessageSquareIcon, MessageSquareTextIcon, Pencil, Smile, Trash } from 'lucide-react';
import React from 'react'
import { Hint } from './hint';
import { EmojiPopover } from './emoji-popover';


interface ToolbarProps{
    isAuthor: boolean;
    isPending: boolean;
    handleEdit: () => void;
    handleThread: () => void;
    handleDelete: () => void;
    handleReaction: (value: string) => void;
    hideThreadButton?: boolean;
}

const Toolbar = ({isAuthor,isPending,handleDelete,handleEdit,handleReaction, handleThread, hideThreadButton}:ToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
       <div className='group-hover:opacity-100 opacity-0 transition-opacity  border bg-white rounded-md shadow-sm'>
        <EmojiPopover hint="Add reaction" onEmojiSelect={(emoji) => handleReaction(emoji.native)}>
        <Button variant="ghost" size="iconSm" disabled={isPending}>
            <Smile className='size-5'/>
        </Button>
        </EmojiPopover>
       
       { !hideThreadButton && (
        <Hint label="reply in thread "> 
        <Button variant="ghost" size="iconSm" onClick={handleThread} disabled={isPending}>
            <MessageSquareTextIcon className='size-5'/>
        </Button>
        </Hint>
       )}
       {
        isAuthor && (
          <>
          <Hint label='Edit message'>
          <Button variant="ghost" size="iconSm" onClick={handleEdit} disabled={isPending}>
               <Pencil className='size-5'/>
           </Button>
          </Hint>
          <Hint label="Delete message">
          <Button variant="ghost" size="iconSm" onClick={handleDelete} disabled={isPending}>
               <Trash className='size-5'/>
           </Button>
          </Hint>
          </>  
        )}
       
       </div>
    </div>
  )
}

export default Toolbar