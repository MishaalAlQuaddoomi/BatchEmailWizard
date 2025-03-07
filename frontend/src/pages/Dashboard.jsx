import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6 ml-64">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Overview of your campaigns, senders, and contacts.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Active Campaigns</h2>
                    <p className="text-2xl font-bold text-blue-500">12</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Total Contacts</h2>
                    <p className="text-2xl font-bold text-green-500">345</p>
                </div>
                <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Emails Sent</h2>
                    <p className="text-2xl font-bold text-yellow-500">4,678</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
