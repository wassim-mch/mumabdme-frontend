import React from 'react'
import Hero from '../../Components/Hero.jsx'
import AboutSection from "../../Components/aboutsection/AboutSection.jsx";
import TrustBadges from '../../Components/TrustBadges/TrustBadges.jsx';
import InstagramReels from '../../Components/InstagramReels/InstagramReels.jsx';


const Home = () => {
   const mainVideo = "/Video/video1 (1).mp4";
  const mainTexts = ["Découvrez nos nouveautés", "Nos clients adorent", "Rejoignez-nous !"];
  const reels = [
    "/Video/video1 (1).mp4",
    "/Video/video1 (2).mp4",
    "/Video/video1 (3).mp4",
    "/Video/video1 (4).mp4",
    "/Video/video1 (5).mp4",
    "/Video/video1 (6).mp4",
    "/Video/video1 (7).mp4",
   
    
    
  ];

  return (
   <>
      <Hero />
      <AboutSection />
      <TrustBadges />
      <InstagramReels mainVideo={mainVideo} mainTexts={mainTexts} reels={reels} />
    </>
  )
}

export default Home