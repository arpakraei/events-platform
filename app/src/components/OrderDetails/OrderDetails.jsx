import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OrderDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (!token) return;

    async function fetchOrderDetails() {
      const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setOrderDetails(data);
    }

    fetchOrderDetails();
  }, [id, token]);

  return (
    <div>
      <h1>Order details</h1>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orderDetails.map((item) => (
            <tr key={item.id}>
              <td>{item.event_id}</td>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>€{item.price}</td>
              <td>€{item.amount * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
