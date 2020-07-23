import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import {ListItem, Left, Body, Right, Icon} from 'native-base';
import Schedule from './component/Schedule';
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 0.1,
  },
  button: {
    // flex: 0.1,
    marginHorizontal: 40,
    marginTop: 150,
    backgroundColor: '#74BFE4',
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 40,
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
      schedule_on: '',
      schedule_off: '',
    };
  }
  componentDidMount() {
    return fetch('https://iotserver192.herokuapp.com/getDefault', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoading: true,
        });
        if (json.humid == -1) {
          this.setState({humid_of_air: 'default'});
        } else {
          this.setState({humid_of_air: json.humid});
        }
        if (json.plant == -1) {
          this.setState({humid_of_land: 'default'});
        } else {
          this.setState({humid_of_land: json.plant});
        }
        if (json.temp == -1) {
          this.setState({temp: 'default'});
        } else {
          this.setState({temp: json.temp});
        }
        if (json.light == -1) {
          this.setState({light_value: 'default'});
        } else {
          this.setState({light_value: json.light});
        }
      })
      .catch((err) => err);
  }
  save = (humid_of_air, humid_of_land, light_value, temp) => {
    if (humid_of_air == '') {
      humid_of_air = -1;
    }
    if (humid_of_land == '') {
      humid_of_land = -1;
    }
    if (light_value == '') {
      light_value = -1;
    }
    if (temp == '') {
      temp = -1;
    }
    fetch('https://iotserver192.herokuapp.com/setDefault', {
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
          Alert.alert('Thông báo', 'Điều chỉnh thành công', [{text: 'OK'}], {
            cancelable: false,
          });
        } else {
          Alert.alert(
            'Thông báo',
            'Bạn hãy điền đầy đủ thông tin',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      humid_of_air,
      humid_of_land,
      light_value,
      temp,
      schedule_on,
      schedule_off,
    } = this.state;
    return this.state.isLoading == true ? (
      <KeyboardAvoidingView style={{flex: 1}}>
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
              placeholder="default"
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
              placeholder="default"
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
              placeholder="default"
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
              placeholder="default"
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
      </KeyboardAvoidingView>
    ) : null;
  }
}
