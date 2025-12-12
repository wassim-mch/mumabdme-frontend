// src/components/InstagramReels.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./InstagramReels.css";

const InstagramReels = ({ reels }) => {
  return (
    <div className="container my-5 reels-wrapper">

      {/* 🎀 Bande avant les Reels */}
      <div className="reels-header mb-4">
        <h2 className="reels-title">Découvrez nos derniers Reels</h2>
        <div className="reels-line"></div>
        <p className="reels-subtitle">
          Inspirations • Moments forts • Coulisses de notre activité
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation
        centeredSlides={false}
        slidesPerView={1.3}
        breakpoints={{
          576: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          992: { slidesPerView: 4 },
        }}
      >
        {reels.map((video, i) => (
          <SwiperSlide key={i}>
            <div className="reel-card">
              <video
                src={video}
                className="reel-video"
                muted
                loop
                playsInline
                autoPlay
              ></video>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default InstagramReels;
