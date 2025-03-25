import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';

export default function LoadScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/notepad.jpg')} />
            <Text style={styles.quote}>Бедность не порок. Будь она пороком, ее не стыдились бы.</Text>
            <Text style={styles.author}>Джером Клапка Джером</Text>
            <StatusBar style="auto" />
            <View style={styles.bottomPanel}></View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quote: {
        width: '65%',
        textAlign: 'center',
        marginTop: 20,
    },
    author: {
        width: '80%',
        textAlign: 'right',
        marginTop: 20,
        fontWeight: 'bold'
    },
    bottomPanel: {
        height: 60,
        position: "absolute",
        bottom: 1,
        width: "100%",
        backgroundColor: '#2DA1F4',
    }
});
