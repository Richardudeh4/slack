import { Button } from "@/components/ui/button";
import { ImageIcon, Smile } from "lucide-react";
import Quill, {type QuillOptions } from "quill";
import "quill/dist/quill.snow.css";
import { useRef, useEffect, MutableRefObject, useLayoutEffect, useState } from "react";
import {PiTextAa} from "react-icons/pi";
import {MdSend} from "react-icons/md"
import { Hint } from "./hint";
import { Delta , Op} from "quill/core";
import { cn } from "@/lib/utils";
import Keyboard from "quill/modules/keyboard";


type EditorValue = {
    image: File | null;
    body: string
}
interface EditorProps {
    variant?: "create" | "update";
    onCancel?: () => void;
    placeholder?: string;
    defaultValue?: Delta | Op[];
    disabled?:boolean;
    innerRef?:MutableRefObject<Quill | null>;
    onSubmit: ({image, body}: EditorValue) => void;
}

export default function Editor({variant = "create", onCancel, placeholder="write something",defaultValue = [] ,disabled = false, innerRef, onSubmit}: EditorProps){
    const [text, setText] = useState("");
    const [isToolbarVisible, setIsToolbarVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const submitRef = useRef(onSubmit);
    const placeholderRef =  useRef(placeholder);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const disabledRef = useRef(disabled);

    useLayoutEffect(() => {
        submitRef.current = onSubmit;
        placeholderRef.current = placeholder;
        defaultValueRef.current = defaultValue;
        disabledRef.current = disabled;
    })
    useEffect(() => {

        if (!containerRef.current) return;

        const container = containerRef.current;
        const editorContainer = container.appendChild(
            container.ownerDocument.createElement("div"),
        );

        const options: QuillOptions = {
            theme: "snow",
            placeholder: placeholderRef.current,
            modules: {
                toolbar: 
                    [
                      ["bold", "italic", "strike"],
                      ["link"],
                      [{list: "ordered"}, {list:"bullet"}]
                    ]
                ,
                Keyboard: {
                    bindings: {
                        enter: {
                                key: "Enter",
                                handler: () => {
                                    //TODO:sumbit form 
                                    return;
                                }
                        },
                        shift_enter: {
                        key: "Enter",
                        shiftKey: true,
                        handler: () => {
                            quill.insertText(quill.getSelection()?.index || 0, "\n");
                        }, 
                        },
                    }
                },
            }
        };
        const quill = new Quill(editorContainer,  options);
        quillRef.current = quill;
        quillRef.current.focus();

        if(innerRef){
            innerRef.current = quill;
        }
        quill.setContents(defaultValueRef.current);
        setText(quill.getText());

        quill.on(Quill.events.TEXT_CHANGE, () => {
            setText(quill.getText());
        });
        return () => {
            quill.off(Quill.events.TEXT_CHANGE);
            if(container){
                container.innerHTML = "";
            } 
            if(quillRef.current){
                quillRef.current = null; 
            }
            if(innerRef){
                innerRef.current = null;
            }
        }
    }, [innerRef]);

const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");

    if(toolbarElement){
        toolbarElement.classList.toggle("hidden");
    }
}
const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;
return (
    <div className="flex flex-col">
       <div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
        <div ref={containerRef} className="h-full ql-custom"/>
        <div className="flex px-2 pb-2 z-[5]">
            <Hint label={isToolbarVisible ? "Hide formating" : "Show  formatting"}>
            <Button
             disabled={disabled } 
             size="iconSm"
             variant="ghost"
             onClick={toggleToolbar}
             >
                <PiTextAa className="size-4"/>
            </Button>
            </Hint>
            <Hint label="Emoji">
            <Button
             disabled={disabled} 
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
                     disabled={disabled} 
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
                    <Button className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" size="sm" onClick={() => {}} disabled={disabled || isEmpty}>
                        Save
                    </Button>
                    </div>
                )
            }
            {
                variant === "create" && (
                    <Button disabled={disabled || isEmpty} size="iconSm" className={cn("ml-auto" , isEmpty ? "bg-white hover:bg-white text-muted-foreground " : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white" )}>
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