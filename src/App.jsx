import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoaderContextProvider } from "@/contexts/LoaderContext";
import { FastDialogContextProvider } from "@/contexts/FastDialogContext";
import ProtectedRoute from "@/components/ProtectedRoute"
import Login from "@/pages/public/Login";
import Home from "@/pages/public/Home";
import NotFound from "@/pages/public/NotFound";
import AdminPanel from "@/pages/admin/AdminPanel";
import Unauthorized from "@/pages/public/Unauthorized"
import LoadAdmin from "@/pages/public/LoadAdmin";
import CourseManager from "@/pages/admin/CourseManager";
import TeacherManager from "@/pages/admin/TeacherManager";
import { BottomNavigationContextProvider } from "@/contexts/BottomNavigationContext";
import Student from "@/pages/public/Student";
import Teacher from "@/pages/public/Teacher";

export default function App() {

	return (
		<BrowserRouter>
			<FastDialogContextProvider>
				<LoaderContextProvider>
					<BottomNavigationContextProvider>
						<Routes>
							<Route path="/">
								<Route index element={<Home />} />
								<Route path="login" element={<Login />} />
								<Route path="student" element={<Student />} />
								<Route path="teacher" element={<Teacher />} />
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
								<Route path="admin/teachers" element={
									<ProtectedRoute>
										<TeacherManager />
									</ProtectedRoute>
								} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</BottomNavigationContextProvider>
				</LoaderContextProvider>
			</FastDialogContextProvider>
		</BrowserRouter>
	);
}