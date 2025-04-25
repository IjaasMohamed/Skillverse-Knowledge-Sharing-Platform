import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddStudentComponent from './components/AddStudentComponent';
import FooterComponents from './components/FooterComponents';
import HeaderComponent from './components/HeaderComponent';
import Home from './components/Home';
import ListEmployeeComponents from './components/ListEmployeeComponents';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/students" element={<ListEmployeeComponents />} />
                        <Route path="/add-student" element={<AddStudentComponent />} />
                        <Route path="/edit-student/:id" element={<AddStudentComponent />} />
                    </Routes>
                </div>
                {/* <FooterComponents /> */}
            </Router>
        </div>
    );
}

export default App;