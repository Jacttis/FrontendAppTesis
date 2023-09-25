import react from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

export default function Welcome() {
    const styles = StyleSheet.create(
        {
            container:{

            }
        }
    )
    return (
        <SafeAreaView style={styles.container}>
            <Text> Welcome aa </Text>
        </SafeAreaView>
    )
}