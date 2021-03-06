import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Icon} from 'native-base';

export default class Mode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: '',
    };
  }
  chooseMode = (option) => () => {
    this.setState({mode: `${option}`});
    this.props.chooseMode(option);
  };
  render() {
    const options = ['ON', 'OFF', 'AUTO', 'SCHEDULE'];

    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 0.7,
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Icon
            name={this.props.nameIcon}
            type="Ionicons"
            style={styles.icon}
          />
          <Text style={styles.text}>Chọn chế độ</Text>
          {this.props.status_of_air == true ? (
            <View style={styles.viewOption}>
              {options.map((option, key) => (
                <TouchableHighlight
                  key={key}
                  style={styles.options}
                  onPress={this.chooseMode(option)}
                  underlayColor="#DDDDDD">
                  <Text style={styles.textOption}>{option}</Text>
                </TouchableHighlight>
              ))}
            </View>
          ) : (
            <View style={{flex: 0.4, flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.modeView}
                onPress={this.props.toggleAir}>
                <Text style={{alignSelf: 'flex-end'}}>{this.props.mode}</Text>
              </TouchableOpacity>
              <Icon
                name={'ios-arrow-down'}
                onPress={this.props.toggleAir}
                style={{paddingHorizontal: 10, position: 'absolute', right: 10}}
              />
            </View>
          )}
        </View>

        <View style={styles.border}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    borderWidth: 1,
    padding: 5,
    marginHorizontal: 5,
    borderColor: '#AAAAAA',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 2,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    zIndex: 99,
  },
  textOption: {
    fontSize: 10,
    alignItems: 'flex-start',
  },
  text: {
    flex: 0.65,
    fontSize: 14,
    alignSelf: 'flex-start',
  },
  icon: {
    flex: 0.1,
    marginLeft: 10,
  },
  viewOption: {
    flex: 0.4,
  },
  modeView: {
    paddingHorizontal: 10,
    position: 'absolute',
    right: 40,
  },
  border: {
    flex: 0.1,
    borderTopWidth: 1,
    marginHorizontal: 20,
    marginLeft: 45,
  },
});
