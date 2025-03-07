import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Senders from './pages/Senders';
import Templates from './pages/Templates';
import Contacts from './pages/Contacts';

function App() {
    return (
        <Router>
            <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="ml-64 w-full">
                    {/* Header */}
                    <Header />

                    {/* Page Content */}
                    <div className="p-6">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/campaigns" element={<Campaigns />} />
                            <Route path="/senders" element={<Senders />} />
                            <Route path="/templates" element={<Templates />} />
                            <Route path="/contacts" element={<Contacts />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
