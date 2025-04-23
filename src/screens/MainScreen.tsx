import {SafeAreaView, StyleSheet} from 'react-native';
import QuickCreate from "../elements/QuickCreate";
import ListOfMonth from "../elements/ListOfMonth";


export function MainScreen() {

    return (
        <SafeAreaView style={styles.container}>
            <QuickCreate />
            <ListOfMonth />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
