const newProjectInfo = (state = {
    name: "",
    desc: "",
    version: "",
    author: "",
    license: "",
    src: "GitHub",
    ci: "TravisCI",
    docker: "Docker",
    host: "Heroku",
    framework: "ExpressJS"
}, action) => {
    switch (action.type) {
        case 'SET_NEW_PROJECT_INFORMATION':
            var newState = {
                ...state,
                ...action.info
            }
            if(newState.src==='None') {
                newState.ci='None'
            }
            if(newState.ci==='None') {
                newState.docker='None'
            }
            if(newState.docker==='None') {
                newState.host='None'
            }
            return newState
        default:
            return state
    }
}

export default newProjectInfo