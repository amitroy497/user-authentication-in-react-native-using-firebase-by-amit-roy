import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
	token: '',
	isAuthenticated: false,
	authenticate: (token) => {},
	logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
	const [authToken, setAuthToken] = useState();

	useEffect(() => {
		const fetchToken = async () => {
			const storageToken = await AsyncStorage.getItem('token');

			if (storageToken) {
				setAuthToken(storageToken);
			}
		};

		fetchToken();
	}, []);

	const authenticate = (token) => {
		setAuthToken(token);
		AsyncStorage.setItem('token', token);
	};

	const logout = () => {
		setAuthToken(null);
	};

	const value = {
		token: authToken,
		isAuthenticated: !!authToken,
		authenticate: authenticate,
		logout: logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
