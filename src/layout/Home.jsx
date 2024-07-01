import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SmoothScroll from "../components/SmoothScroll/SmoothScroll";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const Home = () => {
  const comp = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3", "#title-4"], {
          opacity: 0,
          y: "+=30",
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3", "#title-4"], {
          opacity: 0,
          y: "-=30",
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        });
    }, comp);

    return () => ctx.revert();
  }, []);
  return (
    <div className="relative" ref={comp}>
      <div
        id="intro-slider"
        className="h-screen overflow-hidden p-4 sm:p-10 bg-gradient-to-r from-[#020617] to-[#14BFDB]  text-white absolute top-0 left-0 z-40 w-full flex flex-col"
      >
        <h1
          className="xl:text-[150px] lg:text-8xl md:text-7xl sm:text-6xl text-4xl mt-10 font-bold mb-4 text-gray-300 title"
          id="title-1"
        >
          Welcome to
        </h1>
        <span
          id="title-2"
          className="xl:text-[180px] font-bold lg:text-9xl text-5xl myText2"
        >
          Survey Genius
        </span>
        <h1
          className="md:text-8xl text-4xl sm:text-7xl title my-6 text-gray-400"
          id="title-3"
        >
          Develop by
        </h1>
        <h1
          className="sm:text-9xl text-6xl title  myText font-bold"
          id="title-4"
        >
          Abdullah Al Tarek
        </h1>
      </div>
      <div>
        <div id="welcome">
          <Navbar />
          <SmoothScroll>
            <Outlet />
          </SmoothScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
