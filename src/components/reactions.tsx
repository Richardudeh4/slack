import { Doc, Id } from '@/convex/_generated/dataModel';
import React from 'react'
import { useWorkspaceId } from '../hooks/use-workspace-id';
import { useCurrentMember } from '../app/features/members/api/use-current-member';
import { cn } from '@/lib/utils';
import { Hint } from './hint';

interface ReactionsProps{
    data: Array<Omit<Doc<"reactions">, "memberId"> & {
        count: number;
        memberIds: Id<"members">[]
    }>;
    onChange: (value:string) => void;
}

const Reactions = ({data, onChange}: ReactionsProps) => {
    const workspaceId = useWorkspaceId();
    const {data: currentMember} = useCurrentMember({workspaceId});

    const currentMemberId = currentMember?._id;
    if(data.length === 0 || !currentMemberId){
        return null;
    }
  return (
    <div className='flex items-center gap-1 mt-1 mb-1'>
     {data.map((reaction) => (
        <Hint key={reaction._id} label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}>
             <button onClick={() => onChange(reaction.value)} className={cn("h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-1",
            reaction.memberIds.includes(currentMemberId) && "bg-blue-100/70 border-blue-500 text-blue-500"
        )}>
            {reaction.value}
            <span className={cn("text-xs font-semibold text-muted-foreground", 
                reaction.memberIds.includes(currentMemberId) && "text-blue-500",)}>
                {reaction.count}
            </span>
        </button>
        </Hint>
       
     ))}
    </div>
  )
}

export default Reactions