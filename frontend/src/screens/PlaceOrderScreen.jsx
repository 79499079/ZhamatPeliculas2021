import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrecio = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrecio = toPrecio(
    cart.cartItems.reduce((a, c) => a + c.qty * c.precio, 0)
  );
  cart.shippingPrecio = cart.itemsPrecio > 100 ? toPrecio(0) : toPrecio(0);
  cart.taxPrecio = toPrecio(0 * cart.itemsPrecio);
  cart.iva = toPrecio(0 * cart.itemsPrecio);
  cart.descuento =
    cart.itemsPrecio > 5000
      ? cart.cartItems.reduce(
          (a, c) => a + (c.qty * c.precio * 16.666666) / 100,
          0
        )
      : 0;
  cart.totalPrecio =
    cart.itemsPrecio +
    cart.shippingPrecio +
    cart.taxPrecio +
    cart.iva -
    cart.descuento;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <div className="card card-body">
            <ul>
              <li>
                <h4 className="text-center">Resumen de Pago</h4>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">Compra</div>
                  <div className="col text-right">
                    ${cart.itemsPrecio.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">Envio</div>
                  <div className="col text-right">
                    ${cart.shippingPrecio.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">IVA</div>
                  <div className="col text-right">${cart.iva.toFixed(0)}</div>
                </div>
              </li>

              <li>
                <div className="row row-cols-2">
                  <div className="col">Descuento</div>
                  <div className="col text-right">
                    ${cart.descuento.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">
                    <strong> TOTAL</strong>
                  </div>
                  <div className="col text-right">
                    <strong>${cart.totalPrecio.toFixed(0)}</strong>
                  </div>
                </div>
              </li>
              <button
                type="button"
                onClick={placeOrderHandler}
                className="btn btn-warning btn-block mt-3"
                disabled={cart.cartItems.length === 0}
              >
                <i src="" className="fa fa-cart-arrow-down">
                  Realizar Pedido
                </i>
              </button>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>

        <div className="col-sm-12 col-md-8 col-lg-8">
          <ul>
            <li>
              <div className="card card-body">
                <h4 className="text-center">Envio</h4>
                <p>
                  <strong>Nombre:</strong> {cart.shippingAddress.fullName}{" "}
                  <br />
                  <strong>Dirección: </strong> {cart.shippingAddress.address}
                  <br />
                  <strong>Barrio: </strong> {cart.shippingAddress.barrio}
                  <br />
                  <strong>Whatsapp: </strong>
                  {cart.shippingAddress.whatsapp}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4 className="text-center">Pago</h4>
                <p>
                  <strong>Método:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card">
                <div className="card-title">
                  <div>
                    <h4 className="text-center">Películas Solicitadas</h4>
                  </div>
                  <div className="container">
                    <div className="row row-cols-2 mt-2">
                      <div className="col ml-4">
                        <Link to="/">
                          <i className="fa fa-plus">
                            {" "}
                            <h5>Adicionar</h5>
                          </i>
                        </Link>
                      </div>
                      <div className="col text-right mr-4">
                        <Link to="/cart">
                          <i className="fa fa-exchange-alt">
                            {" "}
                            <h5>Modificar</h5>
                          </i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.product}>
                        <div className="row row-cols-3">
                          <div className="col">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="small"
                            ></img>
                          </div>
                          <div className="col">
                            <Link
                              className="link"
                              to={`/product/${item.product}`}
                            >
                              {item.name}
                            </Link>
                          </div>

                          <div className="col">
                            {item.qty} x ${item.precio} = $
                            {item.qty * item.precio}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
