import useApiCall from "@/api/useApiCall";

export default function useAdmins() {

    const { apiCallStart, apiCallEnd } = useApiCall();

    async function loadDefaultAdmins() {

        const url = `${import.meta.env.VITE_BACKEND_DIR}/admins/default`;
        const data = {};
        apiCallStart();
        try {
            axios.post(url, data);
        } catch (error) {
            apiFatalError(error);
            // Custom errors
        } finally {
            apiCallEnd();
        }

    }

    return { loadDefaultAdmins };

}