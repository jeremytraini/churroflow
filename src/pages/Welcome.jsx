import React, { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Header } from "../components/Header";
import { Features } from "../components/Feature";
import { About } from "../components/About";
import { Services } from "../components/Service";
import Plan from "../components/Plan";
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";
import "../App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Welcome = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Plan />
    </div>
  );
};

export default Welcome;