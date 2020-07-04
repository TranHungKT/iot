import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import {ListItem, Left, Body, Right, Icon} from 'native-base';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.1,
  },
  button: {
    flex: 0.1,
    marginHorizontal: 40,
    marginTop: 100,
    backgroundColor: '#74BFE4',
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default class SettingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humid_of_air: '',
      humid_of_land: '',
      light_value: '',
      temp: '',
    };
  }
  save = () => {};

  render() {
    const {humid_of_air, humid_of_land, light_value, temp} = this.state;
    return (
      <View style={{flex: 1}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.title}>
          <Text style={styles.text}>CÀI ĐẶT</Text>
        </View>
        <ListItem icon>
          <Left>
            <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
          </Left>
          <Body>
            <Text>Ngưỡng độ ẩm không (%)</Text>
          </Body>
          <Right>
            <TextInput
              placeholder="Type here"
              onChangeText={(humid_of_air) => this.setState({humid_of_air})}
              value={humid_of_air}></TextInput>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
          </Left>
          <Body>
            <Text>Ngưỡng độ ẩm đất(%)</Text>
          </Body>
          <Right>
            <TextInput
              placeholder="Type here"
              onChangeText={(humid_of_land) => this.setState({humid_of_land})}
              value={humid_of_land}></TextInput>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon
              name={'lightbulb'}
              type="FontAwesome5"
              style={{fontSize: 22}}
            />
          </Left>
          <Body>
            <Text>Ngưỡng độ ánh sáng</Text>
          </Body>
          <Right>
            <TextInput
              placeholder="Type here"
              onChangeText={(light_value) => this.setState({light_value})}
              value={light_value}></TextInput>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon
              type="FontAwesome5"
              name="temperature-high"
              style={{fontSize: 22}}
            />
          </Left>
          <Body>
            <Text>Ngưỡng nhiệt độ</Text>
          </Body>
          <Right>
            <TextInput
              placeholder="Type here"
              onChangeText={(temp) => this.setState({temp})}
              value={temp}></TextInput>
          </Right>
        </ListItem>

        <TouchableOpacity onPress={this.save} style={styles.button}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
