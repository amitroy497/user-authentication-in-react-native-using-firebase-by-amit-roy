import { useContext, useState } from 'react';
import { AuthContent, LoadingOverlay } from '../components';
import { login } from '../util';
import { Alert } from 'react-native';
import { AuthContext } from '../store';

export const LoginScreen = () => {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const authCtx = useContext(AuthContext);

	const loginHandler = async ({ email, password }) => {
		setIsAuthenticating(true);
		try {
			const token = await login(email, password);
			authCtx.authenticate(token);
		} catch (error) {
			Alert.alert(
				'Authentication failed!',
				'Could not log you in. Please check your credentials or try again later!'
			);
			setIsAuthenticating(false);
		}
	};

	if (isAuthenticating) {
		return <LoadingOverlay message='Logging you in...' />;
	}
	return <AuthContent isLogin onAuthenticate={loginHandler} />;
};
