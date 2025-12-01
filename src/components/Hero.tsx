import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate blur amount based on scroll (0 to 5px blur for subtle effect)
  const blurAmount = Math.min(scrollY / 150, 5);
  // Calculate opacity for fade effect
  const opacity = Math.max(1 - scrollY / 800, 0);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Fixed with dynamic blur */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="/images/myimage2.png"
          alt="Hero background"
          className="w-full h-full object-cover"
          style={{ filter: `blur(${blurAmount}px)` }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content - Fixed with dynamic blur and fade */}
      <div
        className="fixed inset-0 z-10 flex items-center justify-center text-center px-6"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: opacity,
        }}
      >
        <div>
          <div className="mb-8 inline-block">
            <svg
              width="128"
              height="128"
              viewBox="0 0 96 96"
              fill="none"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))",
              }}
            >
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="1" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect
                x="8"
                y="8"
                width="80"
                height="80"
                rx="16"
                fill="url(#grad)"
              />
              <circle cx="48" cy="48" r="30" fill="white" opacity="0.15" />
            </svg>
          </div>
          <h1 className="text-white mb-4">Creative Portfolio</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Crafting beautiful digital experiences through innovative design and
            development
          </p>
        </div>
      </div>
    </section>
  );
}
