import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear individual field error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="col-md-6">

        <input
          className="form-control my-2"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <div className="text-danger mb-2">{errors.name}</div>}

        <input
          className="form-control my-2"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <div className="text-danger mb-2">{errors.email}</div>}

        <input
          className="form-control my-2"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <div className="text-danger mb-2">{errors.password}</div>}

        <button className="btn btn-primary mt-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
