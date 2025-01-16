import React, { useEffect } from "react";
import "../styles/Collection.css";

import background1 from "./assets/images/collection-1.jpg";
import background2 from "./assets/images/collection-2.jpg";
import background3 from "./assets/images/collection-3.jpg";

const Collection = () => {
  // تأثير الكشف عند التمرير
  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const scrollReveal = () => {
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight / 2) {
          section.classList.add("active");
        }
      });
    };

    // تشغيل الكشف مباشرة عند التحميل
    scrollReveal();

    // إضافة مستمع للتمرير
    window.addEventListener("scroll", scrollReveal);

    // إزالة المستمع عند إزالة المكون
    return () => window.removeEventListener("scroll", scrollReveal);
  }, []);

  // تأثير عند المرور بالماوس
  const hoverScroll = (e) => {
    const element = e.target;
    element.style.transform = "scale(1.05)";
    element.style.transition = "transform 0.3s ease-in-out";
  };

  // إرجاع التأثير إلى حالته الأصلية
  const hoverOut = (e) => {
    const element = e.target;
    element.style.transform = "scale(1)";
  };

  // البيانات الخاصة بالعناصر
  const collectionData = [
    {
      title: "Summer Collection",
      text: "Starting at 165.99 MAD",
      button: "Shop Now",
      background: background1,
    },
    {
      title: "What’s New?",
      text: "Get the glow",
      button: "Discover Now",
      background: background2,
    },
    {
      title: "Buy 1 Get 1",
      text: "Starting at 55.99 MAD",
      button: "Discover Now",
      background: background3,
    },
  ];

  return (
    <section className="collection" data-section>
      {collectionData.map((item, index) => (
        <div
          key={index}
          className="item"
          style={{
            backgroundImage: `url(${item.background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseOver={hoverScroll}
          onMouseOut={hoverOut}
        >
          <h2>{item.title}</h2>
          <p>{item.text}</p>
          <a href="#" className="btn_link">
            {item.button}
          </a>
        </div>
      ))}
    </section>
  );
};

export default Collection;
