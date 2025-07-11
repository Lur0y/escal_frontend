import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottonNavigation";
import { useLocation } from "react-router-dom";

const BottomNavigationContext = createContext();

export function BottomNavigationContextProvider({ children }) {

	const [value, setValue] = useState(5);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
	
		if(value == 0){
			navigate('/admin/courses');
		}else if(value == 1){
			navigate('/admin/teachers');
		}

	}, [value]);

	return (
		<BottomNavigationContext.Provider value={{ value }}>
			{children}
			{
				location.pathname.startsWith("/admin") &&
				<BottomNavigation value={value} setValue={setValue} />
			}
		</BottomNavigationContext.Provider >
	);

}

export function useBottonNavigationContext() {
	return useContext(BottomNavigationContext);
}