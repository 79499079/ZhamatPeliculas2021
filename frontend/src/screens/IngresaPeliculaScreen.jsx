import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ingresaPelicula } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegistraUserScreen(props) {
  const [name, setName] = useState("");
  const [actores, setActores] = useState(""); 
  const [argumento, setArgumento] = useState("");
  const [genero, setGenero] = useState("");
  const [calidad, setCalidad] = useState("");
  const [idioma, setIdioma] = useState("");
  const [year, setYear] = useState("");  
  const [precio, setPrecio] = useState("");
  const [countInStock, setCantStock] = useState("");
  const [image, setImagen] = useState("");
  
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/ingresaPelicula";

  const peliculaRegister = useSelector((state) => state.peliculaRegister);
  const { pelicula, loading, error } = peliculaRegister;

 const dispatch = useDispatch();   
  const submitHandler = (e) => {    
      dispatch(ingresaPelicula(name, actores, argumento, genero, calidad, idioma, year, precio, countInStock, image));         
      props.history.push('/')
  };

  useEffect(() => {
    if (pelicula) {      
      props.history.push(redirect);      
    }
  }, [props.history, redirect, pelicula]);
  return (
    <div className="col-sm-11 col-md-6 col-lg-6 mx-auto">     
      <div className="card mb-4 text-center">
        <div className="card-header">
          <h3>
            {" "}
            <i>Ingresar Películas</i>
          </h3>
        </div>
        <div className="card-body">
          <form className="form" onSubmit={submitHandler}>
            <div className="form-group">
              <label className="form-check-label" htmlFor="name">
                Titulo
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Ingrese Título"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="actores">
                Actores
              </label>
              <input
                type="text"
                id="actores"
                className="form-control"
                placeholder="Ingrese Actores"
                required
                onChange={(e) => setActores(e.target.value)}
              />
            </div>            
            <div className="form-group">
              <label className="form-check-label" htmlFor="argumento">
                Argumento
              </label>
              <textarea
                id="argumento"
                rows = "5"
                className="form-control"
                placeholder="Ingrese Resumen Pelicula"
                required
                onChange={(e) => setArgumento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="genero">
                Género
              </label>
              <input
                type="text"
                id="genero"
                className="form-control"
                placeholder="Ingrese Resumen Pelicula"
                required
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="calidad">
                Calidad
              </label>
              <input
                type="text"
                id="calidad"
                className="form-control"
                placeholder="Ingrese Calidad Pelicula"               
                onChange={(e) => setCalidad(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="idioma">
                Idioma
              </label>
              <input
                type="text"
                id="idioma"
                className="form-control"
                placeholder="Ingrese Idioma Pelicula"
                required
                onChange={(e) => setIdioma(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="year">
                Año
              </label>
              <input
                type="number"
                id="year"
                className="form-control"
                placeholder="Ingrese Año Pelicula"
                required
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="precio">
                Precio
              </label>
              <input
                type="number"
                id="precio"
                className="form-control"
                placeholder="Ingrese Precio Pelicula"
                required
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="cantStock">
                Cantidad
              </label>
              <input
                type="number"
                id="cantStock"
                className="form-control"
                placeholder="Ingrese Cantidad Pelicula"
                required
                onChange={(e) => setCantStock(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="imagen">
                Imagen
              </label>
              <input
                type="text"
                id="imagen"
                className="form-control"
                placeholder="Ingrese Link de Imagen "
                required
                onChange={(e) => setImagen(e.target.value)}
              />
            </div>

            <button className="btn btn-primary btn-block mt-4">
              Adicionar
            </button>            
          </form>
          {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
      </div>
    </div>
  );
}
