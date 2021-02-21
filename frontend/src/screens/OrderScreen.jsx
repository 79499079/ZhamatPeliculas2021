import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container">
      <h4 className="text-center underline">Orden Ref: {order._id}</h4>
      <div className="row top">

      <div className="col-sm-12 col-md-5 col-lg-5">
          <div className="card card-body">
            <ul>
            <li>
                <h4 className="text-center">Resumen de Pago</h4>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">Compra</div>
                  <div className="col text-right">
                    ${order.itemsPrecio.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">Envio</div>
                  <div className="col text-right">
                    ${order.shippingPrecio.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">IVA</div>
                  <div className="col text-right">${order.taxPrecio.toFixed(0)}</div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">Descuento</div>
                  <div className="col text-right">
                    ${order.descuento.toFixed(0)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row row-cols-2">
                  <div className="col">
                    <strong> PAGO TOTAL</strong>
                  </div>
                  <div className="col text-right">
                    <strong>${order.totalPrecio.toFixed(0)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}

                      <PayPalButton
                        amount={order.totalPrecio}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>


      <div className="col-sm-12 col-md-7 col-lg-7">
          <ul>
            <li>
              <div className="card card-body">
                <h4 className="text-center">Datos Envio</h4>
                <p>
                  <strong>Nombre:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Dirección: </strong> {order.shippingAddress.address}
                  <br/>
                  <strong>Barrio: </strong> {order.shippingAddress.barrio}
                  <br/>
                  <strong>Whatsapp: </strong>{order.shippingAddress.whatsapp}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"><i className="fa fa-shipping-fast"> {" "}No Enviado</i></MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h4 className="text-center">Método de Pago</h4>
                <p>
                  <strong>Método:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Fecha Pago {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"><i className="fa fa-hand-holding-usd"> {" "}No Pagado</i></MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h4 className="text-center">Películas Ordenadas</h4>
                <ul>
                {order.orderItems.map((item) => (
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
                          <Link className="link" to={`/product/${item.product}`}>
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
            </li>
          </ul>
        </div>   
        


      </div>
    </div>
  );
}
