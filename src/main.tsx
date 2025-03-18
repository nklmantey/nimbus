import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Router } from './routes'
import { ContextProvider } from './contexts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ContextProvider>
			<Router />
		</ContextProvider>
	</React.StrictMode>
)
