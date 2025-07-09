export default function useApiCall() {

    const authOptions = {

    };

    function apiCallStart() {
        // TODO
    }

    function apiCallEnd() {
        // TODO
    }

    function apiFatalError(error) {
        console.log(error);
    }

    return { apiCallStart, apiCallEnd, apiFatalError, authOptions };

}