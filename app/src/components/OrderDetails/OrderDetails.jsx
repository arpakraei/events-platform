import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./OrderDetails.module.css";
import { Link } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    async function fetchOrderDetails() {
      try {
        const response = await fetch(`http://localhost:3001/api/orders/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderDetails();
  }, [id, token]);
  if (loading) return <p className={styles.loading}>Loading orders...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Order details</h1>
        <Link to="/orders" className={styles.backLink}>
          ← Back to orders
        </Link>
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Event ID</th>
            <th className={styles.th}>Event Name</th>
            <th className={styles.th}>Quantity</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Total</th>
          </tr>
        </thead>

        <tbody>
          {orderDetails.map((item) => (
            <tr key={item.id}>
              <td className={styles.td}>{item.event_id}</td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.amount}</td>
              <td className={styles.td}>€{item.price}</td>
              <td className={styles.td}>€{item.amount * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total</span>
        <span className={styles.totalPrice}>
          €
          {orderDetails.reduce(
            (sum, item) => sum + item.amount * item.price,
            0,
          )}
        </span>
      </div>
    </div>
  );
}
