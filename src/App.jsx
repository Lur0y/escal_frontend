import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderContextProvider } from "@/contexts/LoaderContext";
import { FastDialogContextProvider } from "@/contexts/FastDialogContext";
import ProtectedRoute from "@/components/ProtectedRoute"
import Login from "@/pages/public/Login";
import Home from "@/pages/public/Home";
import NotFound from "@/pages/public/NotFound";
import AdminPanel from "@/pages/admin/AdminPanel";

export default function App() {

	return (
		<>
			<FastDialogContextProvider>
				<LoaderContextProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/">
								<Route index element={<Home />} />
								<Route path="login" element={<Login />} />
								<Route path="home" element={<Home />} />
								<Route path="admin/panel" element={
									<ProtectedRoute>
										<AdminPanel />
									</ProtectedRoute>
								} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</LoaderContextProvider>
			</FastDialogContextProvider>
		</>
	);
}