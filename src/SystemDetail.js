import React, { Component } from 'react';
import { View, Text,StyleSheet, StatusBar,TouchableOpacity } from 'react-native';

import HeaderComponent from './component/HeaderComponent';

const styles = StyleSheet.create({
    titleView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    bedRoom:{
        flex: 0.06,
        flexDirection: 'row',
        marginLeft : 10,
    },
    text:{
        fontSize: 12,
        marginRight: 8,
        
    },
    border:{
        borderBottomWidth: 1,
        flex: 0.001,
        alignItems: 'center'
    },
})

export default class SystemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const nameTitle = ['HỆ THỐNG MÁY LẠNH', 'HỆ THỐNG ĐÈN NHÀ', 'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG']
    const {index} = this.props.navigation.state.params;
    const system = ['Máy lạnh', 'Đèn', 'Tưới cây']
    return (
      <View style = {{flex : 1}}>
        <HeaderComponent style = {{flex : 0.2}} />
        <View style = {styles.titleView}>
            <Text style = {styles.textTitle}>{nameTitle[index]}</Text>
        </View>
        <TouchableOpacity style = {styles.bedRoom}>
            <Text style = {[styles.text, {flex: 0.4}]}>{system[index]} phòng ngủ </Text>
            <Text style = {[styles.text, {flex: 0.2}]}>Trang thai </Text>
            <Text style = {[styles.text, {flex: 0.4, textAlign : 'center'}]}>Theo thoi gian biểu</Text>
        </TouchableOpacity>
        <View style = {styles.border} />
        <TouchableOpacity style = {styles.bedRoom}>
            <Text style = {[styles.text, {flex: 0.4}]}>{system[index]} phòng khách</Text>
            <Text style = {[styles.text, {flex: 0.2}]}>Trang thai </Text>
            <Text style = {[styles.text, {flex: 0.4, textAlign : 'center'}]}>Theo cảm biến</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
