import React from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./UserDetails";

function UserPage() {
  const { id } = useParams(); // الحصول على معرف المستخدم من URL
  return <UserDetails userId={id} />;
}

export default UserPage;
