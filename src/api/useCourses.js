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

    async function createCourse({ name }) {

        const url = `${BASE_URL}/courses`;
        const data = {
            course_name: name
        };
        let courseId = 0;
        apiCallStart();
        try {
            const response = await axios.post(url, data, authOptions);
            courseId = response.data.id;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ courseId });
        
    }

    async function changeCourseName({ courseId, name }) {
        
        const url = `${BASE_URL}/courses/${courseId}`;
        const data = {
            course_name: name
        };
        apiCallStart();
        try {
            await axios.put(url, data, authOptions);
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

    }

    async function deleteCourse({ courseId }) {
        
        const url = `${BASE_URL}/courses/${courseId}`;
        apiCallStart();
        try {
            await axios.delete(url, authOptions);
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

    }

    return { getCourses, createCourse, changeCourseName, deleteCourse };

}