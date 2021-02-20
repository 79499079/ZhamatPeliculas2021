import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);
  const userAddressMap = useSelector((state) => state.userAddressMap);
  const { address: addressMap } = userAddressMap;

  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [barrio, setBarrio] = useState(shippingAddress.barrio);
  const [whatsapp, setWhatsapp] = useState(shippingAddress.whatsapp);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    if (!newLat || !newLng) {
      moveOn = window.confirm(
        "¿No estableciste tu ubicación en el Mapa. Deseas Continuar?"
      );
    }
    if (moveOn) {
      dispatch(
        saveShippingAddress({
          fullName,
          address,
          barrio,
          whatsapp,
          lat: newLat,
          lng: newLng,
        })
      );
      props.history.push("/payment");
    }
  };
  const chooseOnMap = () => {
    dispatch(
      saveShippingAddress({
        fullName,
        address,
        barrio,
        whatsapp,
        lat,
        lng,
      })
    );
    props.history.push("/map");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="col-sm-12 col-md-8 col-lg-6 mx-auto mt-4">
        <div className="card card-body">
          <form className="form" onSubmit={submitHandler}>
            <div>              
              <h3 className="text-center">Dirección Envio</h3>
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="fullName">
                Nombre Completo**
              </label>
              <input
                className="form-control"
                type="text"
                id="fullName"
                placeholder="Ingrese el Nombre Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="address">
                Dirección Completa**
              </label>
              <input
                className="form-control"
                type="text"
                id="address"
                placeholder="Ingrese la Dirección Completa"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="barrio">
                Barrio**
              </label>
              <input
                className="form-control"
                type="text"
                id="barrio"
                placeholder="Ingrese el Barrio"
                value={barrio}
                onChange={(e) => setBarrio(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="whatsapp">
                Whatsapp
              </label>
              <input
                className="form-control"
                type="text"
                id="whatsapp"
                placeholder="Ingrese el Whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}               
              ></input>
            </div>
            <div className="form-group">
              <label className="form-check-label" htmlFor="chooseOnMap">
                Location
              </label>
              <button
                className="btn btn-warning btn-block"
                type="button"
                onClick={chooseOnMap}
              >
                Localizar en Mapa
              </button>
            </div>

            <button className="btn btn-primary btn-block mt-4" type="submit">
              Continuar
            </button>
            <small>** Son datos Obligatorios</small>
          </form>
        </div>
      </div>
    </div>
  );
}
