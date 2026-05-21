import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;

    async function fetchOrders() {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setOrders(data);
    }

    fetchOrders();
  }, [token]);

  return (
    <div>
      <h1>Orders</h1>

      {orders.length === 0 && <p>You have no orders yet.</p>}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.createdAt}</td>
              <td>{item.description}</td>
              <td>
                <Link to={`/orders/${item.id}`}>Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
