import { useState } from 'react';
import { AuthContent, LoadingOverlay } from '../components';
import { createUser } from '../util';

export const SignupScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = useState();

	const signupHandler = async ({ email, password }) => {
		setIsAuthenticating(true);
		await createUser(email, password);
		setIsAuthenticating(false);
	};

	if (isAuthenticating) {
		return <LoadingOverlay message='Creating user...' />;
	}

	return <AuthContent onAuthenticate={signupHandler} />;
};
