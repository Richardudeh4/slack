import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/editor"), {ssr: false});
import React from 'react'

const ChatInput = () => {
  return (
    <div className="px-5 w-full ">
        <Editor/>
    </div>
  )
}

export default ChatInput