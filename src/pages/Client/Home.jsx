import React from 'react'
import Hero from '../../Components/Hero.jsx'
import AboutSection from "../../Components/aboutsection/AboutSection.jsx";
import TrustBadges from '../../Components/TrustBadges/TrustBadges.jsx';""
import Contact from './Contact.jsx';

const Home = () => {
  return (
   <>
      <Hero />
      <AboutSection />
      <TrustBadges />
    </>
  )
}

export default Home