import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
  mainView: {
    flex: 0.3,
  },
  moduleView: {
    flex: 0.5,
    flexDirection: 'row',
    marginLeft: 10,
  },
  titleView: {
    flexDirection: 'row',
    flex: 0.7,
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  textInput: {
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default class Auto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue1: '',
      tempValue2: '',
    };
  }

  changeValue1 = (tempValue1) => {
    this.setState({tempValue1: tempValue1});
    this.props.getValue1(tempValue1);
  };

  changeValue2 = (tempValue2) => {
    this.setState({tempValue2: tempValue2});
    if (tempValue2 == '') {
      tempValue2 = -1;
    }
    this.props.getValue2(tempValue2);
  };

  render() {
    const {value1, value2, index, mode} = this.props;
    let title1 =
      index == 0
        ? 'độ ẩm'
        : index == 1
        ? 'cường độ ánh sáng'
        : index == 2
        ? 'độ ẩm'
        : index == 4
        ? 'độ ẩm'
        : 'cường độ ánh sáng';
    let icon2 = 'thermometer';
    let icon =
      index == 0
        ? 'water'
        : index == 1
        ? 'light-bulb'
        : index == 2
        ? 'water'
        : index == 4
        ? 'water'
        : 'light-bulb';

    let title2 = 'nhiệt độ';
    let module2 =
      index == 0 ? (
        mode == 'AUTO' ? (
          <View style={styles.moduleView}>
            <View style={styles.titleView}>
              <Icon name={icon2} type="Entypo" style={styles.icon} />
              <Text>Điều chỉnh ngưỡng {title2}</Text>
            </View>
            <View style={styles.textInput}>
              <TextInput
                placeholder="default"
                defaultValue={`${this.props.value2}`}
                onFocus={this.props.changeValue2}
                onChangeText={(tempValue2) => this.changeValue2(tempValue2)}
                keyboardType="decimal-pad"
                style={{textDecorationLine: 'underline'}}></TextInput>
            </View>
          </View>
        ) : null
      ) : null;

    return (
      <View style={styles.mainView}>
        {mode == 'AUTO' ? (
          <View style={styles.moduleView}>
            <View style={styles.titleView}>
              <Icon name={icon} type="Entypo" style={styles.icon} />
              <Text>Điều chỉnh ngưỡng {title1}</Text>
            </View>
            <View style={styles.textInput}>
              <TextInput
                defaultValue={`${this.props.value1}`}
                placeholder="default"
                onFocus={this.props.changeValue1}
                onChangeText={(tempValue1) => this.changeValue1(tempValue1)}
                keyboardType="decimal-pad"
                style={{textDecorationLine: 'underline'}}></TextInput>
            </View>
          </View>
        ) : null}
        {module2}
      </View>
    );
  }
}
