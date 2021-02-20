import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>
        <p className="step">Sesión</p>
      </div>
      <div className={props.step2 ? "active" : ""}>
        <p className="step">Datos Envio </p>
      </div>
      <div className={props.step3 ? "active" : ""}>
        <p className="step">Pago</p>
      </div>
      <div className={props.step4 ? "active" : ""}>
        <p className="step">Orden</p>
      </div>
    </div>
  );
}
