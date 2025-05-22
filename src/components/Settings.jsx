import React, { useState } from 'react';
import '../styles/settings.css';
const Settings = () => {
    const [notificationPreferences, setNotificationPreferences] = useState({
        email: true,
        sms: false,
        push: true,
    });

    const [displayOptions, setDisplayOptions] = useState({
        theme: 'light',
        language: 'en',
    });

    const handleNotificationChange = (event) => {
        const { name, checked } = event.target;
        setNotificationPreferences((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleDisplayChange = (event) => {
        const { name, value } = event.target;
        setDisplayOptions((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveSettings = () => {
        // Logic to save settings, e.g., API call
        console.log('Settings saved:', {
            notificationPreferences,
            displayOptions,
        });
    };

    return (
        <div className="settings-container">
            <h2>Settings</h2>
            <div className="notification-settings">
                <h3>Notification Preferences</h3>
                <label>
                    <input
                        type="checkbox"
                        name="email"
                        checked={notificationPreferences.email}
                        onChange={handleNotificationChange}
                    />
                    Email Notifications
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="sms"
                        checked={notificationPreferences.sms}
                        onChange={handleNotificationChange}
                    />
                    SMS Notifications
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="push"
                        checked={notificationPreferences.push}
                        onChange={handleNotificationChange}
                    />
                    Push Notifications
                </label>
            </div>
            <div className="display-settings">
                <h3>Display Options</h3>
                <label>
                    Theme:
                    <select
                        name="theme"
                        value={displayOptions.theme}
                        onChange={handleDisplayChange}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </label>
                <label>
                    Language:
                    <select
                        name="language"
                        value={displayOptions.language}
                        onChange={handleDisplayChange}
                    >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </label>
            </div>
            <button onClick={handleSaveSettings}>Save Settings</button>
        </div>
    );
};

export default Settings;