import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "userone@gmail.com",
    password: "userone",
    role: "student",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={submitHandler} style={styles.form}>
          <h1 style={styles.heading}>Login</h1>

          <div style={styles.inputGroup}>
            <Label style={styles.label}>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <Label style={styles.label}>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          {/* Role Selection */}
          <div style={styles.roleSelectionContainer}>
            <div
              onClick={() => setInput({ ...input, role: "student" })}
              style={{
                ...styles.roleBox,
                ...(input.role === "student" ? styles.selectedRole : {}),
              }}
            >
              Student
            </div>
            <div
              onClick={() => setInput({ ...input, role: "recruiter" })}
              style={{
                ...styles.roleBox,
                ...(input.role === "recruiter" ? styles.selectedRole : {}),
              }}
            >
              Recruiter
            </div>
          </div>

          {loading ? (
            <Button style={styles.button}>
              <Loader2 style={styles.loader} /> Please wait
            </Button>
          ) : (
            <Button type="submit" style={styles.button}>
              Login
            </Button>
          )}

          <span style={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.signupLink}>
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "70px",
    minHeight: "80vh",
  },
  form: {
    width: "40%",
    borderRadius: "12px",
    padding: "30px",
    background: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    border: "2px solid #e1a800",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#e1a800",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #bbb",
    backgroundColor: "#fff8d6",
    outline: "none",
  },
  roleSelectionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  },
  roleBox: {
    width: "140px",
    padding: "14px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "2px solid #bbb",
    backgroundColor: "#fff",
    color: "#555",
    transition: "all 0.3s ease-in-out",
  },
  selectedRole: {
    backgroundColor: "#e1a800",
    color: "#fff",
    border: "2px solid #e1a800",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#e1a800",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
    textAlign: "center",
  },
  loader: {
    marginRight: "8px",
    height: "18px",
    width: "18px",
    animation: "spin 1s linear infinite",
  },
  signupText: {
    fontSize: "14px",
    textAlign: "center",
    display: "block",
    marginTop: "12px",
    color: "#444",
  },
  signupLink: {
    color: "#d87c00",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
