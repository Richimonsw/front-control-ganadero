import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { CuidadorList } from "./components/Cuidador/CuidadorList";
import { CuidadorForm } from "./components/Cuidador/CuidadorForm";
import { CuidadorCard } from "./components/Cuidador/CuidadorCard";
import { AnimalForm } from "./components/Animal/AnimalForm";
import { AnimalList } from "./components/Animal/AnimalList";
import { AnimalCard } from "./components/Animal/AnimalCard";
import { ChequeoList } from "./components/Chequeo/ChequeoList";


const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">        
        <Link to={"/"}  className="navbar-brand">
          Control-Ganadero
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/cuidador"} className="nav-link">
              Cuidadores
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/animal"} className="nav-link">
              Animales
            </Link>
          </li>        
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />  
          <Route path="/cuidador" element={<CuidadorList/>} /> 
          <Route path="/animal" element={<AnimalList idCuidador={0}/>} /> 
          <Route path="/cuidador/create" element={<CuidadorForm/>} />
          <Route path="/cuidador/retrieve/:id" element={<CuidadorCard/>} />
          <Route path="/cuidador/update/:id" element={<CuidadorForm/>} />
          <Route path="/cuidador/:idCuidador/animal/create" element={<AnimalForm/>} />
          <Route path="/cuidador/:idCuidador/animal/retrieve/:id" element={<AnimalCard/>} />
          <Route path="/cuidador/:idCuidador/animal/update/:id" element={<AnimalForm/>} />
          <Route path="/cuidador/:idCuidador/animal/retrieve/:id/chequeo/list" element={<ChequeoList idAnimal={1}/>} />
        </Routes>
      </div>
    </div>
  );
}
export default App;