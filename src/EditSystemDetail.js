import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Alert,
} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import {ListItem, Left, Body, Right, Icon, Switch} from 'native-base';
import Mode from './component/Mode';
import {getDeviceDetail} from './redux/action';
import {connect} from 'react-redux';
import moment from 'moment';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
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
  textId: {
    fontSize: 16,
  },
  button: {
    width: screenWidth / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#74BFE4',
    marginBottom: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  list: {
    zIndex: 99,
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    borderColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 2,
  },
  listText: {
    color: '#E9E9E9',
  },
  viewList: {
    zIndex: 99,
  },
  mode: {
    flex: 0.2,
    flexDirection: 'row',
  },
});

class EditSystemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status_of_air: false,
      mode: '',
      value1: '',
      value2: '',
      schedule_on: '',
      schedule_off: '',
    };
  }
  componentDidMount() {
    return fetch('https://iotserver192.herokuapp.com/getSettingNoLogin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        device_name: `${this.props.navigation.state.params.name}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        let tempValue1, tempValue2;
        if (json.sensorValue1 == -1) {
          tempValue1 = 'default';
        } else {
          tempValue1 = json.sensorValue1;
        }
        if (json.sensorValue2 == -1) {
          tempValue2 = 'default';
        } else {
          tempValue2 = json.sensorValue2;
        }
        this.setState({
          mode: json.mode,
          value1: tempValue1,
          value2: tempValue2,
          isLoading: true,
          schedule_on: json.shedule_on,
          schedule_off: json.shedule_off,
        });
        return true;
      })
      .catch((err) => err);
  }

  toggleAir = () => {
    this.setState((prevState) => ({status_of_air: !prevState.status_of_air}));
  };

  chooseMode = (mode) => {
    this.setState({mode: mode});
    this.toggleAir();
  };

  getDevice = (index, name) => {
    this.props.getDeviceDetail(index, name);
    this.props.navigation.navigate('Statictical', {
      index: index,
      name: name,
    });
  };

  changeDevice = (mode, value1, value2, schedule_on, schedule_off) => {
    if (
      this.props.navigation.state.params.index == 1 ||
      this.props.navigation.state.params.index == 2 ||
      this.props.navigation.state.params.index == 4 ||
      this.props.navigation.state.params.index == 5
    ) {
      value2 = -1;
    } else {
      value2 = this.state.value2;
    }
    let name;
    if (this.props.navigation.state.params.index == 4) {
      name = 'Speaker';
    } else if (this.props.navigation.state.params.index == 5) {
      name = 'LightD';
    } else {
      name = this.props.navigation.state.params.name;
    }
    if (value1 == 'default') {
      value1 = -1;
    }
    if (value2 == 'default') {
      value2 = 1;
    }
    if (
      moment(schedule_on, 'HH:mm', true).isValid() == false ||
      moment(schedule_off, 'HH:mm', true).isValid() == false
    ) {
      Alert.alert(
        'Thông báo',
        'Bạn hãy nhập lại thời gian',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    }
    fetch('https://iotserver192.herokuapp.com/changeSettingNoLogin', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        device_name: `${name}`,
        mode: `${mode}`,
        sensorValue1: `${value1}`,
        sensorValue2: `${value2}`,
        schedule_on: `${schedule_on}`,
        schedule_off: `${schedule_off}`,
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
      .catch((err) => console.log('err', err));
  };

  changeValue1 = () => {
    if (this.state.value1 == 'default') {
      this.setState({
        value1: '',
      });
    }
  };
  changeValue2 = () => {
    if (this.state.value2 == 'default') {
      this.setState({
        value2: '',
      });
    }
  };

  chooseMode;

  render() {
    const nameTitle = [
      'HỆ THỐNG MÁY LẠNH',
      'HỆ THỐNG ĐÈN NHÀ',
      'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG',
      '',
      'HỆ THỐNG LOA',
      'HỆ THỐNG ĐÈN',
    ];
    const {index, name} = this.props.navigation.state.params;
    let drop = ['AUTO', 'ON', 'OFF', 'SCHEDULE'];
    return this.state.isLoading == true ? (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, minHeight: screenHeight}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.titleView}>
          <Text style={styles.textTitle}>{nameTitle[index]}</Text>
          <Text style={styles.textId}>{name}</Text>
        </View>
        {/* <View style={{flex: 0.5}}>{body}</View> */}
        {/* <Mode chooseMode={this.chooseMode} /> */}
        <View style={{flex: 0.5}}>
          <View style={styles.mode}>
            <Mode
              chooseMode={this.chooseMode}
              nameIcon={'ios-power'}
              nameType={'điều hoà'}
              status_of_air={this.state.status_of_air}
              toggleAir={this.toggleAir}
              mode={this.state.mode}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.changeDevice(mode, value1, value2, schedule_on, schedule_off)
            }>
            <Text style={styles.textButton}>Điều chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.getDevice(index, name)}>
            <Text style={styles.textButton}>Thống kê</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    ) : null;
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getDeviceDetail})(EditSystemDetail);

