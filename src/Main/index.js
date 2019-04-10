import {createBottomTabNavigator} from "react-navigation";
import AppsScreen from './Screens/AppsScreen'
import ChatScreen from './Screens/Chats'
// import MyApp from '../Apps/LocalEthereum'
import MyApp from './Screens/Chats/Chat'
import Personal from './Screens/PersonalScreen'

export default createBottomTabNavigator(
  {
    // Testing: MyApp,
    Chat: ChatScreen,
    Apps: AppsScreen,
    Personal: Personal
  },
  {
    headerMode: 'none',
    initialRouteName: 'Apps',
    navigationOptions: {
      tabBar: false,
    },
    tabBarOptions: {
      showLabel: false,
      backgroundColor: 'black',
      borderTopColor: "white",
    },
  });
