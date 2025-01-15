import React, { useState, useEffect } from 'react';
import apiClient from '../apiClient';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const response = await apiClient.get('/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    await apiClient.post('/tasks', { title, description });
    fetchTasks();
    setTitle('');
    setDescription('');
  };

  const deleteTask = async (id) => {
    await apiClient.delete(`/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task1</button>
      </div>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Tasks;
