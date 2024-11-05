import { useWorkspaceId } from '@/src/hooks/use-workspace-id'
import React from 'react'
import { useCurrentMember } from '../features/members/api/use-current-member';
import { useGetWorkspace } from '../features/workspaces/api/use-get-workspace';
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react';
import WorkspaceHeader from './workspace-header';
import { SidebarItem } from './sidebar-item';
import { useGetChannels } from '../features/channels/api/use-get-channels';
import WorkspaceSection from './workspace-section';
import { useGetMembers } from '../features/members/api/use-get-member';
import { UserItem } from './user-item';
import { useCreateChannelModal } from '../features/channels/store/use-create-workspace';
import { useChannelId } from '@/src/hooks/use-channel-id';

const WorkspaceSidebar = () => {
  const channelId = useChannelId();
    const workspaceId = useWorkspaceId();
    const [_open, setOpen] = useCreateChannelModal(); 
    
    const {data: member, isLoading: memberLoading} = useCurrentMember({workspaceId});
    const {data: workspace, isLoading: workspaceLoading} = useGetWorkspace({id: workspaceId});
    const {data: channels, isLoading: channelsLoading} = useGetChannels({workspaceId});
    const { data: members, isLoading: membersLoading} = useGetMembers({workspaceId});
    if(workspaceLoading || memberLoading){
        return (
            <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
                <Loader className='size-5 animate-spin text-white'/>
            </div>
        )
    }
    if(!workspace || !member ){
        return (
            <div className='flex flex-col bg-[#5E2C5F] h-full items-center justify-center'>
                <AlertTriangle className='size-5 animate-spin text-white'/>
                <p className='text-white text-sm'>Workspace not found </p>
            </div>
        )
    }
  return (
    <div className='flex flex-col bg-[#5E2C5F] h-full'>
      <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"}/>
      <div className="flex flex-col px-2 mt-3">
        <SidebarItem 
        label="Threads"
        icon={MessageSquareText}
        id="threads"
       
        />
        <SidebarItem 
        label="Drafts and sent"
        icon={SendHorizonal }
        id="drafts"
        />        
      </div>
        <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true): undefined}

        >
        {channels?.map((item ) => (
          <SidebarItem
          key={item._id}
          icon={HashIcon}
          label={item.name}
          id={item._id}
          variant={channelId === item._id ? "active" : "default"}
          />
        ))}
        </WorkspaceSection>
        <WorkspaceSection
        label="Direct messages"
        hint="New direct message"
        onNew={() => {}}
        >
        {members?.map((item, i) => (
          
            <UserItem key={i} id={item._id} label={item.user.name} image={item.user.image}/>
             
        ) )}
        </WorkspaceSection>
    </div>
  )
}

export default WorkspaceSidebar