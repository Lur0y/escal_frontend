import { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from '@mui/material';

const LoaderContext = createContext();

export function LoaderContextProvider({children}){

	const [isLoading, setIsLoading] = useState(false);

	return(
		<LoaderContext.Provider value={{setIsLoading}}>
			<Backdrop
				sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{children}
		</LoaderContext.Provider>
	);

}

export function useLoaderContext(){
	return useContext(LoaderContext);
}