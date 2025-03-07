import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiUsers, FiMail, FiSend } from 'react-icons/fi';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', path: '/', icon: <FiGrid /> },
        { name: 'Contacts', path: '/contacts', icon: <FiUsers /> },
        { name: 'Templates', path: '/templates', icon: <FiMail /> },
        { name: 'Campaigns', path: '/campaigns', icon: <FiSend /> }
    ];

    return (
        <div className="fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-900 shadow-md transition-all">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6 p-4">Email Manager</h2>
            <ul className="space-y-2">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-2 rounded transition 
                                ${location.pathname === item.path
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
