import React from 'react';

const Senders = () => {
    return (
        <div className="p-6 ml-64">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Sender Management</h1>
            <p className="text-gray-700 dark:text-gray-300">
                Here you can add, edit, and manage your sender email accounts.
            </p>

            {/* Add Sender Button */}
            <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    + Add Sender
                </button>
            </div>

            {/* Sender Accounts Table (Placeholder) */}
            <div className="mt-6 p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300">
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t dark:border-gray-600">
                            <td className="px-4 py-2">example@domain.com</td>
                            <td className="px-4 py-2 text-green-500">Active</td>
                            <td className="px-4 py-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                                    Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Senders;
