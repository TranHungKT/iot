import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
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
      isLoading: false,
      humid_of_air: '',
      humid_of_land: '',
      light_value: '',
      temp: '',
    };
  }
  componentDidMount() {
    return fetch('https://iotserver192.herokuapp.com/getDefaultNoLogin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({
          humid_of_air: json.humid,
          humid_of_land: json.plant,
          light_value: json.light,
          temp: json.temp,
          isLoading: true,
        });
        return true;
      })
      .catch((err) => err);
  }
  save = (humid_of_air, humid_of_land, light_value, temp) => {
    fetch('https://iotserver192.herokuapp.com/setDefaultNoLogin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        humid: `${humid_of_air}`,
        plant: `${humid_of_land}`,
        temp: `${temp}`,
        light: `${light_value}`,
      }),
    })
      .then((response) => {
        if (response.status == 200) {
          Alert.alert(
            'Thông báo',
            'Điều chỉnh thành công',
            [
              {
                text: 'Cancel',
              },
              {text: 'OK'},
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Thông báo',
            'Bạn hãy điền đầy đủ thông tin',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {humid_of_air, humid_of_land, light_value, temp} = this.state;
    return this.state.isLoading == true ? (
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
              defaultValue={`${this.state.humid_of_air}`}
              onChangeText={(humid_of_air) => this.setState({humid_of_air})}
              value={humid_of_air}
              keyboardType="decimal-pad"></TextInput>
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
              defaultValue={`${this.state.humid_of_land}`}
              onChangeText={(humid_of_land) => this.setState({humid_of_land})}
              value={humid_of_land}
              keyboardType="decimal-pad"></TextInput>
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
              defaultValue={`${this.state.light_value}`}
              onChangeText={(light_value) => this.setState({light_value})}
              value={light_value}
              keyboardType="decimal-pad"></TextInput>
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
              defaultValue={`${this.state.temp}`}
              onChangeText={(temp) => this.setState({temp})}
              value={temp}
              keyboardType="decimal-pad"></TextInput>
          </Right>
        </ListItem>

        <TouchableOpacity
          onPress={() =>
            this.save(humid_of_air, humid_of_land, light_value, temp)
          }
          style={styles.button}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  }
}
