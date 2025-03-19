import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './routes'
import { ProfilesProvider } from '@/contexts/ProfilesContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ProfilesProvider>
			<Router />
		</ProfilesProvider>
	</React.StrictMode>
)
