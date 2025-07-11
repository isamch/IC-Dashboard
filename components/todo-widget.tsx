"use client"

import { useState, useEffect } from "react"
import { Plus, Check, X, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoWidget() {
  // Load todos from localStorage or use default static tasks
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("todos")
      if (saved) return JSON.parse(saved)
    }
    return [
      { id: 1, text: "Review project proposal", completed: false },
      { id: 2, text: "Update portfolio website", completed: true },
      { id: 3, text: "Call client about meeting", completed: false },
    ]
  })
  const [newTodo, setNewTodo] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo("")
      setIsAdding(false)
    }
  }

  // Toggle completion
  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-3xl p-6 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white/90">To-Do List</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAdding(!isAdding)}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {isAdding && (
        <div className="mb-4">
          <div className="flex space-x-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add new task..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              onKeyPress={(e) => e.key === "Enter" && addTodo()}
            />
            <Button onClick={addTodo} size="icon" className="bg-white/20 hover:bg-white/30 text-white">
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <button onClick={() => toggleTodo(todo.id)} className="text-white/70 hover:text-white transition-colors">
              {todo.completed ? (
                <span className="text-green-400">
                  <Check className="h-4 w-4" />
                </span>
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </button>
            <span className={`flex-1 text-sm ${todo.completed ? "text-white/50 line-through" : "text-white/90"}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-white/50 hover:text-red-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-sm text-white/70">
          {todos.filter((t) => !t.completed).length} of {todos.length} tasks remaining
        </p>
      </div>
    </div>
  )
}
