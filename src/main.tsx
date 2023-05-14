import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { getRouterJSX } from 'router.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <body className='flex flex-col h-screen'>
    <RouterProvider router={getRouterJSX()} />
  </body>
)
