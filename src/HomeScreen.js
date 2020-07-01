import React, {Component, isValidElement} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Card, CardItem, Icon} from 'native-base';
import HeaderComponent from './component/HeaderComponent';
import CardSystem from './component/CardSystem';
import {connect} from 'react-redux';
import {
  getDeviceTypeAir,
  getDeviceTypeMotor,
  getDeviceTypeLight,
} from './redux/action';
const styles = StyleSheet.create({
  header: {
    flex: 0.2,
  },
  body: {
    flex: 0.9,
  },
  cards: {
    flex: 0.5,
    flexDirection: 'row',
  },
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  moveToDetails0 = (index) => {
    this.props.getDeviceTypeAir();
    this.props.navigation.navigate('SystemDetail', {
      index: index,
    });
  };
  moveToDetails1 = (index) => {
    this.props.getDeviceTypeLight();
    this.props.navigation.navigate('SystemDetail', {
      index: index,
    });
  };

  moveToDetails2 = (index) => {
    this.props.getDeviceTypeMotor();
    this.props.navigation.navigate('SystemDetail', {
      index: index,
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <HeaderComponent style={styles.header} />
        <View style={styles.body}>
          <View style={styles.cards}>
            <TouchableOpacity
              onPress={() => {
                this.moveToDetails0(0);
              }}
              style={{flex: 0.5}}>
              <CardSystem data={0} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.moveToDetails1(1);
              }}
              style={{flex: 0.5}}>
              <CardSystem data={1} />
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <TouchableOpacity
              onPress={() => {
                this.moveToDetails2(2);
              }}
              style={{flex: 0.5}}>
              <CardSystem data={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  getDeviceTypeAir,
  getDeviceTypeMotor,
  getDeviceTypeLight,
})(HomeScreen);
