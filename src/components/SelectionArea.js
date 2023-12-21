import React from 'react'

function SelectionArea({drawCard}) {

    return (
        <div>
            <button onClick={()=> drawCard('high')}>High?</button>
            <button onClick={()=> drawCard('low')}>Low?</button>
        </div>
    )  
}

export default SelectionArea
