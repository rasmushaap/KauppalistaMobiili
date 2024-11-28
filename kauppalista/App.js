import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as LocalAuthentication from "expo-local-authentication";
import Kauppalista from "./components/Kauppalista";
import Todo from "./components/Todo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState, useEffect } from "react";
import { Button, StatusBar, StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default function App() {
  const [authentication, setAuthentication] = useState(false);

  const authenticateUser = async () => {
    const result = await LocalAuthentication.authenticateAsync();
    setAuthentication(result.success);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  if (authentication)
    return (
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: () => {
                if (route.name === "Kauppalista") {
                  return (
                    <FontAwesome5
                      name="shopping-basket"
                      size={24}
                      color="black"
                    />
                  );
                } else if (route.name === "Todo") {
                  return <FontAwesome5 name="list" size={24} color="black" />;
                }
              },
            })}
          >
            <Tab.Screen name="Kauppalista" component={Kauppalista} />
            <Tab.Screen name="Todo" component={Todo} />
          </Tab.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PaperProvider>
    );
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Button title="Kirjaudu sisään" onPress={authenticateUser} />
      </View>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
});
