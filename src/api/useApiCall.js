import { useEffect, useState } from "react";
import { useLoaderContext } from '@/contexts/LoaderContext';
import { useFastDialogContext } from  '@/contexts/FastDialogContext';

export default function useApiCall() {

    const BASE_URL = import.meta.env.VITE_BACKEND_DIR;
    const { setIsLoading } = useLoaderContext();
    const { fastDialog } = useFastDialogContext();
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    const [authOptions, setAuthOptions] = useState({
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    function apiCallStart() {
        setIsLoading(true);
    }

    function apiCallEnd() {
        setIsLoading(false);
    }

    function apiFatalError(error) {
        console.log(error);
        fastDialog({
            title: 'Error inesperado',
            message: 'Ha ocurrido un error inesperado en el programa, por favor reporta esta falla'
        });
    }

    useEffect(() => {
        setAuthOptions({
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }, [token]);

    return { apiCallStart, apiCallEnd, apiFatalError, setToken, authOptions, BASE_URL };

}