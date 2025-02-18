import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { FaUser, FaLock, FaArtstation } from "react-icons/fa";
import { MdEmail, MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_API_URL = "https://augmentatech.in/api";

const LoginRegister = () => {
    const [active, setActive] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', role: '' });
    const navigate = useNavigate();

    const handleRegistrationLink = () => setActive(true);
    const handleLoginLink = () => setActive(false);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_API_URL}/auth/login`, loginData);
            if (response.status === 200 && response.data.user?.email) {
                toast.success('Login successful! Redirecting...', { autoClose: 1000 });
                localStorage.setItem('authToken', response.data.token);
                const userRole = response.data.user.role;
                navigate(userRole === 'admin' ? '/admin' : '/student');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            toast.error('Login failed');
            console.error(error);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/auth/register`, registerData);
            toast.success('Registration successful!');
            setActive(false);
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div className="container">
            <div className={`wrapper ${active ? 'active' : ''}`}>
                <div className="forms-container">
                    <div className="form-box login">
                        <form onSubmit={handleLoginSubmit}>
                            <div className="companyName">
                                <FaArtstation className="companyLogo" />
                                AccessMy<span>Exam</span>
                            </div>
                            <h1>Sign In</h1>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                                <MdEmail className="icon" />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                                <FaLock className="icon" />
                            </div>
                            <div className="rememberForgot">
                                <label>
                                    <input type="checkbox" />
                                    Remember Me
                                </label>
                                <a href="#">Forgot Password?</a>
                            </div>
                            <button type="submit">Login</button>
                            
                        </form>
                    </div>

                    <div className="form-box register">
                        <form onSubmit={handleRegisterSubmit}>
                        <div className="companyName">
                                <FaArtstation className="companyLogo" />
                                AccessMy<span>Exam</span>
                            </div>
                            <h1>Sign Up</h1>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={registerData.username}
                                    onChange={handleRegisterChange}
                                    required
                                />
                                <FaUser className="icon" />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="text"
                                    name="role"
                                    placeholder="Role"
                                    value={registerData.role}
                                    onChange={handleRegisterChange}
                                    required
                                />
                                <MdAdminPanelSettings className="icon" />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                                <MdEmail className="icon" />
                            </div>
                            <div className="inputBox">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                                <FaLock className="icon" />
                            </div>
                            <button type="submit">Register</button>
                            
                        </form>
                    </div>
                </div>

                <div className="messages-container">
                    <div className="message message1">
                        <div className="hello">Don't Have An Account?</div>
                        <div className="bar"></div>
                        <div className="submsg">
                            Enjoy the benefits of our Exam System Software, Hurry Up! Register Below
                        </div>
                        <div className="msgButton">
                            <button onClick={handleRegistrationLink}>Sign Up</button>
                        </div>
                    </div>
                    
                    <div className="message message2">
                        <div className="hello">Already Registered?</div>
                        <div className="bar"></div>
                        <div className="submsg">
                            Login Now & Access thousands of exams and sharpen your skills!
                        </div>
                        <div className="msgButton">
                            <button onClick={handleLoginLink}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;