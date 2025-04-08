import { useEffect, useRef } from "react";
import lottie from "lottie-web";

export default function RocketScrollAnimation() {
  const containerRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    // Load the animation
    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/rocket-launch.json", // or import your JSON directly
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / docHeight;

      const totalFrames = animRef.current.getDuration(true);
      const frame = scrollProgress * (totalFrames - 1);

      animRef.current.goToAndStop(frame, true);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animRef.current?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh", // or any height you want
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    ></div>
  );
}
