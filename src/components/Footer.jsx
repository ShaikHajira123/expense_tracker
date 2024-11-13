// src/components/Footer.js
import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <p className="text-center text-sm">
                &copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
