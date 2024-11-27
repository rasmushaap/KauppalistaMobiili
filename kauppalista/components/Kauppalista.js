import { useState, useEffect } from "react";
import * as Speech from "expo-speech";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Kauppalista() {
  const [tavara, setTavara] = useState({ nimi: "", kpl: "" });
  const [lista, setLista] = useState([]);

  const puhu = (tavara) => {
    Speech.speak(`Tuote: ${tavara.nimi}, Määrä: ${tavara.kpl}`);
  };

  const addTavara = () => {
    if (tavara.nimi != "" && tavara.kpl !== "") {
      const tavaraWithID = { id: Date.now().toString(), ...tavara };
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
          style={styles.input}
          placeholder="Syötä tavara"
          onChangeText={(text) => setTavara({ ...tavara, nimi: text })}
          value={tavara.nimi}
        />
        <TextInput
          style={styles.input}
          placeholder="Syötä määrä"
          keyboardType="numeric"
          onChangeText={(text) => setTavara({ ...tavara, kpl: text })}
          value={tavara.kpl}
        />
        <Button title="Lisää" onPress={addTavara} />
      </View>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listaItem}>
            <Text style={styles.tavaraText}>Tuote: {item.nimi}</Text>
            <Text style={styles.tavaraText}>Määrä: {item.kpl}</Text>
            <TouchableOpacity
              onPress={() => removeTavara(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Poista</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => puhu(item)}
              style={styles.speakButton}
            >
              <Text style={styles.speakButtonText}>Puhu</Text>
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
  listaItem: {
    alignItems: "center",
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
  },
  tavaraText: {
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
  speakButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  speakButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
