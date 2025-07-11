import useApiCall from '@/api/useApiCall';
import axios from 'axios';

export default function useTokens() {

    const { apiCallStart, apiCallEnd, apiErrorManager, BASE_URL } = useApiCall();

    async function createToken({ username, pwd }) {

        const url = `${BASE_URL}/tokens`;
        const data = { username, pwd };
        let token = '';
        let credentialsValid = false;
        apiCallStart();
        try {
            const response = await axios.post(url, data);
            token = response.data.token;
            credentialsValid = true;
        } catch (error) {
            if (error?.response?.status != 401) {
                apiErrorManager(error);
            }
        } finally {
            apiCallEnd();
        }

        return ({ token, credentialsValid });

    }

    async function validateToken({ token }) {

        const url = `${BASE_URL}/tokens/validate`;
        let tokenValid = false;
        const options = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        apiCallStart();
        try {
            await axios.get(url, options);
            tokenValid = true;
        } catch (error) {
            if (error?.response?.status != 401) {
                apiErrorManager(error);
            }
        } finally {
            apiCallEnd();
        }

        return ({ tokenValid });

    }

    async function deleteRelatedTokens({ token }) {

        const url = `${BASE_URL}/tokens`;
        const options = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        apiCallStart();
        try {
            await axios.delete(url, options);
        } catch (error) {
            if (error?.response?.status != 401) {
                apiErrorManager(error);
            }
        } finally {
            apiCallEnd();
        }

    }

    return { createToken, validateToken, deleteRelatedTokens };

}