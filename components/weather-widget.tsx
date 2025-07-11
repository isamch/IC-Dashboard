"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Cloud, Sun, CloudRain, Wind, Droplets, Search } from "lucide-react"

// Helper function to choose icon based on weather description
function getWeatherIcon(condition: string) {
  const cond = condition.toLowerCase()
  if (cond.includes("sun")) return <Sun className="h-12 w-12 text-yellow-400" />
  if (cond.includes("cloud")) return <Cloud className="h-12 w-12 text-gray-400" />
  if (cond.includes("rain")) return <CloudRain className="h-12 w-12 text-blue-400" />
  return <Sun className="h-12 w-12 text-yellow-400" />
}

// Static list of many Moroccan cities for suggestions
const CITY_SUGGESTIONS = [
  "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir", "Oujda", "Kenitra", "Tetouan", "Safi", "Mohammedia", "Khouribga", "El Jadida", "Beni Mellal", "Nador", "Taza", "Settat", "Larache", "Ksar El Kebir", "Khemisset", "Guelmim", "Berrechid", "Taourirt", "Berkane", "Ouarzazate", "Al Hoceima", "Errachidia", "Tiznit", "Essaouira", "Taroudant", "Tiflet", "Sidi Slimane", "Sidi Kacem", "Témara", "Ouazzane", "Dakhla", "Azrou", "Midelt", "Sefrou", "Youssoufia", "Guercif", "Fnideq", "Martil", "Ait Melloul", "Ait Ourir", "Ait Baha", "Ait Attab", "Ait Bouayach", "Ait Daoud", "Ait Faska", "Ait Hadi", "Ait Ikkou", "Ait Ishaq", "Ait Majden", "Ait Melloul", "Ait Sedrate Jbel El Oulia", "Ait Sedrate Sahl El Gharbia", "Ait Sedrate Sahl El Oulia", "Ait Yaazem", "Akhfenir", "Akhfennir", "Akhourb", "Aklim", "Aknoul", "Alaouite", "Alnif", "Amalou Ighriben", "Amizmiz", "Anza", "Arbaoua", "Arfoud", "Asilah", "Azemmour", "Azilal", "Azrou", "Bab Berred", "Bab Taza", "Ben Guerir", "Ben Taieb", "Beni Ansar", "Beni Bouayach", "Beni Drar", "Beni Mellal", "Benslimane", "Berkane", "Bouarfa", "Boujdour", "Boulemane", "Bouznika", "Chefchaouen", "Chichaoua", "Demnate", "Drarga", "El Aioun Sidi Mellouk", "El Hajeb", "El Jadida", "El Kelaa des Sraghna", "El Ksiba", "Erfoud", "Errachidia", "Essaouira", "Figuig", "Fkih Ben Salah", "Fnideq", "Fquih Ben Salah", "Guelmim", "Guercif", "Ifrane", "Imzouren", "Inzegane", "Jerada", "Kariat Arekmane", "Karia Ba Mohamed", "Kelaat Sraghna", "Khemisset", "Khenifra", "Khouribga", "Ksar El Kebir", "Ksar es Souk", "Laayoune", "Larache", "M'diq", "Martil", "Meknes", "Midelt", "Mohammedia", "Moulay Bousselham", "Nador", "Ouarzazate", "Oued Zem", "Oujda", "Oulad Teima", "Oulad Tayeb", "Oulad Yaich", "Rabat", "Safi", "Salé", "Sefrou", "Settat", "Sidi Bennour", "Sidi Ifni", "Sidi Kacem", "Sidi Slimane", "Skhirat", "Souk El Arbaa", "Tafraout", "Taghazout", "Taliouine", "Tan-Tan", "Taounate", "Taourirt", "Tarfaya", "Taroudant", "Taza", "Temara", "Tiflet", "Tinghir", "Tiznit", "Youssoufia"
];

export function WeatherWidget() {
  // State for weather data, loading, error, and city input
  const [weather, setWeather] = useState<null | {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    location: string
  }>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [city, setCity] = useState("") // For input value
  const [searchCity, setSearchCity] = useState("") // For actual search
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch weather data for a city or current location
  async function fetchWeather(cityName?: string) {
    setLoading(true)
    setError("")
    try {
      // Build the API URL
      let url = "https://wttr.in/?format=j1"
      if (cityName && cityName.trim() !== "") {
        url = `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch weather data.")
      const data = await res.json()
      const current = data.current_condition[0]
      const area = data.nearest_area && data.nearest_area[0]
      setWeather({
        temp: parseFloat(current.temp_C),
        condition: current.weatherDesc[0].value,
        humidity: parseInt(current.humidity),
        windSpeed: parseFloat(current.windspeedKmph),
        location: area ? area.areaName[0].value : cityName || "Your Location",
      })
    } catch (err: any) {
      setError("Could not load weather data.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch weather on mount and when searchCity changes
  useEffect(() => {
    fetchWeather(searchCity)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCity])

  // Handle form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setShowSuggestions(false)
    setSearchCity(city.trim())
    if (inputRef.current) inputRef.current.blur()
  }

  // Handle input change and filter suggestions
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setCity(value)
    if (value.trim() === "") {
      setFilteredSuggestions([])
      setShowSuggestions(false)
      return
    }
    const filtered = CITY_SUGGESTIONS.filter((c: string) =>
      c.toLowerCase().startsWith(value.toLowerCase())
    )
    setFilteredSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  // Handle suggestion click
  function handleSuggestionClick(suggestion: string) {
    setCity(suggestion)
    setSearchCity(suggestion)
    setShowSuggestions(false)
    if (inputRef.current) inputRef.current.blur()
  }

  // Hide suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-3xl p-6 border border-white/20 shadow-xl"
    >
      {/* Search form with icon inside input */}
      <form onSubmit={handleSubmit} className="relative mb-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(filteredSuggestions.length > 0)}
          className="w-full rounded-lg px-4 py-2 pr-10 bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 border border-white/30"
          style={{ boxSizing: "border-box" }}
        />
        {/* Search icon inside input */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white hover:text-purple-300 focus:outline-none"
          tabIndex={-1}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
        {/* Dropdown suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 mt-1 bg-white/90 text-gray-800 rounded-lg shadow-lg z-20 max-h-40 overflow-y-auto">
            {filteredSuggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="px-4 py-2 cursor-pointer hover:bg-purple-100"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white/90">Weather</h2>
        <motion.div
          animate={{ rotate: weather && weather.condition.toLowerCase().includes("sun") ? 360 : 0 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {weather ? getWeatherIcon(weather.condition) : <Sun className="h-12 w-12 text-yellow-400" />}
        </motion.div>
      </div>

      {/* Loading and error states */}
      {loading ? (
        <div className="text-white/80 py-8 text-center">Loading weather...</div>
      ) : error ? (
        <div className="text-red-300 py-8 text-center">{error}</div>
      ) : weather ? (
        <div className="space-y-4">
          <div>
            <motion.p
              key={weather.temp}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-white"
            >
              {Math.round(weather.temp)}°C
            </motion.p>
            <p className="text-white/70 capitalize">{weather.condition}</p>
            <p className="text-sm text-white/60">{weather.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm text-white/70">Humidity</p>
                <p className="text-white font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm text-white/70">Wind</p>
                <p className="text-white font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}
