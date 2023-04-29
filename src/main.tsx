
import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Home } from '@pages/home'
import { ErrorPage } from '@pages/error-page';
import { QuizNavigator } from '@pages/quiz-navigator';
import Header from '@components/header';
import { Footer } from '@components/footer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/quiz",
    element: <QuizNavigator />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <body className='flex flex-col h-screen'>
      <Header />
      <main className='flex-grow'>
        <RouterProvider router={router} />
      </main>
      <Footer />
    </body>
  </React.StrictMode>,
)
