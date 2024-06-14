import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store';

export const WelcomeScreen = () => {
	const [fetchedMessage, setFetchedMessage] = useState('');

	const authCtx = useContext(AuthContext);
	const token = authCtx.token;

	useEffect(() => {
		axios
			.get(
				`https://react-native-expense-6729b-default-rtdb.firebaseio.com/message.json?auth=${token}`
			)
			.then((response) => {
				setFetchedMessage(response.data);
			});
	}, [token]);

	return (
		<View style={styles.rootContainer}>
			<Text style={styles.title}>Welcome!</Text>
			<Text>You authenticated successfully!</Text>
			<Text>{fetchedMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 8,
	},
});
