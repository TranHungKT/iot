import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import Mode from './component/Mode';
import Schedule from './component/Schedule';
import {getDeviceDetail} from './redux/action';
import {connect} from 'react-redux';
import moment from 'moment';
import Auto from './component/Auto';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

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
    };
  }
  componentDidMount() {
    return fetch('https://iotserver192.herokuapp.com/getSetting', {
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
    if (value1 == 'default' || value1 == '') {
      value1 = -1;
    }
    if (value2 == 'default' || value2 == '') {
      value2 = -1;
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
    fetch('https://iotserver192.herokuapp.com/changeSetting', {
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
          Alert.alert('Thông báo', 'Điều chỉnh thành công', [{text: 'OK'}], {
            cancelable: false,
          });
        } else {
          Alert.alert(
            'Thông báo',
            'Bạn hãy điền đầy đủ thông tin',
            [
              {
                style: 'cancel',
              },
              {text: 'OK'},
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
  getValue1 = (tempvalue1) => {
    this.setState({value1: tempvalue1});
  };
  getValue2 = (tempValue2) => {
    this.setState({value2: tempValue2});
  };

  getScheduleOn = (schedule_on) => {
    this.setState({schedule_on: schedule_on});
  };
  getScheduleOff = (schedule_off) => {
    this.setState({schedule_off: schedule_off});
  };

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
    const {mode, value1, value2, schedule_on, schedule_off} = this.state;
    let tempMode =
      mode == 'AUTO' ? (
        <Auto
          value1={value1}
          value2={value2}
          changeValue1={this.changeValue1}
          changeValue2={this.changeValue2}
          getValue1={this.getValue1}
          index={index}
          mode={mode}
          getValue2={this.getValue2}
        />
      ) : mode == 'SCHEDULE' ? (
        <Schedule
          mode={mode}
          schedule_on={schedule_on}
          schedule_off={schedule_off}
          getScheduleOn={this.getScheduleOn}
          getScheduleOff={this.getScheduleOff}
        />
      ) : null;
    return this.state.isLoading == true ? (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, minHeight: screenHeight}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.titleView}>
          <Text style={styles.textTitle}>{nameTitle[index]}</Text>
          <Text style={styles.textId}>{name}</Text>
        </View>
        <View style={{flex: 0.5}}>
          <View style={[styles.mode]}>
            <Mode
              chooseMode={this.chooseMode}
              nameIcon={'ios-power'}
              status_of_air={this.state.status_of_air}
              toggleAir={this.toggleAir}
              mode={this.state.mode}
            />
          </View>
          {tempMode}
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
export default connect(mapStateToProps, {getDeviceDetail})(EditSystemDetail);
