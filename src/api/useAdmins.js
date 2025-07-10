import useApiCall from "@/api/useApiCall";

export default function useAdmins() {

    const { apiCallStart, apiCallEnd, BASE_URL } = useApiCall();

    async function loadDefaultAdmins() {

        const url = `${BASE_URL}/admins/default`;
        const data = {};
        apiCallStart();
        try {
            axios.post(url, data);
        } catch (error) {
            apiFatalError(error);
        } finally {
            apiCallEnd();
        }

    }

    return { loadDefaultAdmins };

}