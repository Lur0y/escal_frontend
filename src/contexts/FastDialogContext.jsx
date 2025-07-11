import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FastDialogContext = createContext();

export function FastDialogContextProvider({ children }) {

	const [loadAdmin, setLoadAdmin] = useState(false);
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	function handleClose() {
		setOpen(false);
	}

	function handleLoadAdmin(){
		navigate('admin/load');
		setOpen(false);
	}

	function fastDialog({ title = '', message = '' , loadAdmin = false}) {

		setLoadAdmin(loadAdmin);
		setTitle(title);
		setMessage(message);
		setOpen(true);

	}

	return (
		<FastDialogContext.Provider value={{ fastDialog }}>
			{children}
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Entendido</Button>
					{
						loadAdmin &&
						<Button onClick={handleLoadAdmin}>Cargar Administrador</Button>
					}
				</DialogActions>
			</Dialog>
		</FastDialogContext.Provider >
	);

}

export function useFastDialogContext() {
	return useContext(FastDialogContext);
}