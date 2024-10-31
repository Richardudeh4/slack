"use client";

import { useGetChannels } from "@/src/app/features/channels/api/use-get-channels";
import { useCreateChannelModal } from "@/src/app/features/channels/store/use-create-workspace";
import { useGetWorkspace } from "@/src/app/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/src/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const ChannelIdPage = () => {
        const router = useRouter();
        const workspaceId = useWorkspaceId(); 
        const [open, setOpen] = useCreateChannelModal();
        const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});
        const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId,});

        const  channelId = useMemo(() => channels?.[0]?._id , [channels]);

        useEffect(()=> {
            if(workspaceLoading || channelsLoading ||  !workspace) return;
            if(channelId){
                router.push(`/workspace/${workspaceId}/channel/${channelId}`);
            }
            else if(!open){
                setOpen(true);
            }
        }, [
            channelId, 
            workspaceLoading,
            channelsLoading,
            workspace,
            open,
            setOpen,
            router,
            workspaceId 
        ]);
        if(workspaceLoading || channelsLoading) {
            return (
                <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                    <Loader className="size-6 animate-spin text-muted-foreground"/>
                </div>
            )
        }

        if(!workspace) {
            return (
                <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                    <TriangleAlert className="size-6 animate-spin text-muted-foreground"/>
                    <span className="text-sm text-muted-foreground">Workspace not found </span>
                </div>
            )
        }
    return null;
}
export default ChannelIdPage