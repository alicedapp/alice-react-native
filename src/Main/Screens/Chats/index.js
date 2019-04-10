import {createStackNavigator} from "react-navigation";
import ChatScreen from "./ChatScreen";
import Chat3 from "./Chat3";
import Chat2 from "./Chat2";
import Chat from './Chat'
import Icon from "../../../components/IconComponent";
import React from "react";

export default createStackNavigator({
    Chats: {
      screen: ChatScreen,
    },
    Chat: {
      screen: Chat
    },
    Chat2: {
      screen: Chat2
    },
    Chat3: {
      screen: Chat3
    },
  },
  {
    navigationOptions: {
      tabBarIcon: ({tintColor}) => <Icon icon="ChatGrey" size={30}/>,
    },
  });
