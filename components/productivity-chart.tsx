"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts"

const data = [
  { day: "Mon", hours: 6.5, color: "#8b5cf6" },
  { day: "Tue", hours: 7.2, color: "#a855f7" },
  { day: "Wed", hours: 5.8, color: "#c084fc" },
  { day: "Thu", hours: 8.1, color: "#d8b4fe" },
  { day: "Fri", hours: 6.9, color: "#e9d5ff" },
  { day: "Sat", hours: 4.2, color: "#f3e8ff" },
  { day: "Sun", hours: 3.5, color: "#faf5ff" },
]

export function ProductivityChart() {
  const total = data.reduce((sum, item) => sum + item.hours, 0)
  const avg = total / data.length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.01, y: -3 }}
      className="backdrop-blur-md bg-gradient-to-br from-indigo-700/60 to-purple-700/60 dark:from-indigo-900/70 dark:to-purple-900/70 rounded-3xl p-6 border border-white/20 shadow-2xl"
      aria-label="Weekly Productivity Chart"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-1">Weekly Productivity</h2>
        <p className="text-sm text-white/70">Hours focused this week</p>
      </div>

      <div className="h-56 w-full flex items-end">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.85)", fontSize: 14, fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              width={28}
            />
            <Tooltip
              contentStyle={{ background: "#222", borderRadius: 12, color: "#fff", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              cursor={{ fill: "rgba(139,92,246,0.08)" }}
            />
            <Bar dataKey="hours" radius={[10, 10, 0, 0]} fill="url(#gradient)">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex justify-between items-center">
          <span className="text-base text-white/80">Total this week</span>
          <span className="text-2xl font-extrabold text-white drop-shadow-lg">{total.toFixed(1)}h</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-base text-white/80">Daily average</span>
          <span className="text-xl font-bold text-white drop-shadow">{avg.toFixed(1)}h</span>
        </div>
      </div>
    </motion.div>
  )
}
