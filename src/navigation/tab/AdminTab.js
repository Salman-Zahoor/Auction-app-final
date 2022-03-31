import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {butoncolor, headerbackground} from "../../constants"
import { AdminHome,CreateAuction,Profile } from '../../container/admin';
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();




function AdminTabStack() {
    return (
      <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard:true,
          tabBarActiveBackgroundColor:headerbackground, 
          tabBarInactiveBackgroundColor:headerbackground,
          tabBarShowLabel:false,
          tabBarActiveTintColor:"black"
          
      }}>
        <Tab.Screen name="AdminHome" component={AdminHome} options={{headerShown:false,tabBarIcon:()=>(
          <AntDesign name="home" size={24} color="white" />),}} />

        <Tab.Screen name="CreateAuction" component={CreateAuction}  options={{headerShown:false,tabBarIcon:()=>(
      <AntDesign name="pluscircle" size={24} color="white" />
        ),}} />

        <Tab.Screen name="Profile" component={Profile}  options={{headerShown:false,tabBarIcon:()=>(
         <AntDesign name="profile" size={24} color="white" />
          ),}}/>
      </Tab.Navigator>
    );
  }
  
  export default AdminTabStack