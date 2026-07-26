import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Order.module.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    async function fetchOrders() {
      try {
        const response = await fetch(`${API_URL}/api/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);
  if (loading) return <p className={styles.loading}>Loading orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders</h1>

      {orders.length === 0 && <p>You have no orders yet.</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Id</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {orders.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.id}</td>
              <td className={styles.td}>{item.createdAt}</td>
              <td className={styles.td}>{item.description}</td>
              <td>
                <Link to={`/orders/${item.id}`} className={styles.detailsLink}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
