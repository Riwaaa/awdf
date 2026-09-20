import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTask, deleteTask, getTasks, updateTask } from "../services/api";

export default function Project() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);

      if (err.status === 401) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      loadTasks();
    }
  }, [loggedIn]);

  async function addTask(event) {
    event.preventDefault();
    setError("");

    try {
      const task = await createTask({ title, description, priority });
      setTasks((previous) => [task, ...previous]);
      setTitle("");
      setDescription("");
      setPriority("medium");
    } catch (err) {
      setError(err.message);
      if (err.status === 401) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
    }
  }

  async function toggleTask(task) {
    setError("");

    try {
      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks((previous) =>
        previous.map((item) => (item._id === updated._id ? updated : item)),
      );
    } catch (err) {
      setError(err.message);
      if (err.status === 401) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
    }
  }

  async function removeTask(id) {
    if (!window.confirm("Delete this task?")) return;

    setError("");

    try {
      await deleteTask(id);
      setTasks((previous) => previous.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message);
      if (err.status === 401) {
        localStorage.removeItem("token");
        setLoggedIn(false);
      }
    }
  }

  // The Task Manager page is NOT the Login page.
  // It simply asks the user to authenticate before using protected API routes.
  if (!loggedIn) {
    return (
      <section className="projects-section task-manager-gate">
        <span className="section-label">PRACTICAL 5 - 7</span>
        <h2 className="section-title">Task Manager</h2>

        <div className="login-gate-card">
          <span className="project-number">AUTHENTICATION REQUIRED</span>
          <h3>Login to use the Task Manager</h3>
          <p>
            Your tasks are stored in MongoDB and the task API is protected with
            JWT authentication. Login first, then you can create, update,
            complete and delete your tasks.
          </p>

          <div className="gate-actions">
            <Link className="primary-link" to="/login">
              Login →
            </Link>
            <button
              className="secondary-link"
              type="button"
              onClick={() => navigate("/login?mode=register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <span className="section-label">PRACTICAL 5 - 7</span>
      <h2 className="section-title">Task Manager</h2>

      <form className="task-form" onSubmit={addTask}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          required
        />

        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      {loading && <p className="loading-message">Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks yet. Add your first task above.</p>
      )}

      <div className="projects-grid">
        {tasks.map((task) => (
          <article className="project-card" key={task._id}>
            <div>
              <span className="project-number">
                {task.priority.toUpperCase()} PRIORITY
              </span>

              <h3 className={task.completed ? "done" : ""}>
                {task.title}
              </h3>

              <p>{task.description || "No description"}</p>
            </div>

            <span className="project-tech">
              {task.completed ? "Completed" : "Pending"}
            </span>

            <div className="task-actions">
              <button type="button" onClick={() => toggleTask(task)}>
                {task.completed ? "Mark Pending" : "Mark Complete"}
              </button>

              <button type="button" onClick={() => removeTask(task._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
