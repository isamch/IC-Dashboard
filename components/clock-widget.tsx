"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ClockWidget() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="backdrop-blur-md bg-gradient-to-br from-blue-700/60 to-purple-700/60 dark:from-blue-900/70 dark:to-purple-900/70 rounded-3xl p-8 border border-white/20 shadow-2xl"
    >
      <div className="text-center flex flex-col items-center">
        {/* Digital Clock */}
        <motion.div
          key={time.getSeconds()}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.1 }}
          className="text-7xl md:text-8xl font-extrabold text-white drop-shadow-lg tracking-widest mb-2 select-none"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.25)" }}
        >
          {formatTime(time)}
        </motion.div>

        {/* Date */}
        <motion.p
          className="text-lg md:text-xl text-white/70 mb-8 font-medium select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {formatDate(time)}
        </motion.p>

        {/* Analog Clock - beautiful static SVG at 10:10:30 */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Glassy background */}
            <defs>
              <radialGradient id="clock-bg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            {/* Clock face */}
            <circle cx="50" cy="50" r="45" fill="url(#clock-bg)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="13"
                x2="50"
                y2="20"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={0.7}
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
            {/* Hour hand (10) */}
            <line
              x1="50"
              y1="50"
              x2="35"
              y2="32"
              stroke="#fff"
              strokeWidth="4.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 2px 6px rgba(59,130,246,0.2))" }}
            />
            {/* Minute hand (10) */}
            <line
              x1="50"
              y1="50"
              x2="70"
              y2="25"
              stroke="#a5b4fc"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 2px 6px rgba(168,85,247,0.2))" }}
            />
            {/* Second hand (30) */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="18"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 2px 6px rgba(239,68,68,0.2))" }}
            />
            {/* Center dot */}
            <circle cx="50" cy="50" r="3.5" fill="#fff" stroke="#a5b4fc" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
