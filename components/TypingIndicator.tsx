import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TypingIndicator() {
  return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <Text style={styles.dot}>●</Text>
            <Text style={styles.dot}>●</Text>
            <Text style={styles.dot}>●</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    dot: {
        fontSize: 8,
        color: '#B0B0B0',
        marginHorizontal: 3,
    },
});