import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Hint } from '@/src/components/hint';
import {PlusIcon } from 'lucide-react';
import React from 'react'
import { FaCaretDown } from 'react-icons/fa';
import {useToggle} from "react-use";


interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    onNew ?:() => void;
}
const WorkspaceSection = ({children, label, hint, onNew}: WorkspaceSectionProps) => {
    const [on,toggle] = useToggle(true);
  return (
    <div className='flex flex-col mt-3 px-3 '>
        <div className='flex items-center px-3.5 group'>
        <Button onClick={toggle} variant="transparent" className='p-0.5 text-sm shrink-0 size-6 text-[#f9edffcc]'>
            <FaCaretDown className={cn("size-4 transition-transform", on && "-rotate-90")}/>
        </Button>
        <Button variant="transparent" size="sm" className='group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center'>
            <span className='truncate'>{label}</span>
        </Button>
        {
            onNew && (
                <Hint label={hint} side="top" align="center">
                    <Button onClick={onNew} variant="transparent" size="iconSm" className='opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0'>
                            <PlusIcon className='size-5 '/>
                    </Button>
                </Hint>
            )
        }
        </div>

        {on && children}
    </div>
  )
}

export default WorkspaceSection