import useApiCall from '@/api/useApiCall';
import axios from 'axios';

export default function useTeachers() {

    const { apiCallStart, apiCallEnd, apiErrorManager, BASE_URL, authOptions } = useApiCall();

    async function getTeachers() {

        const url = `${BASE_URL}/teachers`;
        let teachers = [];
        apiCallStart();
        try {
            const response = await axios.get(url, authOptions);
            teachers = response.data;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ teachers });

    }

    async function getTeacherPhoto({teacherId}) {

        const url = `${BASE_URL}/teachers/${teacherId}/photo`;
        const options = {
            ...authOptions,
            responseType: 'blob'
        }
        let photoUrl = null;
        apiCallStart();
        try {
            const response = await axios.get(url, options);
            photo = URL.createObjectURL(response.data);
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ photoUrl });

    }

    async function createTeacher({ name, workerId }) {

        const url = `${BASE_URL}/teachers`;
        const data = {
            teacher_name: name,
            worker_id: workerId
        };
        let teacherId = 0;
        apiCallStart();
        try {
            const response = await axios.post(url, data, authOptions);
            teacherId = response.data.id;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ teacherId });
        
    }

    async function changeTeacherData({ teacherId, name, workerId }) {

        const url = `${BASE_URL}/teachers/${teacherId}`;
        const data = {
            teacher_name: name,
            worker_id: workerId
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

    async function changeTeacherPhoto({ teacherId, photo }) {

        const url = `${BASE_URL}/teachers/${teacherId}`;
        const formData = new FormData();
        formData.append('photo', photo);
        const options = {
            ...authOptions,
            headers: {
                ...authOptions.headers,
                'Content-Type': 'multipart/form-data',
            },
        };
        apiCallStart();
        try {
            await axios.post(url, formData, options);
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }
        
    }

    async function deleteTeacher({ teacherId }) {
        
        const url = `${BASE_URL}/teachers/${teacherId}`;
        apiCallStart();
        try {
            await axios.delete(url, authOptions);
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

    }

    return { getTeachers, getTeacherPhoto, createTeacher, changeTeacherData, changeTeacherPhoto, deleteTeacher };

}