// let body =
//       index == 0 ? (
//         <View>
//           <ListItem icon style={{}}>
//             <Left>
//               <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
//             </Left>
//             <Body>
//               <Text>Bật/Tắt máy lạnh</Text>
//             </Body>
//             <Right>
//               {this.state.status_of_air == false ? (
//                 <>
//                   <Text>{this.state.mode}</Text>
//                   <Icon name="ios-arrow-down" onPress={this.toggleAir} />
//                 </>
//               ) : (
//                 <View style={{flexDirection: 'row'}}>
//                   {drop.map((option, key) => (
//                     <TouchableHighlight
//                       style={styles.list}
//                       underlayColor={'#ADADAD'}
//                       key={key}
//                       onPress={() => this.chooseMode(drop[key])}>
//                       <Text style={styles.listText}>{option}</Text>
//                     </TouchableHighlight>
//                   ))}
//                 </View>
//               )}
//             </Right>
//           </ListItem>
//           {this.state.mode == 'SCHEDULE' ? (
//             <>
//               <ListItem icon>
//                 <Left>
//                   <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh độ ngưỡng độ ẩm</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     defaultValue={`${this.state.value1}`}
//                     onFocus={this.changeValue1}
//                     onChangeText={(value1) => this.setState({value1})}
//                     value={this.state.value1}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="FontAwesome5"
//                     name="temperature-high"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh ngưỡng nhiệt độ</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     onFocus={this.changeValue2}
//                     defaultValue={`${this.state.value2}`}
//                     onChangeText={(value2) => this.setState({value2})}
//                     value={this.state.value2}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian bật</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_on}`}
//                     onChangeText={(schedule_on) => this.setState({schedule_on})}
//                     value={this.state.schedule_on}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian tắt</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_off}`}
//                     onChangeText={(schedule_off) =>
//                       this.setState({schedule_off})
//                     }
//                     value={this.state.schedule_off}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//             </>
//           ) : null}
//         </View>
//       ) : index == 1 ? (
//         <View>
//           <ListItem icon>
//             <Left>
//               <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
//             </Left>
//             <Body>
//               <Text>Bật/Tắt bóng đèn</Text>
//             </Body>
//             <Right>
//               {this.state.status_of_air == false ? (
//                 <>
//                   <Text>{this.state.mode}</Text>
//                   <Icon name="ios-arrow-down" onPress={this.toggleAir} />
//                 </>
//               ) : (
//                 <View style={{flexDirection: 'row'}}>
//                   {drop.map((option, key) => (
//                     <TouchableHighlight
//                       style={styles.list}
//                       underlayColor={'#ADADAD'}
//                       key={key}
//                       onPress={() => this.chooseMode(drop[key])}>
//                       <Text style={styles.listText}>{option}</Text>
//                     </TouchableHighlight>
//                   ))}
//                 </View>
//               )}
//             </Right>
//           </ListItem>
//           {this.state.mode == 'SCHEDULE' ? (
//             <>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     name={'lightbulb'}
//                     type="FontAwesome5"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh ngưỡng cường độ ánh sáng</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     onFocus={this.changeValue1}
//                     defaultValue={`${this.state.value1}`}
//                     onChangeText={(value1) => this.setState({value1})}
//                     value={this.state.value1}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian bật</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_on}`}
//                     onChangeText={(schedule_on) => this.setState({schedule_on})}
//                     value={this.state.schedule_on}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian tắt</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_off}`}
//                     onChangeText={(schedule_off) =>
//                       this.setState({schedule_off})
//                     }
//                     value={this.state.schedule_off}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//             </>
//           ) : null}
//         </View>
//       ) : index == 2 ? (
//         <View>
//           <ListItem icon>
//             <Left>
//               <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
//             </Left>
//             <Body>
//               <Text>Bật/Tắt motor</Text>
//             </Body>
//             <Right>
//               {this.state.status_of_air == false ? (
//                 <>
//                   <Text>{this.state.mode}</Text>
//                   <Icon name="ios-arrow-down" onPress={this.toggleAir} />
//                 </>
//               ) : (
//                 <View style={{flexDirection: 'row'}}>
//                   {drop.map((option, key) => (
//                     <TouchableHighlight
//                       style={styles.list}
//                       underlayColor={'#ADADAD'}
//                       key={key}
//                       onPress={() => this.chooseMode(drop[key])}>
//                       <Text style={styles.listText}>{option}</Text>
//                     </TouchableHighlight>
//                   ))}
//                 </View>
//               )}
//             </Right>
//           </ListItem>
//           {this.state.mode == 'SCHEDULE' ? (
//             <>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     name={'lightbulb'}
//                     type="FontAwesome5"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh ngưỡng độ ẩm</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     onFocus={this.changeValue1}
//                     defaultValue={`${this.state.value1}`}
//                     onChangeText={(value1) => this.setState({value1})}
//                     value={this.state.value1}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian bật</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_on}`}
//                     onChangeText={(schedule_on) => this.setState({schedule_on})}
//                     value={this.state.schedule_on}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian tắt</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_off}`}
//                     onChangeText={(schedule_off) =>
//                       this.setState({schedule_off})
//                     }
//                     value={this.state.schedule_off}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//             </>
//           ) : null}
//         </View>
//       ) : index == 4 ? (
//         <View>
//           <ListItem icon>
//             <Left>
//               <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
//             </Left>
//             <Body>
//               <Text>Bật/Tắt speaker</Text>
//             </Body>
//             <Right>
//               {this.state.status_of_air == false ? (
//                 <>
//                   <Text>{this.state.mode}</Text>
//                   <Icon name="ios-arrow-down" onPress={this.toggleAir} />
//                 </>
//               ) : (
//                 <View style={{flexDirection: 'row'}}>
//                   {drop.map((option, key) => (
//                     <TouchableHighlight
//                       style={styles.list}
//                       underlayColor={'#ADADAD'}
//                       key={key}
//                       onPress={() => this.chooseMode(drop[key])}>
//                       <Text style={styles.listText}>{option}</Text>
//                     </TouchableHighlight>
//                   ))}
//                 </View>
//               )}
//             </Right>
//           </ListItem>
//           {this.state.mode == 'SCHEDULE' ? (
//             <>
//               <ListItem icon>
//                 <Left>
//                   <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh ngưỡng độ ẩm</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     onFocus={this.changeValue1}
//                     defaultValue={`${this.state.value1}`}
//                     onChangeText={(value1) => this.setState({value1})}
//                     value={this.state.value1}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian bật</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_on}`}
//                     onChangeText={(schedule_on) => this.setState({schedule_on})}
//                     value={this.state.schedule_on}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian tắt</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_off}`}
//                     onChangeText={(schedule_off) =>
//                       this.setState({schedule_off})
//                     }
//                     value={this.state.schedule_off}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//             </>
//           ) : null}
//         </View>
//       ) : (
//         <View>
//           <ListItem icon>
//             <Left>
//               <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
//             </Left>
//             <Body>
//               <Text>Bật/Tắt lightD</Text>
//             </Body>
//             <Right>
//               {this.state.status_of_air == false ? (
//                 <>
//                   <Text>{this.state.mode}</Text>
//                   <Icon name="ios-arrow-down" onPress={this.toggleAir} />
//                 </>
//               ) : (
//                 <View style={{flexDirection: 'row'}}>
//                   {drop.map((option, key) => (
//                     <TouchableHighlight
//                       style={styles.list}
//                       underlayColor={'#ADADAD'}
//                       key={key}
//                       onPress={() => this.chooseMode(drop[key])}>
//                       <Text style={styles.listText}>{option}</Text>
//                     </TouchableHighlight>
//                   ))}
//                 </View>
//               )}
//             </Right>
//           </ListItem>
//           {this.state.mode == 'SCHEDULE' ? (
//             <>
//               <ListItem icon>
//                 <Left>
//                   <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
//                 </Left>
//                 <Body>
//                   <Text>Điều chỉnh ngưỡng cường độ ánh sáng</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     onFocus={this.changeValue1}
//                     defaultValue={`${this.state.value1}`}
//                     onChangeText={(value1) => this.setState({value1})}
//                     value={this.state.value1}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian bật</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_on}`}
//                     onChangeText={(schedule_on) => this.setState({schedule_on})}
//                     value={this.state.schedule_on}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//               <ListItem icon>
//                 <Left>
//                   <Icon
//                     type="AntDesign"
//                     name="clockcircle"
//                     style={{fontSize: 22}}
//                   />
//                 </Left>
//                 <Body>
//                   <Text>Thời gian tắt</Text>
//                 </Body>
//                 <Right>
//                   <TextInput
//                     style={{paddingLeft: 10}}
//                     defaultValue={`${this.state.schedule_off}`}
//                     onChangeText={(schedule_off) =>
//                       this.setState({schedule_off})
//                     }
//                     value={this.state.schedule_off}
//                     keyboardType="decimal-pad"></TextInput>
//                 </Right>
//               </ListItem>
//             </>
//           ) : null}
//         </View>
//       );
//     const {mode, value1, value2, schedule_on, schedule_off} = this.state;

//     return this.state.isLoading == true ? (
//       <ScrollView
//         style={{flex: 1}}
//         contentContainerStyle={{flex: 1, minHeight: screenHeight}}>
//         <HeaderComponent style={{flex: 0.2}} />
//         <View style={styles.titleView}>
//           <Text style={styles.textTitle}>{nameTitle[index]}</Text>
//           <Text style={styles.textId}>{name}</Text>
//         </View>
//         <View style={{flex: 0.5}}>{body}</View>
//         <View
//           style={{
//             flex: 0.3,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               this.changeDevice(mode, value1, value2, schedule_on, schedule_off)
//             }>
//             <Text style={styles.textButton}>Điều chỉnh</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => this.getDevice(index, name)}>
//             <Text style={styles.textButton}>Thống kê</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     ) : null;
