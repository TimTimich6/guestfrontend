import axios from "axios";
import { useState } from "react";
import cl from "./Login.module.css";
import useGuests from "./useGuests";
const Login = () => {
  const { authed, setAuthed } = useGuests();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.stopPropagation();
    e.preventDefault();
    axios
      .get(`${process.env.REACT_APP_URL || ""}/login`, { headers: { auth: input } })
      .then((res) => {
        localStorage.setItem("password", input);
        setAuthed(true);
      })
      .catch(() => {
        setAuthed(false);
        setError("Incorrect password");
        setInput("");
      });
  }
  return (
    <div className={cl.login}>
      <h1>Admin Login</h1>
      <form action="" onSubmit={(e) => submit(e)}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={(e) => submit(e)}>Submit</button>
      </form>
      {error && <h2 className={cl.error}>{error}</h2>}
    </div>
  );
};

export default Login;
