"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { WeatherWidget } from "@/components/weather-widget"
import { TodoWidget } from "@/components/todo-widget"
import { ClockWidget } from "@/components/clock-widget"
import { ProductivityChart } from "@/components/productivity-chart"
import { ThemeToggle } from "@/components/theme-toggle"
import { SlidingPanel } from "@/components/sliding-panel"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ICDashboard() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-1000">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 p-6 flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPanelOpen(true)}
            className="lg:hidden backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <motion.h1
            className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            IC Dashboard
          </motion.h1>
        </div>
        <ThemeToggle />
      </motion.header>

      <div className="relative z-10 flex">
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block w-80 p-6 space-y-6"
        >
          <WeatherWidget />
          <ProductivityChart />
        </motion.aside>

        {/* Main Dashboard */}
        <motion.main
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 p-6 space-y-6"
        >
          <div className="lg:hidden space-y-6">
            <WeatherWidget />
            <TodoWidget />
          </div>

          {/* Clock and To-Do Grid (responsive) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ClockWidget />
            <TodoWidget />
          </div>

          {/* Additional Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex flex-col justify-between h-full min-h-[18rem] backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-3xl p-8 border border-white/20 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white/90 mb-4">Tasks Completed</h3>
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-5xl font-extrabold text-white mb-2">24</p>
                <p className="text-lg text-white/70">This week</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex flex-col justify-between h-full min-h-[18rem] backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-3xl p-8 border border-white/20 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white/90 mb-4">Focus Time</h3>
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-5xl font-extrabold text-white mb-2">5.2h</p>
                <p className="text-lg text-white/70">Today</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex flex-col justify-between h-full min-h-[18rem] backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-3xl p-8 border border-white/20 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-white/90 mb-4">Streak</h3>
              <div className="flex-1 flex flex-col justify-center items-center">
                <p className="text-5xl font-extrabold text-white mb-2">12</p>
                <p className="text-lg text-white/70">Days</p>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </div>

      {/* Sliding Panel for Mobile */}
      <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  )
}
