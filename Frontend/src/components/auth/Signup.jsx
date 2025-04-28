import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <form onSubmit={submitHandler} style={styles.form}>
                    <h1 style={styles.heading}>Register</h1>
                    
                    <div style={styles.inputGroup}>
                        <Label style={styles.label}>Full Name</Label>
                        <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter your name" style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <Label style={styles.label}>Email</Label>
                        <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter your email" style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <Label style={styles.label}>Phone Number</Label>
                        <Input type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Enter your phone number" style={styles.input} />
                    </div>

                    <div style={styles.inputGroup}>
                        <Label style={styles.label}>Password</Label>
                        <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter your password" style={styles.input} />
                    </div>

                    <div style={styles.roleContainer}>
                        <Label style={styles.roleLabel}>Role</Label>
                        <div style={styles.roleOptions}>
                            <button type="button" 
                                style={input.role === 'student' ? styles.roleSelected : styles.roleButton}
                                onClick={() => setInput({ ...input, role: 'student' })}
                            >
                                Student
                            </button>
                            <button type="button" 
                                style={input.role === 'recruiter' ? styles.roleSelected : styles.roleButton}
                                onClick={() => setInput({ ...input, role: 'recruiter' })}
                            >
                                Recruiter
                            </button>
                        </div>
                    </div>

                    
                    <div style={styles.inputGroup}>
                        <Label style={styles.label}>Profile Picture</Label>
                        <input type="file" accept="image/*" onChange={changeFileHandler} style={styles.fileInput} />
                    </div>

                    {loading ? 
                        <Button style={styles.button}><Loader2 style={styles.loader} /> Please wait</Button> 
                        : 
                        <Button type="submit" style={styles.button}>Signup</Button>
                    }
                    
                    <span style={styles.signupText}>Already have an account? <Link to="/login" style={styles.signupLink}>Login</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Signup;

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '70px',
        minHeight: '80vh',
    },
    form: {
        width: '40%',
        borderRadius: '12px',
        padding: '30px',
        background: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        border: '2px solid #e1a800',
    },
    heading: {
        fontSize: '26px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#e1a800',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#444',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '6px',
        border: '1px solid #bbb',
        backgroundColor: '#fff8d6',
        outline: 'none',
    },
    fileInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #bbb',
        borderRadius: '6px',
        backgroundColor: '#fff8d6',
        cursor: 'pointer',
    },
    roleContainer: {
        marginBottom: '15px',
    },
    roleLabel: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
        display: 'block',
    },
    roleOptions: {
        display: 'flex',
        gap: '15px',
    },
    roleButton: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: '2px solid #bbb',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: '#f4f4f4',
        transition: '0.3s',
    },
    roleSelected: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        border: '2px solid #e1a800',
        backgroundColor: '#e1a800',
        color: '#fff',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    button: {
        width: '100%',
        padding: '14px',
        background: '#e1a800',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        transition: '0.3s',
    },
};
