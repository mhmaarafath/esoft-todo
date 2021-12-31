import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 10,
    },
    
    checkbox : {
        width: 40,
        height: 40,
        margin: 10,
        marginLeft: 10,
    },

    input: {
        width: '100%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#555555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'left',
        fontSize: 20,
        margin: 10,
        paddingHorizontal: 10,
    },

    text: {
        fontSize: 20,
        color: '#000000',
    },

    fontFamily : {
        fontFamily: 'Lora'
    },
    item: {
        marginVertical: 5,
        padding: 5,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5,
    },

    item_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_body: {
        flex: 1,
    },
    delete: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#000000',
        fontSize: 30,
        margin: 5,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0080ff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
        elevation: 5,
    },
});

export default GlobalStyles;