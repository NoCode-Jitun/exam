import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
import "./Admin.css";

const BACKEND_API_URL = 'https://augmentatech.in/api';

const Exam = () => {
    const [formData, setFormData] = useState({
        school_id: '',
        name: '',
        start_time: '',
        end_time: '',
        questions: [{ id: '', marks: '' }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const newQuestions = [...formData.questions];
        newQuestions[index][name] = value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const addQuestionField = () => {
        setFormData({
            ...formData,
            questions: [...formData.questions, { id: '', marks: '' }],
        });
    };

    const removeQuestionField = (index) => {
        const newQuestions = formData.questions.filter((_, i) => i !== index);
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // token
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Authentication error: Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_API_URL}/exams/create`, 
                formData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            alert('Exam created successfully!');
            console.log(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert("Session expired. Please log in again.");
                
            } else {
                alert('Failed to create exam. Please check the fields.');
            }
            console.error(error);
        }
      };
    }

const Admin = () => {
  const [activePage, setActivePage] = useState("My Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    "My Dashboard",
    "My Inbox",
    "Contact Support",
    "Create Exams",
    "Exam Reports",
    "Upload Materials",
    "Live Exams",
    "Live Reports",
    "Question Bookmarks",
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch(activePage) {
      case "My Dashboard":
        return (
          <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>EXAMS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>30</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>COURSES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>STUDENTS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>330</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
            <footer>
              <Link to={'./student/dashboard'}><h3>Go To Student Panel</h3></Link>
            </footer>
        </div>
        </main>
        );
      
      case "My Inbox":
        return (
          <div className="content-card">
            <h3>📨 My Messages</h3>
            <div className="message-list">
              <div className="message-item new">
                <div className="message-header">
                  <span className="sender">System Admin</span>
                  <span className="date">Today</span>
                </div>
                <div className="message-preview">Exam schedule updated for Mathematics...</div>
              </div>
              <div className="message-item">
                <div className="message-header">
                  <span className="sender">Dr. Smith</span>
                  <span className="date">2 days ago</span>
                </div>
                <div className="message-preview">Your physics paper evaluation is ready...</div>
              </div>
            </div>
          </div>
        );

      case "Contact Support":
        return (
          <div className="content-card">
            <h3>📩 Contact Administration</h3>
            <form className="contact-form">
              <select>
                <option>Select Department</option>
                <option>Examinations</option>
                <option>Technical Support</option>
                <option>Account Services</option>
              </select>
              <textarea placeholder="Enter your message..." rows="5"></textarea>
              <button className="primary-btn">Send Message</button>
            </form>
          </div>
        );

      case "My Exams":
        return (
          <div className="create-exam-container">
            <h1>Create Exam</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>School ID</label>
                    <input
                        type="number"
                        name="school_id"
                        value={formData.school_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Exam Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Start Time</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>End Time</label>
                    <input
                        type="datetime-local"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="questions-section">
                    <h3>Questions</h3>
                    {formData.questions.map((question, index) => (
                        <div key={index} className="question-group">
                            <div className="form-group">
                                <label>Question ID</label>
                                <input
                                    type="number"
                                    name="id"
                                    value={question.id}
                                    onChange={(e) => handleQuestionChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Marks</label>
                                <input
                                    type="number"
                                    name="marks"
                                    value={question.marks}
                                    onChange={(e) => handleQuestionChange(index, e)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="remove-question-btn"
                                onClick={() => removeQuestionField(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="add-question-btn"
                        onClick={addQuestionField}
                    >
                        Add Question
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Create Exam
                </button>
            </form>
        </div>
        );

      case "Exam Reports":
        return (
          <div className="content-card">
            <h3>📊 Exam Performance</h3>
            <div className="report-grid">
              <div className="report-card">
                <h4>Mathematics</h4>
                <div className="score">87%</div>
                <div className="attempts">3 Attempts</div>
              </div>
              <div className="report-card">
                <h4>Physics</h4>
                <div className="score">92%</div>
                <div className="attempts">2 Attempts</div>
              </div>
            </div>
          </div>
        );

      // Add similar cases for other menu items

      default:
        return <div className="content-card">Select a menu item to view content</div>;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="logo">Access<span>MyExams</span></div>
        </div>
        <div className="top-bar">
          <div className="student-info">
            ST0065 | <strong>Kishore</strong>
          </div>
          <Link to="/" className="logout-btn">
            <FaTimes /> Logout
          </Link>
        </div>
      </header>

      <div className="dashboard-content">
        <aside className={`student-menu ${sidebarOpen ? 'active' : ''}`}>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <h3 className="menu-title">📋 Student Portal</h3>
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li
                key={item}
                className={activePage === item ? 'active' : ''}
                onClick={() => {
                  setActivePage(item);
                  toggleSidebar();
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;