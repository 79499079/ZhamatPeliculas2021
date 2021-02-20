import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Domicilio");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (

    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
          <div className="card mt-4">
            <div className="card-header text-center">
              <h3>Metodo de Pago</h3>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={submitHandler}>
                <div className="text-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="tarjeta"
                      value="Tarjeta Crédito/Débito"
                      name="metodoPago"                           
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label className="form-check-label" htmlFor="epayco">
                      Tarjeta Crédito/Débito
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="domicilio"
                      value="Domicilio"
                      name="metodoPago"
                      required
                      checked
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label className="form-check-label" htmlFor="contraentrega">
                      en Domicilio
                    </label>
                  </div>
                </div>
                <div>
                  <label />
                  <button className="btn btn-primary btn-block" type="submit">
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>    
  );
}