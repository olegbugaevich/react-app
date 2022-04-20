import React from 'react';
import button from './toggleButton.css'

const ToggleButton = ({toggle, setToggle, children}) => {
    return (
        <button
            className={toggle ? 'button-red' : 'button-green'}
            onClick={() => setToggle(!toggle)}>
            {children}
        </button>
    );
};

export default ToggleButton;