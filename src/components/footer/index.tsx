import { Button } from "@components/button"

export const Footer = () => {
  return <div className="flex flex-col h-screen justify-between max-h-20">
    <div className="flex-grow border-t border-gray-200"></div>
    <footer className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 gap-3">
        <li>
          <Button label={"Inicio"} onClick={() => { }} />
        </li>
        <li>
          <Button label={"Reiniciar Juego"} onClick={() => { console.log('') }} />
        </li>
        <li>
          <Button label={"Ver Diccionario"} onClick={() => { }} />
        </li>
      </ul>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <Button label={"Siguiente"} onClick={() => { }} />
        </li>
      </ul>
    </footer>
  </div>
}