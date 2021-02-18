import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div className="col-sm-12 col-md-4 col-lg-3" key={product._id}>
      <div className="card gris">
        <div className="card-header">
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
        </div>
      </div>
    </div>
  );
}
