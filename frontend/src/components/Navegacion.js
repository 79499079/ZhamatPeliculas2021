import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";

export default function Navegacion() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div>        
        <Link className="navbar-brand" to="/">
          Peliculas Zhamat
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ml-auto">
          <div className="toolbar">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <img
                  src="https://res.cloudinary.com/zhamat-sistemas/image/upload/v1606326403/PeliculasZhamat/cart_loedxr.png"
                  alt="Carro Compras"
                />
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
            </li>
          </div>
        </ul>

        <ul className="navbar-nav ml-auto">
        <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            {userInfo && userInfo.isAdmin && (
              <div>
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Administrador
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/dashboard">
                    Panel
                  </Link>
                  <Link className="dropdown-item" to="/productlist">
                    Lista de Productos
                  </Link>
                  <Link className="dropdown-item" to="/orderlist">
                    Ordenes
                  </Link>
                  <Link className="dropdown-item" to="/userlist">
                    Usuarios
                  </Link>
                </div>
              </div>
            )}
          </li>

          <li className="nav-item dropdown">
            {userInfo && userInfo.isSeller && (
              <div>
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Seller
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/productlist/seller">
                    Peliculas
                  </Link>
                  <Link className="dropdown-item" to="/orderlist/seller">
                    Ordenes
                  </Link>
                </div>
              </div>
            )}
          </li>

          <li className="nav-item dropdown">
            {userInfo ? (
              <div>
                <div
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInfo.name}
                </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/profile">
                    Perfil Usuario
                  </Link>

                  <Link className="dropdown-item" to="/orderhistory">
                    Ordenes Pedidas
                  </Link>

                  <Link
                    className="dropdown-item"
                    to="/signout"
                    onClick={signoutHandler}
                  >
                    Salir
                  </Link>
                  {!userInfo.isAdmin && (
                    <Link className="dropdown-item" to="/ordenHistorial">
                      Pedidos
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              <Link className="nav-link" to="/signin">
                Iniciar Sesión
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
