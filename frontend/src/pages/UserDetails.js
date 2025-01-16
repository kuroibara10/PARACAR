import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/UserDetails.css";
import { UserContext } from "../UserContext";

const UserDetails = ({ setClients }) => {
  const { id } = useParams(); // الحصول على ID من الرابط
  const [userInfo, setUserInfo] = useState([]);
  const [photo, setPhoto] = useState(null);
  const { customer } = useContext(UserContext);
  const [ordress, setOrdress] = useState([]);

  useEffect(() => {
    // جلب معلومات المستخدم بناءً على ID
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${id}`
        );
        setUserInfo(response.data);
        setClients(userInfo);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    const fetchsetOrdress = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        const filteredOrders = response.data.filter(
          (order) => order.customerEmail == userInfo.email
        );
        setOrdress(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserInfo();
    fetchsetOrdress();
  }, [id]);

  const uploadProfileImage = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${id}/upload/users`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const updatedUser = await response.json();
      setUserInfo(updatedUser);
      alert("Profile image updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    }
  };

  // useEffect(() => {
  //   fetchsetOrdress();
  // }, []);

  // const fetchsetOrdress = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/orders");
  //     const filteredOrders = response.data.filter(
  //       (order) => order.customerEmail === userInfo.email
  //     );
  //     setOrdress(filteredOrders);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  return (
    <div className="userDet">
      <h1>Welcome Client</h1>
      {userInfo ? (
        <div className="user-info">
          <h1>Information</h1>
          <div className="informationClei">
            <div>
              <p>Name : {userInfo.username}</p>
              <p>Email: {userInfo.email}</p>
              <p>Role: {userInfo.role}</p>
            </div>
            <div className="photoClientm">
              <img
                src={`http://localhost:5000/${userInfo.photo}`}
                alt={`${userInfo.username}`}
              />
              <div>
                <form onSubmit={uploadProfileImage}>
                  <label>Upload Profile Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  <button type="submit" className="btn btn-primary">
                    Upload
                  </button>
                  {/* <div>
                {customer && (
                  <div>
                    <h1>Email : {customer.email}</h1>
                    <p>Id : {customer.id}</p>
                  </div>
                )}
              </div> */}
                </form>
              </div>
            </div>
          </div>
          <div>
            <h1>List My Orders</h1>
            <table className="product-table">
              <thead>
                <tr>
                  <th>customerEmail</th>
                  <th>products</th>
                  <th>Price</th>
                  <th>Localisation</th>
                </tr>
              </thead>
              <tbody>
                {ordress.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerEmail}</td>
                    <td>
                      <h4>List Product Order</h4>
                      {order.products.map((po) => (
                        <div>
                          <p>Product : {po.nameProduct}</p>
                          <p>Prix : {po.prix}</p>
                        </div>
                      ))}
                    </td>
                    <td>{order.totalPrix} MAD</td>
                    <td>{order.localisation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default UserDetails;
