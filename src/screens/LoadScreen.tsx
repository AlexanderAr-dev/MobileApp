import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';

export default function LoadScreen() {
    const [quote, setQuote] = useState<string | null>(null);
    const [author, setAuthor] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru')
            .then((response) => {
                // API иногда возвращает невалидный JSON — обойти это через text()
                return response.text();
            })
            .then((text) => {
                // Исправление кавычек, если сломаны
                const cleaned = text.replace(/\\'/g, "'");
                const data = JSON.parse(cleaned);
                setQuote(data.quoteText);
                setAuthor(data.quoteAuthor || 'Неизвестный автор');
            })
            .catch((error) => {
                console.error('Ошибка загрузки цитаты:', error);
                setQuote('Бедность не порок. Будь она пороком, ее не стыдились бы.');
                setAuthor('Джером Клапка Джером');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/notepad.jpg')} />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.quote}>{quote}</Text>
                    <Text style={styles.author}>— {author}</Text>
                </>
            )}

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
        paddingHorizontal: 20,
    },
    quote: {
        width: '80%',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontStyle: 'italic',
    },
    author: {
        width: '80%',
        textAlign: 'right',
        marginTop: 20,
        fontWeight: 'bold',
    },
    bottomPanel: {
        height: 60,
        position: "absolute",
        bottom: 1,
        width: "100%",
        backgroundColor: '#2DA1F4',
    }
});