export const logIn = id => {
    return {
        type: 'LOGIN',
        id
    }
}

export const logOut = filter => {
    return {
        type: 'LOGOUT'
    }
}

export const toggleSideMenu = () => {
    return {
        type: 'TOGGLE_SIDE_MENU'
    }
}