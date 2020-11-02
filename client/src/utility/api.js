const uri = '/api/v1'

const api = {
    getCurrentUser: (cb) => dispatch => {
        fetch(`${uri}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin', // send cookies
        })
            .then(res => res.json())
            .then(curUser => {
                if (curUser.message) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        user: curUser.currentUser,
                        message: curUser.message,
                    })
                    cb(true);
                }
                cb(false);
            });
    }
}

export default api;