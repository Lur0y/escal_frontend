import { useState, useEffect } from "react";
import useTeachers from "@/api/useTeachers";

export default function useTeacherManager() {
	
	const [teachers, setTeachers] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [editingTeacher, setEditingTeacher] = useState(null);
	const [name, setName] = useState("");
	const [workerId, setWorkerId] = useState("");
	const [snackbar, setSnackbar] = useState({ open: false, message: "" });
	const { getTeachers } = useTeachers();

	async function fetchTeachers(){
		const { teachers: newTeachers} = await getTeachers();
		setTeachers(newTeachers);
	}

	async function saveTeacher(){
		// 	if (!name.trim() || !workerId.trim()) {
		// setSnackbar({ open: true, message: "Por favor completa todos los campos" });
		// return false;
		// }

		// if (editingTeacher) {
		// // Actualizar maestro
		// // await api.put(`/teachers/${editingTeacher.id}`, { name, workerId });
		// setTeachers((prev) =>
		// 	prev.map((t) => (t.id === editingTeacher.id ? { ...t, name, workerId } : t))
		// );
		// setSnackbar({ open: true, message: "Maestro actualizado" });
		// } else {
		// // Crear maestro
		// // const newTeacher = await api.post('/teachers', { name, workerId });
		// const newTeacher = { id: Date.now(), name, workerId }; // simula nuevo id
		// setTeachers((prev) => [...prev, newTeacher]);
		// setSnackbar({ open: true, message: "Maestro creado" });
		// }
		// closeDialog();
		// return true;
	}
	
	async function deleteTeacher(id){
		// // await api.delete(`/teachers/${id}`);
		// setTeachers((prev) => prev.filter((t) => t.id !== id));
		// setSnackbar({ open: true, message: "Maestro eliminado" });
	}

	function closeSnackbar(params) {
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
		setName(teacher.name);
		setWorkerId(teacher.workerId);
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
