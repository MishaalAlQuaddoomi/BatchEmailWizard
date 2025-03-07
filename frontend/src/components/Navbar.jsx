import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white w-64 h-screen fixed left-0 top-0 p-4">
            <ul className="space-y-4">
                <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/campaigns" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Campaigns
                    </Link>
                </li>
                <li>
                    <Link to="/senders" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Senders
                    </Link>
                </li>
                <li>
                    <Link to="/templates" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Templates
                    </Link>
                </li>
                <li>
                    <Link to="/contacts" className="block px-4 py-2 hover:bg-gray-700 rounded">
                        Contacts
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
