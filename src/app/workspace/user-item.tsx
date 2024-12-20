import { Button } from "@/components/ui/button"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useWorkspaceId } from "@/src/hooks/use-workspace-id";
import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";

const userItemVariants = cva(
    "flex item-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
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
interface UserItemProps{
    id: Id<"members">;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof userItemVariants>["variant"];
}
export const UserItem = ({id, label = "Member", image, variant}: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback = label.charAt(0).toUpperCase();
    return (
        <Button variant="transparent" className={cn(userItemVariants({variant: variant}))} size="sm" asChild>
            <Link href={`/workspace/${workspaceId}/member/${id}`}>
            <Avatar className="size-5 rounded-md mr-1">
                <AvatarImage className="rounded-md" src={image}/>
                <AvatarFallback className="rounded-md">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
            <span className="text-sm truncate">{label}</span>
            </Link>
        </Button>
    )
}