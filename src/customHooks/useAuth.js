import useTokens from "@/api/useTokens";
import useApiCall from "@/api/useApiCall";
import { useFastDialogContext } from '@/contexts/FastDialogContext'
import { useNavigate } from 'react-router-dom';

export default function useAuth() {

    const { createToken } = useTokens();
    const { fastDialog } = useFastDialogContext();
    const { setToken, deleteRelatedTokens, token } = useApiCall();
    const navigate = useNavigate();

    async function login({ username, password, route }) {

        const { token, credentialsValid } = await createToken({ username: username, pwd: password });
        if (!credentialsValid) {
            fastDialog({
                title: 'Claves incorrectas',
                message: 'Su usuario o contraseña son incorrectos'
            });
            return;
        }
        setToken(token);
        sessionStorage.setItem('token', token);
        navigate(route);
    }

    async function logout() {

        await deleteRelatedTokens({ token: token });
        setToken(null);
        sessionStorage.removeItem('token');
        navigate('/login');

    }

    return { login, logout };

}