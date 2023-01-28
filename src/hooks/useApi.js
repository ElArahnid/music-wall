import { useEffect, useState } from "react"

export const useApi = (handler) => {

   const [data, setData]        = useState(null);
   const [loading, setLoading]  = useState(true);
   const [error, setError]      = useState(null);

   useEffect(() => {
    setLoading(true);
    handler()
        .then(      (res)   => {setData(res);       })
        .catch(     (err)   => {setError(err);      })
        .finally(   ()      => {setLoading(false);  })
   }, [handler])

   return {data, setData, loading, error}

}