import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link, Route, useParams } from "react-router-dom";
import SearchBox from "../components/SearchBox";

export default function HomeScreen(props) {
  const dispatch = useDispatch();

  const { pageNumber = 1 } = useParams();

  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const productLista = useSelector((state) => state.productLista);
  const { loading, error, products, page, pages } = productLista;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;  

  useEffect(() => {
    dispatch(listProducts({}));    
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [dispatch, sellerMode, pageNumber, userInfo._id,]);
  return (
    <div>
     <div className="offset-md-4 p-2">
        <Route
          render={({ history }) => <SearchBox history={history}></SearchBox>}
        ></Route>
      </div>      
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Existen Peliculas</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>

          <div className="text-center pagina">
          {products.length === 0 && <MessageBox>No Existen Peliculas</MessageBox>}
          Páginas {" "}
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlista/pageNumber/${x + 1}`}
              >               
                <span className="badge">
                  <h5 className="blanco">{x + 1}</h5>
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}