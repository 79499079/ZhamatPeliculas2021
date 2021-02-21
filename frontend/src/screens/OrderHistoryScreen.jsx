import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h4 className="text-center">HISTORIAL DE ORDENES</h4>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="container">
          <div className="mx-auto mt-4">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">FECHA</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">METODO PAGO</th>
                  <th scope="col">PAGADO</th>
                  <th scope="col">ENTREGADO</th>
                  <th scope="col">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <th scope="row">{order._id}</th>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrecio.toFixed(0)}</td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/**<table className="table table-responsive">
            <thead>
              <tr>
                <th className="text-center">ID</th>
                <th className="text-center">FECHA</th>
                <th className="text-center">TOTAL</th>
                <th className="text-center">PAGADO</th>
                <th className="text-center">ENTREGADO</th>
                <th className="text-center">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-center">{order._id}</td>
                  <td className="text-center">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="text-center">
                    ${order.totalPrecio.toFixed(0)}
                  </td>
                  <td className="text-center">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td className="text-center">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */
