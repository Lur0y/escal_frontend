import useApiCall from "@/api/useApiCall";
import axios from 'axios';

export default function useAdmins() {

    const { apiErrorManager, BASE_URL } = useApiCall();

    async function loadDefaultAdmins() {

        const url = `${BASE_URL}/admins/default`;
        const data = {};
        try {
            await axios.post(url, data);
        } catch (error) {
            apiErrorManager(error);
        }

    }

    return { loadDefaultAdmins };

}