const userID = (state = -1, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return -1
        case 'LOGIN':
            return action.id
        default:
            return state
    }
}

export default userID