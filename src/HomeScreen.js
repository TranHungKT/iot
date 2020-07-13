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
  getDeviceTypeSpeaker,
  getDeviceTypeLightD,
} from './redux/action';
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  cards: {
    flex: 1 / 3,
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
  moveToDetails4 = (index) => {
    this.props.getDeviceTypeSpeaker();
    this.props.navigation.navigate('SystemDetail', {
      index: index,
    });
  };
  moveToSetting = () => {
    this.props.navigation.navigate('SettingPage');
  };
  moveToDetails5 = (index) => {
    this.props.getDeviceTypeLightD();
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
              style={{
                flex: 0.5,
              }}>
              <CardSystem data={0} style={{position: 'absolute', top: 100}} />
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
            <TouchableOpacity
              onPress={() => {
                this.moveToSetting();
              }}
              style={{flex: 0.5}}>
              <CardSystem data={3} />
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <TouchableOpacity
              onPress={() => {
                this.moveToDetails4(4);
              }}
              style={{flex: 0.5}}>
              <CardSystem data={4} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.moveToDetails5(5);
              }}
              style={{flex: 0.5}}>
              <CardSystem data={5} />
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
  getDeviceTypeSpeaker,
  getDeviceTypeLightD,
})(HomeScreen);
