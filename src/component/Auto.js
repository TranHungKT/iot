import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
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
    // backgroundColor: 'blue',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  textInput: {
    marginTop: 4,
    alignItems: 'center',
    flex: 0.3,
    // backgroundColor: 'red',
    marginRight: 10,
  },
});

export default class Auto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue1: '',
    };
  }

  changeValue1 = (tempValue1) => {
    this.setState({tempValue1: tempValue1});
    this.props.getValue1(tempValue1);
  };

  render() {
    const {value1, value2} = this.props;
    return (
      <View style={styles.mainView}>
        <View style={styles.moduleView}>
          <View style={styles.titleView}>
            <Icon
              name={this.props.nameIcon1}
              type="Entypo"
              style={styles.icon}
            />
            <Text>Điều chỉnh ngưỡng {this.props.nameTitle1}</Text>
          </View>
          <View style={styles.textInput}>
            <TextInput
              containerStyle={{flexGrow: 1, alignItems: 'center'}}
              onFocus={this.props.changeValue1}
              onChangeText={(tempValue1) => this.changeValue1(tempValue1)}
              defaultValue={`${value1}`}
              value={this.state.tempValue1}
            />
          </View>
        </View>
      </View>
    );
  }
}
