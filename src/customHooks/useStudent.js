import useSurveys from "@/api/useSurveys";
import { useEffect, useState } from "react";
import { useFastDialogContext } from '@/contexts/FastDialogContext'

export default function useStudent() {

	const { takeSurvey, getSurveyQuestions } = useSurveys();
	const { fastDialog } = useFastDialogContext();
	const [surveyId, setSurveyId] = useState("");
	const [studentCode, setStudentCode] = useState("");
	const [comments, setComments] = useState("");
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	async function saveLocal() {

		const data = {
			surveyId,
			studentCode,
			comments,
			answers,
			questions
		};
		sessionStorage.setItem('local-answers', JSON.stringify(data));

	}

	async function deleteLocal() {
		sessionStorage.removeItem('local-answers');
	}

	async function loadLocal() {
		const data = sessionStorage.getItem('local-answers');
		if (data != null) {
			const parsedData = JSON.parse(data);
			setSurveyId(parsedData.surveyId);
			setStudentCode(parsedData.studentCode);
			setComments(parsedData.comments);
			setAnswers(parsedData.answers);
			setQuestions(parsedData.questions);
		}
	}

	async function handleLoadSurvey() {

		if (!surveyId || !studentCode.match(/^\d{4}$/)) {
			setError("Ingresa un código de estudiante válido (4 dígitos) y un ID de encuesta.");
			return;
		}

		setError("");
		const { questions } = await getSurveyQuestions({ surveyId });
		setQuestions(questions);
		setAnswers(questions.map((q) => ({
			question_text: q.question_text,
			question_id: q.RECORD_id,
			answer_value: ''
		})));

	}

	function updateAnswerValue({ questionId, value }) {

		const newAnswers = [...answers];
		const index = questions.findIndex((q) => q.RECORD_id == questionId);
		newAnswers[index].answer_value = value;
		setAnswers(newAnswers);
		saveLocal();

	}

	async function handleSubmit() {

		let answered = true;
		answers.forEach(answer => {
			if (
				answer.answer_value == undefined ||
				answer.answer_value == null ||
				answer.answer_value == ''
			) {
				answered = false;
			}
		});
		if (!answered) {
			fastDialog({
				title: 'Preguntas faltantes',
				message: 'Por favor, contesta todas las preguntas de la encuesta'
			});
			return;
		}
		setError("");

		const apiAnswers = answers.map((answer) => ({
			question_id: Number(answer.question_id),
			answer_value: Number(answer.answer_value.value)
		}));

		const { surveyAnsweredSuccesfully } = await takeSurvey({
			surveyId,
			studentCode,
			comments,
			answers: apiAnswers
		});

		fastDialog({
			title: (surveyAnsweredSuccesfully) ? 'Encuesta contestada exitosamente' : 'Codigo incorrecto o previamente utilizado',
			message: (surveyAnsweredSuccesfully) ? 'Tu respuesta se ha almacenado, ya puedes cerrar la ventana' : 'El código de estudiante no corresponde con esta encuesta o ya fue utilizado por alguien mas'
		});

		if (surveyAnsweredSuccesfully) {
			deleteLocal();
		}

	}

	function handleAnswerChange(questionId, value) {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	}

	useEffect(() => {
		loadLocal();
	}, []);

	return { updateAnswerValue, answers, questions, surveyId, studentCode, comments, error, submitted, handleLoadSurvey, handleSubmit, handleAnswerChange, setSurveyId, setStudentCode, setComments, setSubmitted };

}