import React, { useState } from 'react';
import { ListTodo, Plus } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import { Task } from './types';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setShowForm(false);
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (!editingTask) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === editingTask.id
          ? { ...task, ...taskData }
          : task
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ListTodo size={32} className="text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Gerenciador de Tarefas</h1>
          </div>
          {!showForm && !editingTask && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Adicionar Tarefa
            </button>
          )}
        </header>

        {(showForm || editingTask) && (
          <div className="mb-8">
            <TaskForm
              onSubmit={editingTask ? handleEditTask : handleAddTask}
              onClose={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              initialData={editingTask || undefined}
              isEdit={!!editingTask}
            />
          </div>
        )}

        <div className="grid gap-6">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma tarefa ainda. Adicione sua primeira tarefa!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}