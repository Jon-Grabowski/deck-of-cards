function reducer(state, action) {
    switch (action.type) {
        case ('shuffle'):
            return {deck : action.payload, currCard: {}, score: 0}
        case ('start'):
            return {
                ...state, 
                deck: {
                    remaining: action.payload.remaining, 
                    deck_id: action.payload.deck_id
                },
                currCard: action.payload.cards[0]
            }
            // newState.deck.remaining = action.payload.remaining
            
        default:
            return state
    }
}

function assignNumVal(newCard) {
    switch (newCard.value) {
        case 'JACK':
            return newCard['numValue'] = 11
        case 'QUEEN':
            return newCard['numValue'] = 12
        case 'KING':
            return newCard['numValue'] = 13
        case 'ACE':
            return newCard['numValue'] = 14
        default:
            return newCard['numValue'] = parseInt(newCard.value)
    };
}

export { reducer, assignNumVal }