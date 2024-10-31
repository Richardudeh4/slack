import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { SignInFlow } from '../types'
import { useAuthActions } from "@convex-dev/auth/react";
import {TriangleAlert}  from "lucide-react";

interface SignInCardProps {
  setState: (state:SignInFlow) => void;
}
const  SignInCard = ({setState}: SignInCardProps) => {

  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignin = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    signIn("password" , {email, password, flow: "signIn"})
    .catch(() => {
        setError("Invalid email or password");
    })
    .finally(() => {
      setPending(false);
    })
  };
  const onProviderSignIn = (value: "github" | "google") => { signIn(value); };
  return (
    <Card className='h-full w-full p-8'>
     <CardHeader className='px-0 pt-0'>
      <CardTitle>
      Login to continue
      </CardTitle>
      <CardDescription>
       Use your Email or another service to continue
     </CardDescription>
     </CardHeader>
     {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />
           <p>{error}</p> 
        </div>
     )}
<CardContent className='space-y-5 px-0 pb-0'>
<form onSubmit={onPasswordSignin} className='space-y-2.5'>
<Input disabled={pending} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type="email" required/>
<Input disabled={pending } value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'  type='password' required/>
<Button type="submit" className='w-full' size="lg" disabled={pending}>  
continue
</Button>
    </form>
    <Separator/>
    <div className="flex flex-col gap-y-2.5">
      <Button disabled={pending} onClick={() => onProviderSignIn("google")}  variant="outline" size="lg" className='w-full relative'>
        <FcGoogle  className='top-2.5 size-5 absolute left-2.5'/>
        Continue with Google
      </Button>
      <Button disabled={pending} onClick={() => onProviderSignIn("github")} variant="outline" size="lg" className='w-full relative'>
        <FaGithub  className='top-2.5 size-5 absolute left-2.5'/>
        Continue with Github
      </Button>
    </div>
    <p className="text-xs text-muted-foreground">
    Don&apos;t have an account? <span onClick={() => setState("signUp")} className='text-sky-700 hover:underline cursor-pointer'>Sign up</span>
    </p>
     </CardContent>
      </Card> 
  )
}

export default SignInCard 