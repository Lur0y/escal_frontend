import { useState, useEffect } from "react";
import useSurveys from "@/api/useSurveys";

export default function useTeacher() {

	const [surveyId, setSurveyId] = useState("");
	const [teacherCode, setTeacherCode] = useState("");
	const [studentCount, setStudentCount] = useState("");
	const [studentCodes, setStudentCodes] = useState([]);
	const [error, setError] = useState("");
	const { openSurvey, closeSurvey } = useSurveys();

	async function handleOpen() {

		setError("");

		const id = parseInt(surveyId);
		const count = parseInt(studentCount);

		if (!Number.isInteger(id) || id <= 0) {
			setError("El ID de la encuesta debe ser un número entero mayor a 0.");
			return;
		}

		if (!/^\d{4}$/.test(teacherCode)) {
			setError("El código del maestro debe tener exactamente 4 dígitos.");
			return;
		}

		if (!Number.isInteger(count) || count <= 0) {
			setError("La cantidad de estudiantes debe ser un número entero mayor a 0.");
			return;
		}

		const { student_codes, gone, codeOk } = await openSurvey({
			surveyId: surveyId,
			teacherCode: teacherCode,
			studentsQuantity: studentCount
		});

		if (gone) {
			setError("Esta encuesta ya fue cerrada, no se puede volver a abrir");
			return;
		}

		if (!codeOk) {
			setError("El código es invalido, por favor verifica que coincida con el id que proporcionaste");
			return;
		}

		const sessionData = {
			surveyId: id,
			studentCount: count,
			studentCodes: student_codes,
			teacherCode: teacherCode
		};

		sessionStorage.setItem("teacher-session", JSON.stringify(sessionData));
		setStudentCodes(student_codes);
		setSurveyId(id);
		setStudentCount(count);

	}

	async function handleClose() {

		await closeSurvey({ surveyId, teacherCode });
		sessionStorage.removeItem("teacher-session");
		setSurveyId("");
		setTeacherCode("");
		setStudentCount("");
		setStudentCodes([]);
		setError("");

	}

	useEffect(() => {
		const session = sessionStorage.getItem("teacher-session");
		if (session) {
			const data = JSON.parse(session);
			setSurveyId(data.surveyId);
			setStudentCount(data.studentCount);
			setStudentCodes(data.studentCodes);
			setTeacherCode(data.teacherCode);
		}
	}, []);

	return { surveyId, setSurveyId, teacherCode, setTeacherCode, studentCount, setStudentCount, studentCodes, error, handleOpen, handleClose };
}
