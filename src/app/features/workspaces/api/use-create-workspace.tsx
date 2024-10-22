import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useCallback, useState } from "react";

type RequestType = {name: string};
type ResponseType = Id<"workspaces"> | null;

type Options = {
    onSuccess?: (data: ResponseType ) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};
export const useCreateWorkspace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null >(null); 
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSettled, setIsSettled] = useState(false);

    const mutation = useMutation(api.workspaces.create);

    const mutate = useCallback(async (values:RequestType , options?: Options) => {
        try{
            setData(null);
            setError(null);
           
            setIsError(false);
            setIsSettled(false);
            setIsSuccess(false);

            setIsPending(true);

            const response = await mutation(values);
            options?.onSuccess?.(response);
            return response;
        }
        catch(error){
            options?.onError?.(error as Error);

            if(options?.throwError){
                throw error;
            }
        }
        finally{
            setIsPending(false);
            setIsSettled(true);
            options?.onSettled?.();
        }
    }, [mutation]);
    return {
        mutate,
    };
}