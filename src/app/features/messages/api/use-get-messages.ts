import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react";

 const BATCH_SIZE = 20;

 interface  UseGetMessageProps{
    channelId?:Id<"channels">;
    conversationId?: Id<"conversations">;
    parentMessageId?: Id<"messages">;
 };

 export type UseGetMessageReturnType = typeof api.messages.get._returnType["page"];

 export const UseGetMessage= ({channelId, conversationId, parentMessageId}:UseGetMessageProps) =>{
    const {results, status,loadMore} = usePaginatedQuery(
        api.messages.get, 
        {channelId, conversationId,parentMessageId},
        {initialNumItems: BATCH_SIZE},)

 }