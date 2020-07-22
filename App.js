import React, {Component} from 'react';

import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import HomeScreen from './src/HomeScreen';
import SystemDetail from './src/SystemDetail';
import EditSystemDetail from './src/EditSystemDetail';
import Statictical from './src/Statictical';
import SettingPage from './src/SettingPage';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const swithNavigator = createSwitchNavigator({
  SystemDetail: {
    screen: SystemDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditSystemDetail: {
    screen: EditSystemDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const HomeContainer = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  SystemDetail: {
    screen: SystemDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
  EditSystemDetail: {
    screen: EditSystemDetail,
    navigationOptions: {
      headerShown: false,
    },
  },
  Statictical: {
    screen: Statictical,
    navigationOptions: {
      headerShown: false,
    },
  },
  SettingPage: {
    screen: SettingPage,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppContainer = createAppContainer(HomeContainer);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
