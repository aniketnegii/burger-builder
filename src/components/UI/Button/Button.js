import React from 'react'
import './Button.css'

function Button( props ) {
    
    const style = ["Button", props.btnType];
    
    return (
        <button
            className= {style.join(' ')}
            onClick={props.clicked}>{props.children}</button>
    )
}

export default Button
