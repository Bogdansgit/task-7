import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
	user: null
};

if(localStorage.getItem('jwtDecode')) {
	const decodedToken = jwtDecode(localStorage.getItem('jwtDecode'));

	if (decodedToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtDecode')
	} else {
		initialState.user = decodedToken;
	}
};

const AuthContext = createContext({
	user: null,
	login: (userData) => {},
	logout: () => {}
})

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.pauload
			};
		case 'LOGOUT':
			return {
				user: null
			}
		default:
			return state;
	}
}

function AuthProvider (props) {
	const [state, dispatch] = useReducer(authReducer, initialState);

	function login(userData) {
		localStorage.setItem('jwtDecode', userData.token);
		dispatch({
			type: 'LOGIN',
			payload: userData
		})
	}

	function logout() {
		localStorage.removeItem('jwtDecode');
		dispatch({ type: 'LOGOUT' })
	}

	return (
		<AuthContext.Provider value = {{user: state.user, login, logout}}
		{ ...props } />
	) 
};

export { AuthContext, AuthProvider }