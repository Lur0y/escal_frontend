import { useState, useEffect } from "react";
import useCourses from "@/api/useCourses";

export default function useCourseManager() {
	
	const [courses, setCourses] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [editingCourse, setEditingCourse] = useState(null);
	const [name, setName] = useState("");
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });
	const { getCourses, createCourse, changeCourseName, deleteCourse: apiDeleteCourse  } = useCourses();

	async function fetchCourses(){

		const { courses: newCourses} = await getCourses();
		setCourses(newCourses);

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

	function closeSnackbar() {
		setSnackbar({ open: false, message: "" });
	}

	function openAddDialog(){
		setEditingCourse(null);
		setName("");
		setOpenDialog(true);
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

	useEffect(() => {
		fetchCourses();
	}, []);

	return { courses, openDialog, editingCourse, name, setName, snackbar, openAddDialog, openEditDialog, closeDialog, saveCourse, deleteCourse, closeSnackbar };
}
