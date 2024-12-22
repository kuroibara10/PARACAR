import React from "react";
import "../styles/Home.css";
import Hero from "../components/Hero";
import Collection from "../components/Collection";
import Shop from "../components/Shop";
import Under from "../components/Under";
import About from "../components/About";
import Discover from "../components/Discover";
import OfferSection from "../components/OfferSection";

function Home({ products }) {
  return (
    <div>
      <Hero />
      <Collection />
      {/* <Collection2 /> */}
      <Shop />
      <Under products={products} />
      <OfferSection />
      <About />
      <Discover />
    </div>
  );
}
export default Home;
