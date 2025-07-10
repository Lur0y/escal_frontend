import useApiCall from '@/api/useApiCall';

export default function useTokens() {

    const { apiCallStart, apiCallEnd, setToken, BASE_URL } = useApiCall();

    async function createToken({username, pwd}) {

        const url = `${BASE_URL}/tokens`;
        const data = { username, pwd};
        apiCallStart();
        try {
            const response = axios.post(url, data);
            setToken(response.data.token);
            sessionStorage.setItem('token', response.data.token);
            // navigate home
            // en el logout has lo ipuesto, token a null
        } catch (error) {
            if(error?.reponse?.statusCode == 401){
                fastDialog({
                    title: 'Claves incorrectas',
                    message: 'Su usuario o contraseña son incorrectos'
                });
            }else{
                apiFatalError(error);
            }
        } finally {
            apiCallEnd();
        }

    }

    return { createToken };

}