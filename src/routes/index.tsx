import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthLayout } from '@/layouts'

import App from '../App'
import { LoginPage } from './auth'

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />

				<Route element={<AuthLayout />}>
					<Route path='/login' element={<LoginPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
