import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./studentPanel.css";

const StudentDashboard = () => {
  const [activePage, setActivePage] = useState("My Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    "My Dashboard",
    "My Inbox",
    "Contact Admin",
    "My Exams",
    "Exam Reports",
    "Study Materials",
    "Live Exams",
    "Live Reports",
    "Question Bookmarks",
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch(activePage) {
      case "My Dashboard":
        return (
          <div className="profile-card">
            <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/7981/7981269.png" alt="Profile" />
            <h2>Kishore <span className="student-id">(ST0065)</span></h2>
            <div className="stats">
              <div className="stat wallet">💰 0 Wallet Amount</div>
              <div className="stat inbox">📩 6 New Messages</div>
              <div className="stat exams">📑 28 Upcoming Exams</div>
            </div>
            
            <button className="primary-btn">+ Access New Exams</button>
          </div>
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

      case "Contact Admin":
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
          <div className="content-card">
            <h3>📝 Create New Exam</h3>
            <form className="exam-form">
              <input type="text" placeholder="Exam Name" />
              <input type="text" placeholder="Subject" />
              <input type="text" placeholder="Class/Grade" />
              <input type="datetime-local" />
              <div className="form-actions">
                <button className="primary-btn">Schedule Exam</button>
                <button className="secondary-btn">Save Draft</button>
              </div>
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

export default StudentDashboard;