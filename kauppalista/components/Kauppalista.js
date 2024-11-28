import { useState } from "react";
import * as Speech from "expo-speech";
import { Button, TextInput, Card, Text, IconButton } from "react-native-paper";
import { View, StyleSheet, FlatList } from "react-native";

export default function Kauppalista() {
  const [tavara, setTavara] = useState({ nimi: "", kpl: "" });
  const [lista, setLista] = useState([]);

  const puhu = (tavara) => {
    Speech.speak(`Tuote: ${tavara.nimi}, Määrä: ${tavara.kpl}`);
  };

  const toggleCheck = (id) => {
    setLista(
      lista.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addTavara = () => {
    if (tavara.nimi != "" && tavara.kpl !== "") {
      const tavaraWithID = {
        id: Date.now().toString(),
        ...tavara,
        checked: false,
      };
      setLista([tavaraWithID, ...lista]);
      setTavara({ nimi: "", kpl: "" });
    }
  };

  const removeTavara = (id) => {
    setLista(lista.filter((tavara) => tavara.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kauppalista</Text>
      <View style={{ alignItems: "center" }}>
        <TextInput
          style={{ width: "90%", marginBottom: 10 }}
          placeholder="Syötä tavara"
          onChangeText={(text) => setTavara({ ...tavara, nimi: text })}
          value={tavara.nimi}
        />
        <TextInput
          style={{ width: "90%", marginBottom: 10 }}
          placeholder="Syötä määrä"
          keyboardType="numeric"
          onChangeText={(text) => setTavara({ ...tavara, kpl: text })}
          value={tavara.kpl}
        />
        <Button mode="contained" onPress={addTavara}>
          Lisää
        </Button>
      </View>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10, alignItems: "center" }}>
            <Card.Content>
              <View style={styles.listaItem}>
                <Text
                  style={[
                    styles.tavaraText,
                    item.checked && styles.checkedTavaraText,
                  ]}
                >
                  {item.nimi} ({item.kpl} kpl)
                </Text>
              </View>
              <View style={styles.buttonRow}>
                <IconButton icon="check" onPress={() => toggleCheck(item.id)} />
                <IconButton icon="volume-high" onPress={() => puhu(item)} />
                <IconButton
                  iconColor="red"
                  icon="delete"
                  onPress={() => removeTavara(item.id)}
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
  listaItem: {
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tavaraText: {
    fontSize: 16,
    color: "black",
  },
  checkedTavaraText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});
