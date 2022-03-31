import { createStackNavigator } from '@react-navigation/stack';
import { AllParticipants,AuctionDetail} from '../../container/admin';
import AdminTabStack from '../tab/AdminTab';

const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminTabStack" component={AdminTabStack} options={{headerShown:false}}/>
      <Stack.Screen name="AuctionDetail" component={AuctionDetail} options={{headerShown:false}}/>
      <Stack.Screen name="AllParticipants" component={AllParticipants} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AdminStack