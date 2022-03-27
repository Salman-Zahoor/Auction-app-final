import { createStackNavigator } from '@react-navigation/stack';
import { LogIn,Register } from "../../container/auth";
import {AuctionDetail} from "../../container/app"
import TabStack from '../tab/Tab';


const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabStack" component={TabStack} options={{headerShown:false}}/>
      <Stack.Screen name="AuctionDetail" component={AuctionDetail} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AppStack