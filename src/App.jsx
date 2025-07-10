import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderContextProvider } from "@/contexts/LoaderContext";
import { FastDialogContextProvider } from "@/contexts/FastDialogContext";
import Test from "@/pages/Test";

export default function App() {

	return (
		<>
			<FastDialogContextProvider>
				<LoaderContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/">
								<Route index element={<Test />} />
								<Route path="login" element={<></>} />
								<Route path="*" element={<>404 - Not Found</>} />
							</Route>
						</Routes>
					</BrowserRouter>
				</LoaderContextProvider>
			</FastDialogContextProvider>
		</>
	);
}