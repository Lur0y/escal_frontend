import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<></>} />
						<Route path="login" element={<></>} />
						<Route path="*" element={<>404 - Not Found</>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}