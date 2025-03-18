import { BrowserRouter, Routes, Route } from 'react-router'

import App from '../App'
import { DashboardPage, ProfilePage } from './dashboard'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path='dashboard' element={<DashboardPage />} />
				<Route path='dashboard/profile/:profile' element={<ProfilePage />} />
			</Routes>
		</BrowserRouter>
	)
}
