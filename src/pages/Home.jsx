// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeBanner from "../components/Home_Components/HomeBanner";
import Gatherings from "../components/Home_Components/Gatherings";
import CustomConveyor from "../components/Home_Components/CustomConveyor";
import ModulerSolution from "../components/Home_Components/ModulerSolution";
import ShowCase from "../components/Home_Components/ShowCase";
import IndustryCom from "../components/Home_Components/IndustryCom";
import ContactForm from "../components/contactUsForm/ContactForm";
import ClientFeedback from "../components/Home_Components/ClientFeedback";
import Resources from "../components/Home_Components/Resources";

// Assets
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import Seo from "../components/common/Seo";
import { CustomHeading } from "../components/common/CustomHeading";
import TechVivantaLogo from "../assets/images/Techvivantalogo.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fast animation variants (≤0.8s)
const fastContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const quickFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const quickScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
      duration: 0.4,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Partners data
const partners = [
  { id: 3, name: "l1", image: l1, width: 117 },
  { id: 4, name: "l2", image: l2, width: 110 },
  { id: 5, name: "l3", image: l3, width: 100 },
  { id: 6, name: "l4", image: l4, width: 200 },
  { id: 7, name: "l5", image: l5, width: 87 },
  { id: 8, name: "l6", image: l6, width: 200 },
];

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  // Individual Lenis setup for this page
  // useEffect(() => {
  //   // Initialize Lenis with fast settings for 0.8s animations
  //   const lenis = new Lenis({
  //     lerp: 0.15,             // Fast interpolation
  //     duration: 0.8,          // Max 0.8s duration
  //     easing: (t) => 1 - Math.pow(1 - t, 3), // Fast ease-out cubic
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     mouseMultiplier: 1.2,   // Quick mouse response
  //     smoothTouch: false,     // Disable on mobile for performance
  //     touchMultiplier: 2.5,   // Quick touch response
  //     infinite: false,
  //     autoResize: true,
  //   });

  //   // Manual RAF loop for smooth scrolling
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   // GSAP ScrollTrigger integration
  //   lenis.on('scroll', ScrollTrigger.update);

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   // Optional: Add scroll-triggered animations
  //   gsap.fromTo(".fade-in-section",
  //     {
  //       opacity: 0,
  //       y: 30,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5, // Fast 0.5s animation
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".fade-in-section",
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       }
  //     }
  //   );

  //   // Cleanup function
  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);
  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToIndustries");
    if (shouldScroll === "true") {
      const section = document.getElementById("industries-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      localStorage.removeItem("scrollToIndustries");
    }
  }, []);

  const whatsappRef = useRef(null);

  useEffect(() => {
    const forceWhatsAppPosition = () => {
      if (whatsappRef.current) {
        const element = whatsappRef.current;
        element.style.setProperty("transform", "none", "important");
        element.style.setProperty("transform-origin", "initial", "important");
      }
    };

    // Force positioning immediately
    forceWhatsAppPosition();

    // Force positioning on scroll and resize
    const handleScroll = () => forceWhatsAppPosition();
    const handleResize = () => forceWhatsAppPosition();

    // Force positioning periodically
    const interval = setInterval(forceWhatsAppPosition, 500);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearInterval(interval);
    };
  }, []);

  const handleBannerAnimationComplete = () => {
    setShowNavbar(true);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <div>
      <Seo
        title="ATC Chain India"
        description="ATC Chains India manufactures modular belts, chains and conveyor components for food, packaging and automation industries with reliable custom solutions.
"
        url="https://www.atcchain.com/"
      />
      <HomeBanner onAnimationComplete={handleBannerAnimationComplete} />

      {/* Animated Components with fast timing */}
      <motion.div
        variants={fastContainerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section  2xl:px-10"
        >
          <Gatherings />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section ">
          <ModulerSolution />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section ">
          <CustomConveyor />
        </motion.div>

        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section overflow-hidden"
        >
          <ShowCase />
        </motion.div>

        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section"
          id="industries-section"
        >
          <IndustryCom />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section">
          <ClientFeedback />
        </motion.div>
      </motion.div>

      {/* Partners Section with fast animations */}
      <motion.div
        className="our-client-section fade-in-section py-15"
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 px-14 mx-auto container"
          >
            <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-start">
              <span className="text-[#2E437C]">
                <CustomHeading title="Our" className="" />
              </span>
              <span className="text-[#BABEC8]">
                <CustomHeading title="Clients" className="" />
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="flex">
              {[1, 2].map((set) => (
                <motion.div
                  key={set}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-shrink-0 items-center  "
                >
                  {partners.map((partner) => (
                    <motion.div
                      key={`${set}-${partner.id}`}
                      className="flex-shrink-0 mx-15 px-0 md:px-5"
                      whileHover={{
                        scale: 1.05,

                        transition: { duration: 0.1 },
                      }}
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-12 sm:h-16 lg:h-20 object-contain transition-all duration-150"
                        style={{ maxWidth: `${partner.width}px` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={quickFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="fade-in-section"
      >
        <Resources />
      </motion.div>

      {/* Contact Form with quick animation */}
      <motion.div
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="fade-in-section  container mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20   "
      >
        <ContactForm />
      </motion.div>

      {/* Map Section with fast animation */}
      {/* <motion.section
        className=" w-full pt-10 bg-white fade-in-section overflow-hidden"
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden shadow-lg"
         
        >
          <iframe
            title="ATC CHAINS INDIA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.604152548122!2d72.580103!3d23.03987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1726752975123!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </motion.section> */}
      <section ref={whatsappRef} className="w-full pt-10 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden shadow-lg"
        >
          <iframe
            title="ATC CHAINS INDIA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.604152548122!2d72.580103!3d23.03987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1726752975123!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>
      <section className="py-20 bg-black overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT SIDE: Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* 1. The Badge - Green Dot Accent */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2AA952] shadow-[0_0_8px_#2AA952]"></span>
                <span className="text-[11px] font-bold tracking-widest text-gray-300 uppercase">
                  Strategic Development Partner
                </span>
              </div>

              {/* 2. The Heading - Green Brand Highlight */}
              <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-6 text-white">
                Designed & Developed by 
                <span className="text-[#2AA952]"> Techvivanta</span>
              </h2>

              {/* 3. The Paragraph */}
              <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl hidden md:block">
                We proudly partnered with{" "}
                <span onClick={() => window.open('https://www.techvivanta.com/', '_blank')} className="font-bold text-white border-b-2 border-[#2AA952]/30 pb-0.5">
                  Techvivanta
                </span>{" "}
                to build our complete digital ecosystem. They designed our
                website, developed the custom Admin Panel, and engineered the
                secure APIs that power this platform.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {/* Feature 1: Design */}
                <div className="group">
                  <h4 className="font-bold text-gray-200 text-sm mb-1 group-hover:text-[#2AA952] transition-colors">
                    Design
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    User-Centric UI/UX
                  </p>
                </div>

                {/* Feature 2: Develop */}
                <div className="group">
                  <h4 className="font-bold text-gray-200 text-sm mb-1 group-hover:text-[#2AA952] transition-colors">
                    Develop
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    Robust Architecture
                  </p>
                </div>

                {/* Feature 3: Scale */}
                <div className="group">
                  <h4 className="font-bold text-gray-200 text-sm mb-1 group-hover:text-[#2AA952] transition-colors">
                    Scale
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                    High Performance
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: The Logo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Green Glow Effect Behind Card */}
              <div className="absolute inset-0 bg-[#2AA952] rounded-[2.5rem] blur-2xl opacity-10"></div>

              {/* The Card Container */}
              <div className="relative bg-[#0A0A0A] rounded-[1.5rem] p-1 md:p-2 flex items-center justify-center border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <img
                    src={TechVivantaLogo}
                    alt="Techvivanta"
                    className=" w-auto object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
