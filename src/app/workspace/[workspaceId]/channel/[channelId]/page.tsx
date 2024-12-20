"use client";

import { useGetChannel } from "@/src/app/features/channels/api/use-get-channel ";
import { useChannelId } from "@/src/hooks/use-channel-id";
import { Loader, TriangleAlert } from "lucide-react";
import Header from "./header";
import ChatInput from "./chat-input";
import { UseGetMessages } from "@/src/app/features/messages/api/use-get-messages";
import MessageList from "@/src/components/message-list";

const ChannelIdPage = () => {

    const channelId = useChannelId();
    const {results, status, loadMore} = UseGetMessages({channelId})
    const { data:channel, isLoading:channelLoading} = useGetChannel({id:channelId});
    console.log({results});

    if(channelLoading || status ==="LoadingFirstPage"){
        return (
            <div className="h-full flex-1 flex items-center justify-center">
            <Loader className="animate-spin size-6 text-muted-foreground"/>
            </div>
        );
    }
    if(!channel){
        return (
            <div className="h-full flex-1 flex items-center flex-col gap-y-2 justify-center">
                <TriangleAlert className="size-6 text-muted-foreground "/>
                <span className="text-sm text-muted-foreground">
                    Channel not found
                </span>
            </div>
        )
    }
  return (
    <div className="flex flex-col h-full">
     <Header title={channel.name}/>
    <MessageList 
    channelName={channel.name} 
    channelCreationTime={channel._creationTime}
    data={results}
    loadMore={loadMore}
    isLoadingMore={status === "LoadingMore"}
    canLoadMore = {status === "CanLoadMore"}
    variant="channel"
    />
     <ChatInput placeholder={`Message # ${channel.name}`}/>
    </div>
  )
}

export default ChannelIdPage

// "use client";

// import { useGetChannels } from "@/src/app/features/channels/api/use-get-channels";
// import { useCreateChannelModal } from "@/src/app/features/channels/store/use-create-workspace";
// import { useGetWorkspace } from "@/src/app/features/workspaces/api/use-get-workspace";
// import { useWorkspaceId } from "@/src/hooks/use-workspace-id";
// import { Loader, TriangleAlert } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useEffect, useMemo } from "react";

// const ChannelIdPage = () => {
//         const router = useRouter();
//         const workspaceId = useWorkspaceId(); 
//         const [open, setOpen] = useCreateChannelModal();
//         const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});
//         const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId,});

//         const  channelId = useMemo(() => channels?.[0]?._id , [channels]);

//         useEffect(()=> {
//             if(workspaceLoading || channelsLoading ||  !workspace) return;
//             if(channelId){
//                 router.push(`/workspace/${workspaceId}/channel/${channelId}`);
//             }
//             else if(!open){
//                 setOpen(true);
//             }
//         }, [
//             channelId, 
//             workspaceLoading,
//             channelsLoading,
//             workspace,
//             open,
//             setOpen,
//             router,
//             workspaceId 
//         ]);
//         if(workspaceLoading || channelsLoading) {
//             return (
//                 <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
//                     <Loader className="size-6 animate-spin text-muted-foreground"/>
//                 </div>
//             )
//         }

//         if(!workspace) {
//             return (
//                 <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
//                     <TriangleAlert className="size-6 animate-spin text-muted-foreground"/>
//                     <span className="text-sm text-muted-foreground">Workspace not found </span>
//                 </div>
//             )
//         }
//     return null;
// }
// export default ChannelIdPage