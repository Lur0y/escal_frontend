import useSurveys from "@/api/useSurveys";
import { useState } from "react";

export default function useStudent(){

	const { takeSurvey, getSurveyQuestions } = useSurveys();
	const [surveyId, setSurveyId] = useState("");
	const [studentCode, setStudentCode] = useState("");
	const [comments, setComments] = useState("");
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");

	async function handleLoadSurvey(){

		if (!surveyId || !studentCode.match(/^\d{4}$/)) {
			setError("Ingresa un código de estudiante válido (4 dígitos) y un ID de encuesta.");
			return;
		}

		setError("");
		const data = await getSurveyQuestions({surveyId});
		setQuestions(data);
		setAnswers({});
	
	} 

	async function handleSubmit(){
		if (Object.keys(answers).length !== questions.length) {
			setError("Responde todas las preguntas.");
			return;
		}
		setError("");

		const formattedAnswers = questions.map((q) => ({
			question_id: q.RECORD_id,
			answer_value: answers[q.RECORD_id],
		}));

		await takeSurvey({
			surveyId,
			studentCode,
			comments,
			answers: formattedAnswers,
		});
	
	}

	function handleAnswerChange(questionId, value){
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	}

	return { questions, surveyId, studentCode, comments, error, submitted, handleLoadSurvey, handleSubmit, handleAnswerChange, setSurveyId, setStudentCode, setComments, setSubmitted };

}