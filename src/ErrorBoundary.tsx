// @ts-nocheck
import styles from '@styles/styles';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default class ErrorBoundary extends React.Component {
    constructor(props: Object) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <View style={styles.container}>
                <Text>Ha ocurrido un problema, intenta nuevamente.</Text>
            </View>;
        }

        return this.props.children;
    }
}
