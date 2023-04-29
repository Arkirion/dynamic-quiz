import { Button } from "@components/button"
import { Link } from "react-router-dom";

export const Home = () => {
  return <div>
    <Link to={`/quiz`}><Button label="Hiragana" /></Link>
    
  </div>
}
