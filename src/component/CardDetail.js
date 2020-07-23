import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

export default class CardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  editSystemDetail = () => {
    this.props.navigation.navigate('EditSystemDetail', {
      index: this.props.index,
      name: this.props.item.device_id,
    });
  };

  render() {
    const {item, navigation, index} = this.props;
    let name = this.props.item ? item.device_id : undefined;
    let temp = this.props.item ? item.temperature : undefined;
    let humid = this.props.item ? item.humid : undefined;
    let intensity = this.props.item ? item.light_value : undefined;
    let mode = this.props.item ? item.mode : undefined;
    let status = this.props.item
      ? item.status == 1
        ? 'on'
        : 'off'
      : undefined;
    let body;
    body =
      index == 0 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến nhiệt độ : {temp}
          </Text>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến độ ẩm đất: {humid}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái máy lạnh: {status}</Text>
        </Body>
      ) : index == 1 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến ánh sáng : {intensity}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái bóng đèn: {status}</Text>
        </Body>
      ) : index == 2 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến độ ẩm đất: {humid}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái motor : {status}</Text>
        </Body>
      ) : index == 4 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến độ ẩm đất: {humid}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái speaker: {status}</Text>
          <Text style={{textAlign: 'left'}}>Chế độ : {mode}</Text>
        </Body>
      ) : index == 5 ? (
        <Body>
          <Text style={{textAlign: 'left'}}>
            Giá trị cảm biến ánh sáng : {intensity}
          </Text>
          <Text style={{textAlign: 'left'}}>Trạng thái đèn: {status}</Text>
          <Text style={{textAlign: 'left'}}>Chế độ : {mode}</Text>
        </Body>
      ) : null;
    return (
      <View>
        <TouchableOpacity
          onPress={this.editSystemDetail}
          style={{marginHorizontal: 10}}>
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
