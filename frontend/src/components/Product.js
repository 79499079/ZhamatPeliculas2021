import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div className="col-sm-12 col-md-6 col-lg-3" key={product._id}>
      <div className="card">
        <div className="card-header text-center">
          <h6 className="card-title text-center">{product.name}</h6>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </div>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <img
              className="img-fluid"
              src={product.image}
              alt={product.name}
              id="imglista"
            />
          </Link>
          <div className="descripcion p-4">
            <p>Calidad: {product.calidad}</p>
            <p>Idioma: {product.idioma}</p>
            <p>Año: {product.year}</p>
            <textarea rows="6" cols="19" className="texto" defaultValue={product.argumento}/>              
          </div>
        </div>
      </div>
    </div>
  );
}
