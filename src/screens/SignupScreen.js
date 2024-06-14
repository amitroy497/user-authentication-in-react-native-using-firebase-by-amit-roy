import { useContext, useState } from 'react';
import { AuthContent, LoadingOverlay } from '../components';
import { createUser } from '../util';
import { Alert } from 'react-native';
import { AuthContext } from '../store';

export const SignupScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const authCtx = useContext(AuthContext);

	const signupHandler = async ({ email, password }) => {
		setIsAuthenticating(true);
		try {
			const token = await createUser(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				'Authentication failed!',
				'Could not create user. Please check your input or try again later!'
			);
			setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating user...' />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
};
