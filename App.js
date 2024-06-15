import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import {
	AuthContext,
	AuthContextProvider,
	GlobalStyles,
	IconButton,
	LoginScreen,
	SignupScreen,
	WelcomeScreen,
} from './src';

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
	const authCtx = useContext(AuthContext);
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
			}}
		>
			<Stack.Screen
				name='Welcome'
				component={WelcomeScreen}
				options={{
					headerRight: ({ tintColor }) => (
						<IconButton
							icon='exit'
							color={tintColor}
							size={24}
							onPress={authCtx.logout}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

const Navigation = () => {
	const authCtx = useContext(AuthContext);

	return (
		<NavigationContainer>
			{!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
		</NavigationContainer>
	);
};

export default function App() {
	return (
		<>
			<StatusBar style='light' />
			<AuthContextProvider>
				<Navigation />
			</AuthContextProvider>
		</>
	);
}
