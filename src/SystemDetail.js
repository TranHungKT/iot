import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';

import HeaderComponent from './component/HeaderComponent';
import CardDetail from './component/CardDetail';
import {connect} from 'react-redux';
import {
  getDeviceTypeAir,
  getDeviceTypeMotor,
  getDeviceTypeLight,
  getDeviceTypeSpeaker,
  getDeviceTypeLightD,
} from './redux/action';
const styles = StyleSheet.create({
  titleView: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bedRoom: {
    flex: 0.06,
    flexDirection: 'row',
    marginLeft: 10,
  },
  text: {
    fontSize: 12,
    marginRight: 8,
  },
  border: {
    borderBottomWidth: 1,
    flex: 0.001,
    alignItems: 'center',
  },
});

class SystemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      timePassed: false,
    };
  }
  componentDidMount() {
    this.onRefresh();
    setInterval(this.onRefresh, 5000);
  }

  renderItem = ({item}) => (
    <CardDetail
      item={item}
      navigation={this.props.navigation}
      index={this.props.navigation.state.params.index}
    />
  );

  onRefresh = () => {
    const {index} = this.props.navigation.state.params;

    if (index == 0) {
      this.props.getDeviceTypeAir();
    } else if (index == 1) {
      this.props.getDeviceTypeLight();
    } else if (index == 2) {
      this.props.getDeviceTypeMotor();
    } else if (index == 4) {
      this.props.getDeviceTypeSpeaker();
    } else if (index == 5) {
      this.props.getDeviceTypeLightD();
    }
    this.setState({refreshing: false});
  };

  render() {
    const nameTitle = [
      'HỆ THỐNG MÁY LẠNH',
      'HỆ THỐNG ĐÈN NHÀ',
      'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG',
      '',
      'SPEAKER',
      'LIGHTD',
    ];
    const {index} = this.props.navigation.state.params;
    const {reducer} = this.props;
    const {refreshing} = this.state;
    let DATA;
    if (index == 0) {
      DATA = reducer.device_type_air_conditioner;
    } else if (index == 1) {
      DATA = reducer.device_type_light;
    } else if (index == 2) {
      DATA = reducer.device_type_motor;
    } else if (index == 4) {
      DATA = reducer.device_type_speaker;
    } else if (index == 5) {
      DATA = reducer.device_type_lightD;
    }
    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.onRefresh}
            style={{marginTop: 10}}
          />
        }>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.titleView}>
          <Text style={styles.textTitle}>{nameTitle[index]}</Text>
        </View>
        <View style={{flex: 0.8}}>
          <FlatList
            data={DATA}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.device_id}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

const mapActionToProps = {
  getDeviceTypeAir,
  getDeviceTypeMotor,
  getDeviceTypeLight,
  getDeviceTypeSpeaker,
  getDeviceTypeLightD,
};
export default connect(mapStateToProps, mapActionToProps)(SystemDetail);
