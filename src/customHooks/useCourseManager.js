import { useState, useEffect } from "react";
import useCourses from "@/api/useCourses";
import useTeachers from "@/api/useTeachers";
import useSurveys from "@/api/useSurveys";
import { useFastDialogContext } from '@/contexts/FastDialogContext';

export default function useCourseManager() {
	
	const [teachers, setTeachers] = useState([]);
	const [courses, setCourses] = useState([]);
	const [openSurveyDialog, setOpenSurveyDialog] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [editingCourse, setEditingCourse] = useState(null);
	const [name, setName] = useState("");
	const [surveyData, setSurveyData] = useState({
		teacher: '',
		courseStartsAt: '',
		courseEndsAt: ''
	})
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });
	const { getCourses, createCourse, changeCourseName, deleteCourse: apiDeleteCourse  } = useCourses();
	const { getTeachers } = useTeachers();
	const { createSurvey } = useSurveys();
	const { fastDialog } = useFastDialogContext();

	async function fetchCourses(){

		const { courses: newCourses} = await getCourses();
		setCourses(newCourses);

	}

	async function fetchTeachers(){

		const { teachers: newTeachers} = await getTeachers();
		setTeachers(newTeachers);

	}

	async function saveCourse(){

		if (!name.trim()) {
			setSnackbar({ open: true, message: "Por favor completa todos los campos" });
			return false;
		}

		if (editingCourse) {
			await changeCourseName({courseId: editingCourse.RECORD_id, name: name});
			setSnackbar({ open: true, message: "Curso actualizado" });
			await fetchCourses();
		} else {
			await createCourse({name});
			setSnackbar({ open: true, message: "Curso creado" });
			await fetchCourses();
		}

		closeDialog();
		return true;
	}
	
	async function deleteCourse(id){
		await apiDeleteCourse({courseId: id});
		setSnackbar({ open: true, message: "Curso eliminado" });
		await fetchCourses();
	}

	async function saveSurvey(){

		if(
			surveyData.teacher == null ||
			surveyData.courseEndsAt == null ||
			surveyData.courseEndsAt == null ||
			surveyData.teacher == undefined ||
			surveyData.courseEndsAt == undefined ||
			surveyData.courseEndsAt == undefined ||
			surveyData.teacher == '' ||
			surveyData.courseEndsAt == '' ||
			surveyData.courseEndsAt == '' 
		){
			setSnackbar({ open: true, message: "Por favor completa todos los campos" });
			return false;
		}

		const {surveyId, teacherCode} = await createSurvey({ 
			courseId: editingCourse.RECORD_id, 
			teacherId: surveyData.teacher.id, 
		 	courseStartsAt: `${surveyData.courseStartsAt} 00:00:00`,
  			courseEndsAt: `${surveyData.courseEndsAt} 23:59:59`
		});

		fastDialog({
			title: 'Encuesta creada exitosamente',
			message: `La encuesta fue creada con éxito, el id es ${surveyId} y el código del maestro es ${teacherCode}`
		});

	}

	function closeSnackbar() {
		setSnackbar({ open: false, message: "" });
	}

	function openAddDialog(){
		setEditingCourse(null);
		setName("");
		setOpenDialog(true);
	}

	function openSurveyDialogFn(course){
		setEditingCourse(course);
		setOpenSurveyDialog(true);
	}

	function openEditDialog(course){
		setEditingCourse(course);
		setName(course.course_name);
		setOpenDialog(true);
	}

	function closeDialog(){
		setOpenDialog(false);
		setName("");
		setEditingCourse(null);
	}

	function closeSurveyDialog(){
		setOpenSurveyDialog(false);
		setName("");
		setEditingCourse(null);
	}

	useEffect(() => {
		fetchCourses();
		fetchTeachers();
	}, []);

	return { surveyData, setSurveyData, teachers, saveSurvey, closeSurveyDialog, openSurveyDialog, courses, openDialog, editingCourse, name, setName, snackbar, openAddDialog, openEditDialog, closeDialog, saveCourse, deleteCourse, closeSnackbar, openSurveyDialogFn };
}
