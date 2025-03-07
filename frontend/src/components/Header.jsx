import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    return (
        <header className="bg-gray-100 dark:bg-gray-900 p-4 text-center shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">
                    Batch Email Campaign Manager
                </h1>
                <ThemeToggle />
            </div>
        </header>
    );
};

export default Header;
