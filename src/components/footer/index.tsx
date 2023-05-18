import { Button } from "@components/button"
import { Link, useNavigate } from "react-router-dom"
import { IconHome2, IconReload } from '@tabler/icons-react';

export const Footer = () => {
  const navigate = useNavigate()

  const resetGame = () => {
    navigate(0)
  }

  return <div className="flex flex-col h-screen justify-between max-h-20">
    <div className="flex-grow border-t border-gray-200"></div>
    <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-4">
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500">
        <li>
          <Link to={`/`}>
            <Button label={"Inicio"} icon={ <IconHome2 /> } />
          </Link>
        </li>
        <li>
          <Button label={"Reiniciar Juego"} icon={ <IconReload /> } onClick={resetGame}/>
        </li>
      </ul>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500">
      </ul>
    </footer>
  </div>
}