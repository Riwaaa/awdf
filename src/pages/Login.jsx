import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/api";

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [mode, setMode] = useState(
    params.get("mode") === "register" ? "register" : "login",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(params.get("mode") === "register" ? "register" : "login");
  }, [location.search]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "register") {
        await registerUser({ email, password });
        setMessage("Registration successful. Please log in.");
        setMode("login");
        setPassword("");
      } else {
        const data = await loginUser({ email, password });
        localStorage.setItem("token", data.token);
        navigate("/task-manager", { replace: true });
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-section">
      <span className="section-label">PRACTICAL 7</span>

      <h2 className="section-title">
        {mode === "login" ? "Login" : "Create Account"}
      </h2>

      <p className="auth-description">
        {mode === "login"
          ? "Login to access your protected Task Manager."
          : "Create an account to start using the Task Manager."}
      </p>

      <form className="task-form auth-form" onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Register"}
        </button>
      </form>

      {message && <p className="status-message">{message}</p>}

      <button
        className="text-button"
        type="button"
        onClick={() => {
          setMode(mode === "login" ? "register" : "login");
          setMessage("");
        }}
      >
        {mode === "login"
          ? "New user? Create an account"
          : "Already registered? Login"}
      </button>
    </section>
  );
}
