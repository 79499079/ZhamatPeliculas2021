import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="m-4">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
              <Link to="/">
                <button className="btn btn-primary btn-block mt-3 ">
                  <i className="fa fa-arrow-left"> Volver</i>
                </button>
              </Link>
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row justify-content-between">
                      <div>Precio</div>
                      <div className="price">${product.precio}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row justify-content-between">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="okStock">Con Existencia</span>
                        ) : (
                          <span className="errorStock">No hay Existencia</span>
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      <div>Seller</div>
                      <div>
                        <h2>
                          <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                          </Link>
                        </h2>
                        <Rating
                          rating={product.seller.seller.rating}
                          numReviews={product.seller.seller.numReviews}
                        ></Rating>
                      </div>
                    </div>
                    <div className="row justify-content-between">
                      {product.countInStock > 0 && (
                        <>
                          <div>Cantidad</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div>
                            <button
                              onClick={addToCartHandler}
                              className="primary block"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-5">
              <div className="card card-body">
                <ul>
                  <li>
                    <h1 className="text-center">{product.name}</h1>
                  </li>
                  <li className="text-center">
                    <Rating
                      rating={product.rating}
                      numCriticas={product.numReviews}
                    ></Rating>
                  </li>
                  <li>
                    Argumento:
                    <p className="text-justify">{product.argumento}</p>
                  </li>
                </ul>
              </div>

              <div className="card card-body">
                <ul>
                  <li>
                    <h3 className="text-center">Críticas</h3>
                  </li>
                  <li>
                    {product.reviews.length === 0 && (
                      <MessageBox>No hay críticas</MessageBox>
                    )}
                  </li>
                  <li>
                    {product.reviews.map((review) => (
                      <li key={review._id}>
                        <div className="row justify-content-between">
                          <strong>{review.name}</strong> {" "}
                          <Rating rating={review.rating} caption=" "></Rating>
                          <p>{review.createdAt.substring(0, 10)}</p>
                        </div>                        
                          <p>{review.comment}</p>
                      </li>
                    ))}
                  </li>
                </ul>
              </div>

              <div className="card card-body">
                <ul>
                  <li>
                    {userInfo ? (
                      <form className="form" onSubmit={submitHandler}>
                        <div>
                          <h3 className="text-center">Escribe tu crítica</h3>
                        </div>
                        <div>
                          <label htmlFor="rating">Rating</label>
                          <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very good</option>
                            <option value="5">5- Excelent</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="comment">Comment</label>
                          <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div>
                          <label />
                          <button className="primary" type="submit">
                            Submit
                          </button>
                        </div>
                        <div>
                          {loadingReviewCreate && <LoadingBox></LoadingBox>}
                          {errorReviewCreate && (
                            <MessageBox variant="danger">
                              {errorReviewCreate}
                            </MessageBox>
                          )}
                        </div>
                      </form>
                    ) : (
                      <MessageBox>
                        Inicie <Link to="/signin">Sesión</Link> para escibir
                        críticas
                      </MessageBox>
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <img
                id="imglista"
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
