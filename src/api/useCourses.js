import useApiCall from '@/api/useApiCall';
import axios from 'axios';

export default function useCourses() {

    const { apiCallStart, apiCallEnd, apiErrorManager, BASE_URL, authOptions } = useApiCall();

    async function getCourses() {

        const url = `${BASE_URL}/courses`;
        let courses = [];
        apiCallStart();
        try {
            const response = await axios.get(url, authOptions);
            courses = response.data;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ courses });

    }


    return { getCourses };

}