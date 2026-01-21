import { useEffect, useRef, useState } from "react";

const Counter = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animate();
        }
      },
      { threshold: 0.4 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const startTime = performance.now();

    const update = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div ref={containerRef}>
      <span className="text-5xl font-extrabold text-white drop-shadow-lg">
        {count}+
      </span>
    </div>
  );
};

export default Counter;
