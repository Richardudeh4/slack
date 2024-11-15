import React from 'react'
import { UseGetMessageReturnType } from '../app/features/messages/api/use-get-messages';

interface MessageListProps{
    memberName?: string;
    memberImage?: string;
    channelName?: string;
    channelCreationTime?: number;
    variant: "channel" | "thread" | "conversation";
    data: UseGetMessageReturnType | undefined;
    loadMore: () => void;
    isLoadingMore: boolean;
    canLoadMore: boolean;
};
const MessageList = ({}:MessageListProps) => {
  return (
    <div>MessageList</div>
  )
}

export default MessageList