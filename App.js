import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ListMapsScreen from "./src/screens/ListMapsScreen";
import CreateMapsScreen from "./src/screens/CreateMapsScreen";
import AccountScreen from "./src/screens/AccountScreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return route.name === "ListMapsScreen" ? (
              <Entypo
                name="map"
                size={25}
                color={focused ? "tomato" : "black"}
              />
            ) : route.name === "CreateMapsScreen" ? (
              <FontAwesome6
                name="add"
                size={25}
                color={focused ? "tomato" : "black"}
              />
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={25}
                color={focused ? "tomato" : "black"}
              />
            );
          },
          tabBarActiveTintColor: "tomato", // Label color when active
          tabBarInactiveTintColor: "black", // Label color when inactive
        })}
      >
        <Tab.Screen
          name="ListMapsScreen"
          component={ListMapsScreen}
          options={{
            tabBarLabel: "My maps",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="CreateMapsScreen"
          component={CreateMapsScreen}
          options={{
            tabBarLabel: "Add",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarLabel: "Account",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
