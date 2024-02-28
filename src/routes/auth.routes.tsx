import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn } from "../pages/signin";



const Stack = createNativeStackNavigator()

export function AuthRoutes() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn"  component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}