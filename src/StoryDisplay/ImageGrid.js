import React, { useState } from 'react';

const SubImage = ({ source, cell }) => {
    const [row, col] = cell;
    const [isScaled, setIsScaled] = useState(false);

    const handleMouseDown = () => {
        setIsScaled(true);
    };

    const handleMouseUp = () => {
        setIsScaled(false);
    };

    const scale = isScaled ? 0.9 : 1;
    const transition = 'transform 0.3s ease-in-out'; // Add transition property

    return (
        <img
            src={source}
            alt={`SubImage at row ${row}, col ${col}`}
            style={{
                gridColumn: col + 1,
                gridRow: row + 1,
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                objectFit: 'cover',
                transition: transition, // Apply transition
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        />
    );
};

const Image = ({ backgroundSource, rows, cols, children }) => {
    const gridTemplateColumns = `repeat(${cols}, 1fr)`;
    const gridTemplateRows = `repeat(${rows}, 1fr)`;

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns,
        gridTemplateRows,
        gap: '2px', // Adjust as needed
        width: '100%',
        height: '100%',
        position: 'relative',
        background: `url(${backgroundSource})`,
        backgroundSize: 'cover',
    };

    return <div style={containerStyle}>{children}</div>;
};

export { Image, SubImage };
