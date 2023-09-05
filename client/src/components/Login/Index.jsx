import toast from "react-hot-toast";
import { Input } from "../Input";
import styles from "./login.module.scss";
import { MdLogin } from "react-icons/md";
import { useState } from "react";
import { POST } from "../../services/methods";
import { useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

export default function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleIsLoginForm = (isShow) => {
    setEmail("");
    setPassword("");
    setUsername("");
    setIsLoginForm(isShow);
  };

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginForm) {
      const payload = {
        email: email,
        password: password,
      };
      const login = await POST("users/login", payload);
      if (login.data.accessToken) {
        toast.success(login.data.message);
        localStorage.setItem("accessToken", login.data.accessToken);
        navigate("/");
      } else {
        toast.error(login.data.message);
      }
    } else {
      const payload = {
        username: username,
        email: email,
        password: password,
      };
      const register = await POST("users/register", payload);
      if (register.data._id) {
        toast.success(register.data.message);
        handleIsLoginForm(true);
      } else {
        toast.error(register.data.message);
      }
    }
    setIsLoading(false);
  }

  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  function onChangeEmail(event) {
    setEmail(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2> {isLoginForm ? "Login" : "Register"}</h2>
      </header>

      <form onSubmit={onSubmit} className={styles.form}>
        {!isLoginForm && (
          <Input
            placeholder="Enter username *"
            name="username"
            required
            onChange={onChangeUsername}
            value={username}
          />
        )}
        <Input
          placeholder="Enter email *"
          name="email"
          type="email"
          required
          onChange={onChangeEmail}
          value={email}
        />

        <Input
          placeholder="Enter password *"
          name="password"
          required
          onChange={onChangePassword}
          value={password}
        />

        <button
          style={{
            border: isLoading ? "1px solid #999999" : "",
            backgroundColor: isLoading ? "#cccccc" : "",
            color: isLoading ? "#666666" : "",
          }}
          disabled={isLoading}
        >
          {isLoading && (
            <ThreeCircles
              height="20"
              width="20"
              color="#4b9d5e"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          )}

          <MdLogin size={20} />
          {isLoginForm ? "Login" : "Register"}
        </button>

        <div
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
        </div>
      </form>
    </section>
  );
}
