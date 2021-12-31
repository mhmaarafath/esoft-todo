import * as sqlite from 'expo-sqlite';

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }

    const db = sqlite.openDatabase("esoftTodo.db");
    return db;
}

export default openDatabase;