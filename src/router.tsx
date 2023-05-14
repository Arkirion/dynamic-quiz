import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
} from "react-router-dom";
import { Home } from '@pages/home'
import { ErrorPage } from '@pages/error-page';
import { QuizNavigator } from '@pages/quiz-navigator';
import { QuizConfig, quizzesDefault } from "@utils/quiz-configurations"
import { Results } from "@pages/results";

/**
 * @link https://reactrouter.com/en/main/route/loader#loader
 */
const quizLoader = ({ params }: LoaderFunctionArgs): QuizConfig => {
  if (!params?.quiz) {
    return quizzesDefault['default']
  }

  return quizzesDefault[params.quiz]
}


export const getRouterJSX = () => {
  return createBrowserRouter(createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Home />}
        errorElement={<ErrorPage />
        }>
      </Route>
      <Route
        path="/quiz/:quiz"
        element={<QuizNavigator />}
        loader={(params) => quizLoader(params)}
      />
      <Route
        path="/results"
        element={<Results />}
      />
    </>
  ));
}

/** example of the other way to get build the router */
/** @deprecated */
const getRouterObject = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/:quiz",
      element: <QuizNavigator />,
    },
  ]);
}
