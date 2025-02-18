import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginRegister from './Components/Authentication/Form/login';
import Admin from './Components/AdminPanel/Admin';
import StudentDashboard from './Components/StudentPanel/studentPanel';


function PageContent() {
    const location = useLocation();

    const getPageClass = () => {
        if (location.pathname === '/login') return 'login-register';
        if (location.pathname === '/admin') return 'admin-page';
        return '';
    };

    return (
        <div className={`App ${getPageClass()}`}>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/student/dashboard/" element={<StudentDashboard />} />
                <Route path="admin/student/dashboard/" element={<StudentDashboard />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <PageContent />
        </Router>
    );
}

export default App;
