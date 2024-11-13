import { Id } from "@/convex/_generated/dataModel";
import { useCreateMessges } from "@/src/app/features/messages/api/use-create-messages";
import { useGenerateUploadUrl } from "@/src/app/features/upload/api/use-generate-uploadurl";
import { useChannelId } from "@/src/hooks/use-channel-id";
import { useWorkspaceId } from "@/src/hooks/use-workspace-id";
import dynamic from "next/dynamic";
import Quill from "quill";

const Editor = dynamic(() => import("../../../../../components/editor"), {ssr: false});
import React, { useRef, useState } from 'react'
import { toast } from "sonner";

interface ChatInputProps{
placeholder: string;
}

type CreateMessageValue = {
  channelId : Id<"channels">;
  workspaceId: Id<"workspaces">;
  body:string;
  image: Id<"_storage"> | undefined;
}
const ChatInput = ({placeholder}: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false)

const editorRef = useRef<Quill | null>(null);

const workspaceId = useWorkspaceId();
const channelId = useChannelId();

const {mutate: generateUploadUrl} = useGenerateUploadUrl();
const {mutate:createMessage} = useCreateMessges();
 
  const handleSubmit = async ({body, image}: {
    body: string;
    image: File | null;
  }) => {
try{
  editorRef?.current?.enable(false);
  setIsPending(true);
  const values : CreateMessageValue = { channelId, workspaceId, body, image:undefined,};

  if(image){
  const url = await generateUploadUrl({}, {throwError: true});
if(!url) {
return new Error("URL not found"); 
}
  const result = await fetch(url, {
  method: "POST",
  headers: {"Content-Type": image.type },
  body: image,
  });
  if(!result.ok){
  throw new Error("Failed to upload new image");
  }
  const {storageId} = await result.json();
  values.image = storageId;
  }
 await createMessage(values, {throwError: true});
  setEditorKey((prevKey) => prevKey + 1);
} catch(error){ 
toast.error("Failed to send message")
}finally{
setIsPending(false)
  editorRef?.current?.enable(true);
}

  }
  return (
    <div className="px-5 w-full ">
        <Editor key={editorKey} variant="create"
         onSubmit={handleSubmit} placeholder={placeholder} disabled={isPending} 
         innerRef={editorRef}
         />
    </div>
  )
}

export default ChatInput