import { Id } from '@/convex/_generated/dataModel'
import { useGetMember } from '@/src/app/features/members/api/use-get-member';
import { UseGetMessages } from '@/src/app/features/messages/api/use-get-messages';
import { useMemberId } from '@/src/hooks/use-member-id';
import { Loader } from 'lucide-react';
import React from 'react'
import Header from './header';
import ChatInput from './chat-input';
import MessageList from '@/src/components/message-list';
import { usePanel } from '@/src/hooks/use-panel';
interface ConversationProps{
    id: Id<"conversations">;
}
const Conversation = ({ id }: ConversationProps) => {
  const {onOpenProfile} = usePanel();
    const memberId = useMemberId();
    const {data: member, isLoading: memberLoading} = useGetMember({id:memberId});
    const {results, status, loadMore} = UseGetMessages({
        conversationId: id
    });
    if(memberLoading || status === "LoadingFirstPage"){
      return(
        <div className="h-full flex items-center justify-center">
          <Loader className='size-6 animate-spin text-muted-foreground '/>
        </div>
      )
    }
  return (
    <div className='flex flex-col h-full '>
     <Header memberName={member?.user.name} memberImage={member?.user.image}  onClick={() => onOpenProfile(memberId)}/>
      <MessageList 
      data={results}
      variant="conversation"
      memberImage={member?.user.image}
      memberName={member?.user.name}
      loadMore={loadMore}
      isLoadingMore={status === "LoadingMore"}
      canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message ${member?.user.name}`} conversationId={id}/>
    </div>
  )
}

export default Conversation