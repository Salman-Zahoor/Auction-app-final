import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {butoncolor, headerbackground} from "../../constants"
import {Home,AuctionDetail,Profile,WonEvents} from "../../container/app"
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();




function TabStack() {
    return (
      <Tab.Navigator screenOptions={{
        tabBarHideOnKeyboard:true,
          tabBarActiveBackgroundColor:headerbackground, 
          tabBarInactiveBackgroundColor:headerbackground,
          tabBarShowLabel:false,
          tabBarActiveTintColor:"black"
          
      }}>
        <Tab.Screen name="Home" component={Home} options={{headerShown:false,tabBarIcon:()=>(
          <AntDesign name="home" size={24} color="white" />),}} />

        <Tab.Screen name="WonEvents" component={WonEvents}  options={{headerShown:false,tabBarIcon:()=>(
      <Entypo name="trophy" size={24} color="white" />
        ),}} />

        <Tab.Screen name="Profile" component={Profile}  options={{headerShown:false,tabBarIcon:()=>(
         <AntDesign name="profile" size={24} color="white" />
          ),}}/>
      </Tab.Navigator>
    );
  }
  
  export default TabStack