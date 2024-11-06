import { Button } from "@/components/ui/button";
import { ImageIcon, Smile } from "lucide-react";
import Quill, { QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { useRef, useEffect } from "react";
import {PiTextAa} from "react-icons/pi";
import {MdSend} from "react-icons/md"
import { Hint } from "./hint";


type EditorValue = {
    image: File | null;
    body: string
}
interface EditorProps {
    variant?: "create" | "update";
    onSubmit: ({image, body}: EditorValue) => void;
}

export default function Editor({variant = "create"}: EditorProps){
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
        };
        const quill = new Quill(editorContainer,  options);

        return () => {
            if(container){
                container.innerHTML = "";
            } 
        }
    }, []);
return (
    <div className="flex flex-col">
       <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom"/>
        <div className="flex px-2 pb-2 z-[5]">
            <Hint label="hide formatting">
            <Button
             disabled={false} 
             size="iconSm"
             variant="ghost"
             onClick={() => {}}
             >
                <PiTextAa className="size-4"/>
            </Button>
            </Hint>
            <Hint label="Emoji">
            <Button
             disabled={false} 
             size="iconSm"
             variant="ghost"
             onClick={() => {}}
             >
                <Smile className="size-4"/>
            </Button>
            </Hint>
            {
                variant === "create" && (
                    <Hint label="image">
                    <Button
                     disabled={false} 
                     size="iconSm"
                     variant="ghost"
                     onClick={() => {}}
                     >
                        <ImageIcon className="size-4"/>
                    </Button>
                    </Hint>
                )
            }
            {
                variant === "update" && (
                    <div className="ml-auto flex items-center gap-x-2">
                    <Button variant="outline" size="sm" onClick={() => {}} disabled={false}>
                        Cancel 
                    </Button>
                    <Button className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" size="sm" onClick={() => {}} disabled={false}>
                        Save
                    </Button>
                    </div>
                )
            }
            {
                variant === "create" && (
                    <Button disabled={false} size="iconSm" className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white">
                    <MdSend className="size-4"/>
                    </Button>
                )
            }
          
        </div>
       </div>
       <div className="p-2 text-[10px] text-muted-foreground flex  justify-end">
        <p>
            <strong>Shift + Return </strong> to add a new line
        </p>
       </div>
    </div>
)
}