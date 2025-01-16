import React, { createContext, useState } from "react";

// إنشاء السياق
export const UserContext = createContext();

// إنشاء Provider
export const UserProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null); // تخزين بيانات المستخدم

  // دالة تسجيل الدخول
  const loginCustomer = (customerData) => {
    setCustomer(customerData); // تحديث الحالة
  };

  // دالة تسجيل الخروج
  const logoutCustomer = () => {
    setCustomer(null); // مسح الحالة
  };

  return (
    <UserContext.Provider value={{ customer, loginCustomer, logoutCustomer }}>
      {children}
    </UserContext.Provider>
  );
};
