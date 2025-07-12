import useApiCall from '@/api/useApiCall';
import axios from 'axios';

export default function useSurveys() {

    const { apiCallStart, apiCallEnd, apiErrorManager, BASE_URL, authOptions } = useApiCall();

    async function createSurvey({ courseId, teacherId, courseStartsAt, courseEndsAt }) {

        const url = `${BASE_URL}/surveys`;
        const data = {
            FK_course_id: courseId,
            FK_teacher_id: teacherId,
            course_starts_at: courseStartsAt,
            course_ends_at: courseEndsAt
        };
        let surveyId = 0;
        let teacherCode = 0;
        apiCallStart();
        try {
            const response = await axios.post(url, data, authOptions);
            surveyId = response.data.id;
            teacherCode = response.data.teacher_code;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ surveyId, teacherCode });

    }

    async function openSurvey({ surveyId, teacherCode, studentsQuantity }) {

        const url = `${BASE_URL}/surveys/${surveyId}/state`;
        const data = {
            to: 2,
            teacher_code: teacherCode,
            students_quantity: studentsQuantity
        };
        apiCallStart();
        let student_codes = [];
        let gone = false;
        let codeOk = true;
        try {
            const response = await axios.patch(url, data, authOptions);
            student_codes = response.data.student_codes;
        } catch (error) {
            if (error?.response?.status == 410) {
                gone = true;
            } else if (error?.response?.status == 401) {
                codeOk = false;
            } else {
                apiErrorManager(error);
            }
        } finally {
            apiCallEnd();
        }

        return ({ student_codes, gone, codeOk });

    }

    async function closeSurvey({ surveyId, teacherCode }) {

        const url = `${BASE_URL}/surveys/${surveyId}/state`;
        const data = {
            to: 3,
            teacher_code: teacherCode,
            students_quantity: 0
        };
        apiCallStart();
        let student_codes = [];
        try {
            const response = await axios.patch(url, data, authOptions);
            student_codes = response.data.student_codes;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ student_codes });

    }

    async function takeSurvey({ surveyId, studentCode, comments, answers }) {

        const url = `${BASE_URL}/surveys/${surveyId}/answers`;
        const data = {
            student_code: studentCode,
            comments: comments,
            answers: answers
        };
        let surveyAnsweredSuccesfully = true;
        apiCallStart();
        try {
            await axios.post(url, data, authOptions);
        } catch (error) {
            if (error?.response?.status == 401) {
                surveyAnsweredSuccesfully = false;
            } else {
                apiErrorManager(error);
            }
        } finally {
            apiCallEnd();
        }

        return { surveyAnsweredSuccesfully };

    }

    async function getSurveyQuestions({ surveyId }) {

        const url = `${BASE_URL}/surveys/${surveyId}/questions`;
        let questions = [];
        apiCallStart();
        try {
            const response = await axios.get(url, authOptions);
            questions = response.data;
        } catch (error) {
            apiErrorManager(error);
        } finally {
            apiCallEnd();
        }

        return ({ questions });

    }

    return { createSurvey, openSurvey, closeSurvey, takeSurvey, getSurveyQuestions };

}