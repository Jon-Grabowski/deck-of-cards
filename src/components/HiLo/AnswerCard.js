import React from 'react'
import './answer-card.css'

function AnswerCard({correct}) {
    return (
        <div id='answer-card' style={correct? {'background': 'darkgreen'}: {'background': 'red'}}>
            <span>{correct ? '✓':'✕'}</span>
            {/* <p>{correct? 'Correct!': 'Incorrect'}</p> */}
            
        </div>
    )
}

export default AnswerCard
