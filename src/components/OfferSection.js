import React, { useEffect, useState } from "react";
import "../styles/OfferSection.css";
import ban1 from "./assets/images/offer-banner-1.jpg";
import ban2 from "./assets/images/offer-banner-2.jpg";

const OfferSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdownDuration = 15 * 24 * 60 * 60; // 15 days in seconds
    let endTime = localStorage.getItem("countdownEndTime");

    if (!endTime) {
      endTime = Date.now() + countdownDuration * 1000; // Calculate end time in milliseconds
      localStorage.setItem("countdownEndTime", endTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const remainingTime = Math.floor((endTime - now) / 1000); // Calculate remaining time in seconds

      if (remainingTime <= 0) {
        clearInterval(interval);
        localStorage.removeItem("countdownEndTime");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(remainingTime / (24 * 60 * 60));
      const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
      const seconds = remainingTime % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="section offer"
      id="offer"
      aria-label="offer"
      data-section
    >
      <div className="containerrs">
        <figure className="offer-banner">
          <img
            src={ban1}
            width="250"
            height="380"
            loading="lazy"
            alt="offer products"
            className="w-100"
          />

          <img
            src={ban2}
            width="350"
            height="525"
            loading="lazy"
            alt="offer products"
            className="w-100"
          />
        </figure>

        <div className="offer-content">
          <p className="offer-subtitle">
            <span className="span">Special Offer</span>
            <span className="badge" aria-label="20% off">
              -20%
            </span>
          </p>

          <h2 className="h2-large section-title">Mountain Pine Bath Oil</h2>

          <p className="section-text">
            Made using clean, non-toxic ingredients, our products are designed
            for everyone.
          </p>

          <div className="countdown">
            <span className="time days" aria-label="days">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            :
            <span className="time hours" aria-label="hours">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            :
            <span className="time minutes" aria-label="minutes">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            :
            <span className="time seconds" aria-label="seconds">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          <a href="#" className="btn btn-primary">
            Get Only $39.00
          </a>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
