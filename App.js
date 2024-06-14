import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { GlobalStyles, LoginScreen, SignupScreen, WelcomeScreen } from './src';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
			}}
		>
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Signup' component={SignupScreen} />
		</Stack.Navigator>
	);
};

const AuthenticatedStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
			}}
		>
			<Stack.Screen name='Welcome' component={WelcomeScreen} />
		</Stack.Navigator>
	);
};

const Navigation = () => {
	return (
		<NavigationContainer>
			<AuthStack />
		</NavigationContainer>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<Navigation />
		</>
	);
}
