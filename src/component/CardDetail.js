import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

export default class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {item, navigation, index} = this.props;
    let name = this.props.item ? item.device_id : undefined;
    let temp = this.props.item ? item.temperature : undefined;
    let humid = this.props.item ? item.humid : undefined;
    let intensity = this.props.item ? item.light_value : undefined;
    let status = this.props.item
      ? item.status == 1
        ? 'on'
        : 'off'
      : undefined;
    let body;
    body =
      index == 0 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>Nhiệt độ : {temp}</Text>
          <Text style={{textAlign: 'left'}}>Độ ẩm : {humid}</Text>
          <Text style={{textAlign: 'left'}}>Trạng thái máy lạnh: {status}</Text>
        </Body>
      ) : index == 1 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Cường độ bóng đèn : {intensity}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái bóng đèn: {status}</Text>
        </Body>
      ) : (
        <Body>
          <Text style={{textAlign: 'left'}}>Độ ẩm đất : {humid}</Text>
          <Text style={{textAlign: 'left'}}>Trạng thái motor : {status}</Text>
        </Body>
      );
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('EditSystemDetail', {
              index: index,
              name: item.device_id,
            })
          }>
          <Card>
            <CardItem header>
              <Text style={{textAlign: 'left'}}>Tên thiết bị: {name}</Text>
            </CardItem>
            <CardItem>{body}</CardItem>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
