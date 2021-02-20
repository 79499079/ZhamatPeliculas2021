import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  
  const toPrecio = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrecio = toPrecio(
    cart.cartItems.reduce((a, c) => a + c.qty * c.precio, 0)
  );
  cart.descuento =
    cart.itemsPrecio > 5000
      ? cart.cartItems.reduce(
          (a, c) => a + (c.qty * c.precio * 16.666666) / 100,
          0
        )
      : 0;
  cart.precioEnvio = cart.itemsPrecio > 100 ? toPrecio(0) : toPrecio(0);
  cart.iva = toPrecio( 0 );
  cart.totalPrecio =
    cart.itemsPrecio + cart.precioEnvio + cart.iva - cart.descuento;
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // accion borrar
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div>
       <CheckoutSteps step1></CheckoutSteps>
      <div className="row row-cols-2">
        <Link to="/">
          <div className="col m-3">
            <h4>
              <i className="fa fa-plus"> Adicionar más peliculas</i>
            </h4>
          </div>
        </Link>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-4 col-lg-4">
          <div className="card card-body">           
              <ul>
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
                      ${cart.precioEnvio.toFixed(0)}
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
              </ul>

              <button
                type="button"
                onClick={checkoutHandler}
                className="btn btn-warning btn-block mt-3"
                disabled={cartItems.length === 0}
              >
                <i src="" className="fa fa-cart-arrow-down">
                    Continuar
                </i>
              </button>
          
          </div>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8">
          {cartItems.length === 0 ? (
            <MessageBox>
              <h4>
                Carro está vacio. <Link to="/">ir a Peliculas</Link>
              </h4>
            </MessageBox>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div className="card" key={item.product}>
                  <div className="row row-cols-2">
                    <div className="col mx-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      />
                    </div>
                    <div className="col">
                      <Link
                        to={`/product/${item.product}`}                        
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="col">
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.cantStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col">${item.precio}</div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-danger btn-block mt-1"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}