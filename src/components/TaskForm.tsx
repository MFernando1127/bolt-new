import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { Task } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onClose?: () => void;
  initialData?: Task;
  isEdit?: boolean;
}

export default function TaskForm({ onSubmit, onClose, initialData, isEdit }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(initialData?.priority || 'medium');

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      completed: initialData?.completed || false,
    });
    if (!isEdit) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEdit ? 'Editar Tarefa' : 'Nova Tarefa'}
        </h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Prioridade</label>
        <div className="flex gap-4">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <label key={p} className="flex items-center">
              <input
                type="radio"
                name="priority"
                value={p}
                checked={priority === p}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="mr-2"
              />
              <span>{priorityLabels[p]}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        <PlusCircle size={20} />
        {isEdit ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </button>
    </form>
  );
}