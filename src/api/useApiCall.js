import { useEffect, useState } from "react";
import { useLoaderContext } from '@/contexts/LoaderContext';
import { useFastDialogContext } from '@/contexts/FastDialogContext';
import { useNavigate } from "react-router-dom";

export default function useApiCall() {

    const navigate = useNavigate();
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

    function apiErrorManager(error) {
        console.log(error);
        if (error?.response?.status == 425) {
            fastDialog({
                title: 'Sin Administrador',
                message: 'No se puede utilizar el sistema debido a que no hay ningún administrador cargado en base de datos',
                loadAdmin: true
            });
            return;
        }
        if (error?.response?.status == 401) {
            navigate('/unauthorized');
            return;
        }
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

    return { apiCallStart, apiCallEnd, apiErrorManager, setToken, token, authOptions, BASE_URL };

}