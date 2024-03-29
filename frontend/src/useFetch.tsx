import { useState } from "react"
import { useEffect } from "react"

function useFetch<T>(url: string, method: string, body?: BodyInit, header?: HeadersInit){
    const [data, setData] = useState<T>()
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal, method: method, body: body, headers: header})
            .then(res=>{
                if(!res.ok){
                    throw Error('ERROR 404')
                }
                return res.json();
            })
            .then((data)=>{
                console.log(data)
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err=>{
                if(err.name === 'AbortError'){
                    console.log('fetch aborted')
                }
                else{
                    setIsPending(false)
                    console.log(err.message)
                    setError(err.message)
                }
            })

        return () => abortCont.abort();
    }, [url]);
    return {data, isPending, error}
}

export default useFetch;