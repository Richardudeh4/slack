import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/src/hooks/use-workspace-id";
import { cva, VariantProps } from "class-variance-authority";
import { Icon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";


const sidebarItemVariants = cva(
    "flex item-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
    {
        variants:{
            variant: {
                default : "text-[#f9edffcc]",
                active: "text-[#481349] bg-white/90 hover:bg-white/90",
            }
        },
        defaultVariants: {
            variant: "default",

        }
    }
)
interface SidebarItemProps{
    label: string;
    id: string;
    icon : LucideIcon | IconType;
    variant?: VariantProps<typeof sidebarItemVariants>["variant"];
};

export const SidebarItem = ({ label, id, icon:Icon, variant}: SidebarItemProps) => {
    const workSpaceId = useWorkspaceId();
    return (
            <Button variant="transparent" size="sm" asChild className={cn(sidebarItemVariants({variant}))}>
                <Link href={`/workspace/${workSpaceId}/channel/${id}`}>
                    <Icon className="size-3.5 mr-1 shrink-0"/>
                    <span className="text-sm truncate">{label}</span>
                </Link>
            </Button>
    )
}