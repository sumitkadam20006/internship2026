import { useState } from "react";
import "./SignupForm.css";

function SignupForm() {

    const [form, setForm] = useState({

        name: "",
        email: "",
        password: "",
        confirmPassword: ""

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    return (

        <div className="form-box">

            <h2>Signup Form</h2>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
            />

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
            />

            <pre>

                {JSON.stringify(form, null, 2)}

            </pre>

        </div>

    );

}

export default SignupForm;