import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import HeaderComponent from './component/HeaderComponent';
import CardDetail from './component/CardDetail';
import {connect} from 'react-redux';
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
    this.state = {};
  }
  renderItem = ({item}) => (
    <CardDetail
      item={item}
      navigation={this.props.navigation}
      index={this.props.navigation.state.params.index}
    />
  );

  render() {
    const nameTitle = [
      'HỆ THỐNG MÁY LẠNH',
      'HỆ THỐNG ĐÈN NHÀ',
      'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG',
    ];
    const {index} = this.props.navigation.state.params;
    const {reducer} = this.props;
    let DATA;
    if (index == 0) {
      DATA = reducer.device_type_air_conditioner;
    } else if (index == 1) {
      DATA = reducer.device_type_light;
    } else {
      DATA = reducer.device_type_motor;
    }
    console.log(index);
    return (
      <View style={{flex: 1}}>
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps)(SystemDetail);
