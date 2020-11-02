const uri = '/api/v1'


const actions = {
  signUpWithGoogle: () => dispatch => {
    fetch(`${uri}/auth/google`)
      .then(res => console.log(res, 'response after signup from google'))
  },
  createUser: (data, cb) => {
		return dispatch => {
			fetch(`${uri}/create-user`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(user => {
					if (user.message) {
						dispatch({
							type: 'CREATE_USER_SUCCESS',
							message: user.message
						})
						cb(true)
					} else {
						dispatch({
							type: 'CREATE_USER_FAIL',
							error: user.error
						})
						cb(false, user.error)
					}
				})
		}
	},

	loginUser: (data, cb) => {
		return dispatch => {
			fetch(`${uri}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(data => {
					if (data.message) {
						const { userInfo, token, message } = data;
						let jwt = `Bearer ${token}`
						localStorage.setItem('token', jwt);
						localStorage.setItem('user', JSON.stringify(userInfo));
						dispatch({
							type: 'LOGIN_SUCCESS',
							message,
							token: jwt,
							user: userInfo
						})
						cb(true)
					} else {
						dispatch({
							type: 'LOGIN_FAIL',
							error: data.error
						})
						cb(false, data.error)
					}
				})
		}
	},

	// logout user action
	logout: (cb) => dispatch => {
		fetch(`${uri}/logout`, {
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin', // send cookies
		})
			.then(res => res.json())
			.then(user => { 
				if (user.message) {
					dispatch({
						type: 'LOGOUT_USER'
					})
					cb(true)
				}
			})
	},
}

export default actions;