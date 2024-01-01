import React, { useEffect, useState } from 'react';

function InfoPopup() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Check if the popup has been shown before
        if (!localStorage.getItem('popupShown')) {
            // Show the popup
            setShowPopup(true);

            // Set the flag to indicate that the popup has been shown
            localStorage.setItem('popupShown', true);
        }

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    function handleStorageChange(event) {
        // Check if the 'popupShown' key has been updated
        if (event.key === 'popupShown') {
            // Update the showPopup state based on the new value
            setShowPopup(event.newValue === 'true');
        }
    }

    function closePopup() {
        // Hide the popup
        setShowPopup(false);
        localStorage.setItem('popupShown', true); // Update the local storage value
    }

    const Information = {
        "Current features": ['Song search and filter', 'Listen to songs', 'Add songs to favorites'],
        "Upcoming features": ['Playlist feature', 'Share playlist/import playlist'],
        "Known bugs": ["Clicking on favorite song does not set the current song"]
    };

    // Move the condition to display the popup outside the return statement
    if (showPopup) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                    zIndex: '9999', // Set a high z-index value
                }}
            >
                <h1>Welcome to WF Jukebox</h1>
                <h2>Current features</h2>
                {Information["Current features"].map((feature, index) => (
                    <div key={index}>
                        <ul>
                            <li>{feature}</li>
                        </ul>
                    </div>
                ))}
                <h2>Upcoming features</h2>
                {Information["Upcoming features"].map((feature, index) => (
                    <div key={index}>
                        <ul>
                            <li>{feature}</li>
                        </ul>
                    </div>
                ))}
                <h2>Known bugs</h2>
                {Information["Known bugs"].map((feature, index) => (
                    <div key={index}>
                        <ul>
                            <li>{feature}</li>
                        </ul>
                    </div>
                ))}
                <button onClick={closePopup}>Close</button>
            </div>
        );
    } else {
        return null; // No popup shown when `showPopup` is false
    }
}

export default InfoPopup;
