import { useWorkspaceId } from '@/src/hooks/use-workspace-id'
import React from 'react'
import { useCurrentMember } from '../features/members/api/use-current-member';
import { useCurrentUser } from '../auth/api/use-current-user';

const WorkspaceSidebar = () => {
    const workspaceId = useWorkspaceId();

    const {} = useCurrentMember({workspaceId});
    const {} = useCurrentUser();
  return (
    <div>
        WorkspaceSidebar
    </div>
  )
}

export default WorkspaceSidebar