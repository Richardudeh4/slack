"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,} from "@/src/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { useCurrentUser } from "@/src/app/auth/api/use-current-user";
import { Loader2, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
  
export default function UserButton(){
    const {signOut} = useAuthActions();
    const {data, isLoading} = useCurrentUser();
    if(isLoading){
        return <Loader2 className="size-4 animate-spin text-muted-foreground"/>
    }
    if(!data){
        return null;
    }
    const {image, name} = data;
    const avatarFallback = name!.charAt(0).toUpperCase();

    return(
       <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage alt="image" src={image} className="rounded-full"/>
                <AvatarFallback className="bg-rose-300 text-white ">
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="right" className="w-60">
            <DropdownMenuItem onClick={() => signOut()} className="h-10">
            <LogOut className="size-4 mr-2"/>
            Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
    )
}