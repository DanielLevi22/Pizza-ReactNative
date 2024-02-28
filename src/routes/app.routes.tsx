import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashBoard } from "../pages/dashboard";
import { Order } from "../pages/order";
import { FinishOrder } from "../pages/finishorder";

export type StackParamsList =  {
  Dashboard: undefined;
  FinishOrder: {
    number: number;
    order_id: string
  }
  Order: {
    number: number | string 
    order_id: string
  }
}


const Stack = createNativeStackNavigator<StackParamsList>()

export function AppRoutes() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard"  component={DashBoard} options={{headerShown:false}}/>
      <Stack.Screen name="Order"  component={Order} options={{headerShown:false}}/>
      <Stack.Screen name="FinishOrder"  component={FinishOrder} options={{
        title: 'Finalizando',
        headerStyle: {
          backgroundColor: '#1d1d2e',
        },
        headerTintColor: '#fff'
      }}/>


    </Stack.Navigator>
  )
}