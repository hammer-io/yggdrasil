const menuOpen = (state = true, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDE_MENU':
            return !state
        default:
            return state
    }
}

export default menuOpen