import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Kauppalista from "./components/Kauppalista";
import Todo from "./components/Todo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Kauppalista") {
              return (
                <FontAwesome5 name="shopping-basket" size={24} color="black" />
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
  );
}
