import { useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.newPassword.trim()) newErrors.newPassword = "New password is required";
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
    if (form.newPassword !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const res = await API.post("/auth/reset-password", {
        token,
        newPassword: form.newPassword
      });
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="col-md-6">

        <input
          className="form-control my-2"
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && <div className="text-danger mb-2">{errors.newPassword}</div>}

        <input
          className="form-control my-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <div className="text-danger mb-2">{errors.confirmPassword}</div>}

        <button className="btn btn-success mt-2">Update Password</button>
      </form>
    </div>
  );
}
