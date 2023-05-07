import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunctionArgs,
  Route,
} from "react-router-dom";
import { Home } from '@pages/home'
import { ErrorPage } from '@pages/error-page';
import { QuizNavigator } from '@pages/quiz-navigator';
import { hiragana } from "@utils/questions"
import { QuizDeck, QuizType } from "@interfaces/";

/**
 * @link https://reactrouter.com/en/main/route/loader#loader
 */
const quizLoader = ({ params }: LoaderFunctionArgs): QuizDeck[] => {
  const quizzes: QuizType = {
    'hiragana': hiragana
  }
  if (!params?.quiz) {
    return quizzes['hiragana']
  }

  return quizzes[params.quiz]
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
    </>
  ));
}

/** example of the other way to get build the router */
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
