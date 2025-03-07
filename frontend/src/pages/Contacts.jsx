import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const Contacts = () => {
    const [file, setFile] = useState(null);
    const [parsedContacts, setParsedContacts] = useState([]);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleAddContacts = () => {
        if (!file) {
            setError("Please upload a file before adding contacts.");
            return;
        }

        // Parse the CSV file
        Papa.parse(file, {
            complete: (result) => {
                console.log("Parsed CSV Result:", result.data); // Log parsed CSV data to see the raw output

                const contacts = result.data;
                // Filter out only the required fields from the CSV
                const cleanedContacts = contacts.map((contact) => ({
                    associated_property_address_full: contact["associated_property_address_full"] || null,
                    first_name: contact["first_name"] || null,
                    last_name: contact["last_name"] || null,
                    middle_initial: contact["middle_initial"] || null,
                    generational_suffix: contact["generational_suffix"] || null,
                    contact_flags: contact["contact_flags"] || null,
                    gender: contact["gender"] || null,
                    email_address_1: contact["email_address_1"] || null,
                    email_address_2: contact["email_address_2"] || null,
                    email_address_3: contact["email_address_3"] || null,
                })).filter(
                    (contact) => contact.first_name && contact.email_address_1 // Ensure first name and email address are present
                );

                console.log("Cleaned Contacts:", cleanedContacts); // Log cleaned contacts to verify they are valid
                setParsedContacts(cleanedContacts);

                if (cleanedContacts.length === 0) {
                    setError("No valid contacts found.");
                    return;
                }

                setError(""); // Clear any previous errors

                // Send the batch of contacts to the backend
                axios
                    .post("http://localhost:5000/contacts/batch", { contacts: cleanedContacts })
                    .then((response) => {
                        console.log("Contacts added:", response.data);
                    })
                    .catch((err) => {
                        console.error("Error adding contacts:", err);
                        setError(`Backend error: ${err.response?.data?.error || err.message}`);
                    });
            },
            header: true, // Ensure the first row is treated as headers
        });
    };

    const handleRemoveContact = (index) => {
        const updatedContacts = [...parsedContacts];
        updatedContacts.splice(index, 1);
        setParsedContacts(updatedContacts);
    };

    return (
        <div className="p-6 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Management</h1>

            {/* Add Contacts Button */}
            <div className="mt-6">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="p-2 rounded border-gray-300 dark:border-gray-600"
                />
                <button
                    onClick={handleAddContacts}
                    className="inline-block p-2 rounded bg-green-500 text-white ml-2"
                >
                    Add Contacts
                </button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Displaying parsed contacts */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Parsed Contacts:</h2>
                <table className="w-full mt-4 table-auto">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="px-4 py-2">Full Property Address</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Middle Initial</th>
                            <th className="px-4 py-2">Generational Suffix</th>
                            <th className="px-4 py-2">Contact Flags</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Email Address 1</th>
                            <th className="px-4 py-2">Email Address 2</th>
                            <th className="px-4 py-2">Email Address 3</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parsedContacts.length > 0 ? (
                            parsedContacts.map((contact, index) => (
                                <tr key={index} className="border-t dark:border-gray-600">
                                    <td className="px-4 py-2">{contact["associated_property_address_full"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["first_name"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["last_name"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["middle_initial"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["generational_suffix"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["contact_flags"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["gender"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["email_address_1"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["email_address_2"] || "N/A"}</td>
                                    <td className="px-4 py-2">{contact["email_address_3"] || "N/A"}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleRemoveContact(index)}
                                            className="bg-red-500 text-white px-4 py-2 rounded"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center px-4 py-2">No contacts to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contacts;
