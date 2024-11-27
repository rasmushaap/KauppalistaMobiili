import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo != "") {
      const todoWithID = { id: Date.now().toString(), name: todo };
      setTodos([todoWithID, ...todos]);
      setTodo("");
    }
  };

  const removeTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo Lista</Text>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Syötä tehtävä"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button title="Lisää" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => removeTask(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Poista</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  todoItem: {
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
  },
  todoText: {
    fontSize: 16,
    color: "black",
  },
  deleteButton: {
    backgroundColor: "#ff5c5c",
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
