import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderContextProvider } from "@/contexts/LoaderContext";
import { FastDialogContextProvider } from "@/contexts/FastDialogContext";
import ProtectedRoute from "@/components/ProtectedRoute"
import Login from "@/pages/public/Login";
import Home from "@/pages/public/Home";
import NotFound from "@/pages/public/NotFound";
import AdminPanel from "@/pages/admin/AdminPanel";
import Unauthorized from "@/pages/public/unauthorized"
import LoadAdmin from "@/pages/public/LoadAdmin";
import CourseManager from "@/pages/admin/CourseManager";

export default function App() {

	return (
		<BrowserRouter>
			<FastDialogContextProvider>
				<LoaderContextProvider>
					<Routes>
						<Route path="/">
							<Route index element={<Home />} />
							<Route path="login" element={<Login />} />
							<Route path="home" element={<Home />} />
							<Route path="unauthorized" element={<Unauthorized />} />
							<Route path="admin/load" element={<LoadAdmin />} />
							<Route path="admin/panel" element={
								<ProtectedRoute>
									<AdminPanel />
								</ProtectedRoute>
							} />
							<Route path="admin/courses" element={
								<ProtectedRoute>
									<CourseManager />
								</ProtectedRoute>
							} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</LoaderContextProvider>
			</FastDialogContextProvider>
		</BrowserRouter>
	);
}