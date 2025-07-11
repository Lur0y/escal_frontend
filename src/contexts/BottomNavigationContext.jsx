import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottonNavigation";
import { useLocation } from "react-router-dom";

const BottomNavigationContext = createContext();

export function BottomNavigationContextProvider({ children }) {

	function getInitialValue(pathname){
		if (pathname.startsWith("/admin/courses")) return 0;
		if (pathname.startsWith("/admin/teachers")) return 1;
		return 5; 
	};
	const location = useLocation();
	const [value, setValue] = useState(getInitialValue(location.pathname));
	const navigate = useNavigate();

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