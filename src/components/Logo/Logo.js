import React from 'react';
import './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png';

function Logo(props) {
    return (
        <div className="Logo" style={{height: props.height}}>
            <img src={burgerLogo} alt="My burger"/>
        </div>
    )
}

export default Logo
