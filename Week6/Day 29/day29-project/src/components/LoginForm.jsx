import { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(e) {

        e.preventDefault();

        if (email === "") {
            alert("Please Enter Email !");
            return;
        }

        if (password === "") {
            alert("Please Enter Password !");
            return;
        }

        if (password.length < 6) {
            alert("Password must be 6 characters");
            return;
        }

        onLogin();

    }

    return (

        <div className="login">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Login</button>

            </form>

        </div>

    );

}

export default LoginForm;