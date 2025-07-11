import { useState, useEffect } from "react";
import useTeachers from "@/api/useTeachers";

export default function useTeacherManager() {
	
	const [teachers, setTeachers] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [editingTeacher, setEditingTeacher] = useState(null);
	const [name, setName] = useState("");
	const [workerId, setWorkerId] = useState("");
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });
	const { getTeachers, createTeacher, changeTeacherData, deleteTeacher: apiDeleteTeacher  } = useTeachers();

	async function fetchTeachers(){

		const { teachers: newTeachers} = await getTeachers();
		setTeachers(newTeachers);

	}

	async function saveTeacher(){

		if (!name.trim() || !workerId.trim()) {
			setSnackbar({ open: true, message: "Por favor completa todos los campos" });
			return false;
		}

		if (editingTeacher) {
			await changeTeacherData({teacherId: editingTeacher.RECORD_id, name: name, workerId: workerId});
			setSnackbar({ open: true, message: "Maestro actualizado" });
			await fetchTeachers();
		} else {
			await createTeacher({name, workerId});
			setSnackbar({ open: true, message: "Maestro creado" });
			await fetchTeachers();
		}

		closeDialog();
		return true;
	}
	
	async function deleteTeacher(id){
		await apiDeleteTeacher({teacherId: id});
		setSnackbar({ open: true, message: "Maestro eliminado" });
		fetchTeachers();
	}

	function closeSnackbar() {
		setSnackbar({ open: false, message: "" });
	}

	function openAddDialog(){
		setEditingTeacher(null);
		setName("");
		setWorkerId("");
		setOpenDialog(true);
	}

	function openEditDialog(teacher){
		setEditingTeacher(teacher);
		setName(teacher.teacher_name);
		setWorkerId(teacher.worker_id);
		setOpenDialog(true);
	}

	function closeDialog(){
		setOpenDialog(false);
	}

	useEffect(() => {
		fetchTeachers();
	}, []);

	return { teachers, openDialog, editingTeacher, name, setName, workerId, setWorkerId, snackbar, openAddDialog, openEditDialog, closeDialog, saveTeacher, deleteTeacher, closeSnackbar };
}
