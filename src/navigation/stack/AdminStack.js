import { createStackNavigator } from '@react-navigation/stack';
import { AdminHome,AllParticipants,AuctionDetail,CreateAuction } from '../../container/admin';

const Stack = createStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminHome" component={AdminHome} options={{headerShown:false}}/>
      <Stack.Screen name="AuctionDetail" component={AuctionDetail} options={{headerShown:false}}/>
      <Stack.Screen name="CreateAuction" component={CreateAuction} options={{headerShown:false}}/>
      <Stack.Screen name="AllParticipants" component={AllParticipants} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default AdminStack