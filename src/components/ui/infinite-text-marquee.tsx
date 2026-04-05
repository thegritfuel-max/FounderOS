"use client";
 
import * as React from "react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
type InfiniteTextMarqueeProps = {
  text?: string;
  link?: string;
  speed?: number;
  showTooltip?: boolean;
  tooltipText?: string;
  fontSize?: string;
  textColor?: string;
  hoverColor?: string;
};
 
export const InfiniteTextMarquee: React.FC<InfiniteTextMarqueeProps> = ({
  text = "Let's Get Started",
  link = "/signup",
  speed = 30,
  showTooltip = true,
  tooltipText = "Time to Flex💪",
  fontSize = "8rem",
  textColor = "", // optional override
  hoverColor = "", // optional override
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);
  const maxRotation = 8;
 
  useEffect(() => {
    if (!showTooltip) return;
 
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
 
      const midpoint = window.innerWidth / 2;
      const distanceFromMidpoint = Math.abs(e.clientX - midpoint);
      const rotation = (distanceFromMidpoint / midpoint) * maxRotation;
 
      setRotation(e.clientX > midpoint ? rotation : -rotation);
    };
 
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showTooltip]);
 
  const repeatedText = Array(10).fill(text).join(" - ") + " -";
 
  return (
    <>
      {showTooltip && (
        <div
          className={`following-tooltip fixed z-[99] transition-opacity duration-300 font-bold px-12 py-6 rounded-3xl text-nowrap pointer-events-none
            ${isHovered ? "opacity-100" : "opacity-0"}
            bg-[#6C3BFF] text-white border-2 border-[#111111] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
          `}
          style={{
            top: `${cursorPosition.y}px`,
            left: `${cursorPosition.x}px`,
            transform: `rotateZ(${rotation}deg) translate(-50%, -140%)`,
          }}
        >
          <p>{tooltipText}</p>
        </div>
      )}
 
      <main className="relative w-full overflow-hidden py-10">
        <motion.div
          className="whitespace-nowrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            x: [0, -1000],
            transition: {
              repeat: Infinity,
              duration: speed,
              ease: "linear",
            },
          }}
        >
          <Link to={link}>
            <span
              className={`cursor-pointer font-black tracking-tighter py-10 m-0 transition-all ${
                textColor ? "" : "text-[#111111]"
              }`}
              style={{
                fontSize,
                color: textColor || undefined,
              }}
            >
              <span className="hoverable-text">{repeatedText}</span>
              <style dangerouslySetInnerHTML={{ __html: `
                .hoverable-text:hover {
                  color: ${hoverColor || "#6C3BFF"};
                }
              ` }} />
            </span>
          </Link>
        </motion.div>
      </main>
    </>
  );
};
