import React from 'react';

const Campaigns = () => {
    return (
        <div className="p-6 ml-64">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Campaign Management</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Here you can create, view, and manage your campaigns.
            </p>

            {/* Campaign Card (Placeholder) */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Example Campaign</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    This is where campaign details will be displayed.
                </p>
            </div>
        </div>
    );
}

export default Campaigns;
