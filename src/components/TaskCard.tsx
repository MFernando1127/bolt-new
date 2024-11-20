import React from 'react';
import { Pencil, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          <p className={`mt-2 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
            <span className="text-xs text-gray-500">
              Criado em: {new Date(task.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`p-2 rounded-full ${
            task.completed
              ? 'text-red-600 hover:bg-red-50'
              : 'text-green-600 hover:bg-green-50'
          }`}
          title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          {task.completed ? <XCircle size={20} /> : <CheckCircle size={20} />}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          title="Editar tarefa"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          title="Excluir tarefa"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}