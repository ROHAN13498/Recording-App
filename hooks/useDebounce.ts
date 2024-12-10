import { useEffect, useState } from "react";


export function useDebounce<T>(value:T,delay:number){
    const [debouncedValue,SetDebouncedValue]=useState<T>(value);
    useEffect(()=>{
        const timer=setTimeout(() => {
            
            SetDebouncedValue(value)
        }, delay);
        return ()=>{
            clearInterval(timer)
        }
    },[value,delay])
    return debouncedValue;
}