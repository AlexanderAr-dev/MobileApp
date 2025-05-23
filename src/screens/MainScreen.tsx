import {SafeAreaView, StyleSheet} from 'react-native';
import QuickCreate from "../elements/QuickCreate";
import ListOfMonth from "../elements/ListOfMonth";
import {useAppContext} from "../AppContext";


export function MainScreen() {

    const { monthId } = useAppContext();

    return (
        <SafeAreaView style={styles.container}>
            <QuickCreate monthId={ monthId }/>
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
