import { useState } from "react";
import { Button, TextInput, Card, Text, IconButton } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";

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
          style={{ width: "90%", marginBottom: 10 }}
          placeholder="Syötä tehtävä"
          onChangeText={(text) => setTodo(text)}
          value={todo}
        />
        <Button mode="contained" onPress={addTodo}>
          Lisää
        </Button>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, alignItems: "center" }}>
            <Card.Content>
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{item.name}</Text>
                <IconButton
                  iconColor="red"
                  icon="delete"
                  onPress={() => removeTask(item.id)}
                />
              </View>
            </Card.Content>
          </Card>
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
