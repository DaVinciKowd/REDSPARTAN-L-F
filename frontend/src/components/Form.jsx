import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock } from "react-icons/fi";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // new state
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg([]);

        if (!username || !password || (method !== "login" && (!email || !confirmPassword))) {
            setErrorMsg(["Please fill out the required fields"]);
            return;
        }

        if (method !== "login" && password !== confirmPassword) {
            setErrorMsg(["Passwords do not match"]);
            return;
        }

        setLoading(true);

        try {
            const payload =
                method === "login"
                    ? { username, password }
                    : { username, email, password };

            const res = await api.post(route, payload);

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                localStorage.setItem("username", username);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            const data = error.response?.data;

            if (error.response?.status === 400 && data) {
                const messages = Object.values(data).flat();
                setErrorMsg(messages);
            } else if (error.response?.status === 401) {
                setErrorMsg(["User does not exist or incorrect password"]);
            } else {
                setErrorMsg(["An unexpected error occurred. Please try again."]);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">{name}</h2>

            <div className="input-group">
                <label>Username</label>
                <div className="input-with-icon">
                    <FiUser className="input-icon" />
                    <input
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                </div>
            </div>

            {method !== "login" && (
                <>
                    <div className="input-group">
                        <label>Email</label>
                        <div className="input-with-icon">
                            <FiMail className="input-icon" />
                            <input
                                className="form-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    </div>
                </>
            )}

            <div className="input-group">
                <label>Password</label>
                <div className="input-with-icon password-field">
                    <FiLock className="input-icon" />
                    <input
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <FiEye /> : <FiEyeOff />}
                    </button>
                </div>
            </div>

            {method !== "login" && (
                <div className="input-group">
                    <label>Confirm Password</label>
                    <div className="input-with-icon password-field">
                        <FiLock className="input-icon" />
                        <input
                            className="form-input"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <FiEye /> : <FiEyeOff />}
                        </button>
                    </div>
                </div>
            )}

            {errorMsg.length > 0 && (
                <div className="form-error">
                    {errorMsg.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </div>
            )}

            {loading && <LoadingIndicator />}

            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form;
