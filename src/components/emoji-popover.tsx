import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

interface EmojiPopoverProps{
    children: React.ReactNode;
    hint?: "Emoji";
    onEmojiSelect: (emoji:any) => void;
}

export const EmojiPopover = ({children, hint, onEmojiSelect}:EmojiPopoverProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return(
        <TooltipProvider>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                        {children}
                        </TooltipTrigger>
                        <TooltipContent className="bg-black text-white border border-white/5 ">
                            <p className="font-medium text-xs">{hint}</p>
                        </TooltipContent>
                    </PopoverTrigger>
                </Tooltip>
                <PopoverContent>
                      
                </PopoverContent>
            </Popover>
        </TooltipProvider>
    )
}