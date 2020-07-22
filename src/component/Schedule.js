import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
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
    justifyContent: 'center',
    flex: 0.3,
    marginRight: 10,
  },
});

export default class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp_schedule_on: Date(),
      temp_schedule_off: Date(),
      isVisibleScheduleOn: false,
      isVisibleScheduleOff: false,
    };
  }
  changeScheduleOn = () => {
    this.setState((prevState) => ({
      isVisibleScheduleOn: !prevState.isVisibleScheduleOn,
    }));
  };
  changeScheduleOff = () => {
    this.setState((prevState) => ({
      isVisibleScheduleOff: !prevState.isVisibleScheduleOff,
    }));
  };

  choseScheduleOn = (temp_schedule_on) => {
    this.setState({
      temp_schedule_on: moment(temp_schedule_on).format('HH:mm'),
    });
    this.changeScheduleOn();
    this.props.getScheduleOn(this.state.temp_schedule_on);
  };
  choseScheduleOff = (temp_schedule_off) => {
    this.setState({
      temp_schedule_off: moment(temp_schedule_off).format('HH:mm'),
    });
    this.changeScheduleOff();
    this.props.getScheduleOff(this.state.temp_schedule_off);
  };
  render() {
    const {
      mode,
      schedule_on,
      schedule_off,
      getScheduleOn,
      getScheduleOff,
    } = this.props;
    const {
      isVisibleScheduleOn,
      isVisibleScheduleOff,
      temp_schedule_on,
      temp_schedule_off,
    } = this.state;
    return (
      <View style={styles.mainView}>
        {mode == 'SCHEDULE' ? (
          <>
            <View style={styles.moduleView}>
              <View style={styles.titleView}>
                <Icon name={'stopwatch'} type="Entypo" style={styles.icon} />
                <Text>Thời gian bật</Text>
              </View>
              <View style={styles.textInput}>
                <Text
                  onPress={this.changeScheduleOn}
                  style={{textDecorationLine: 'underline'}}>
                  {schedule_on}
                </Text>
                <DateTimePickerModal
                  isVisible={isVisibleScheduleOn}
                  mode="time"
                  onConfirm={this.choseScheduleOn}
                  onCancel={this.changeScheduleOn}
                />
              </View>
            </View>
            <View style={styles.moduleView}>
              <View style={styles.titleView}>
                <Icon name={'stopwatch'} type="Entypo" style={styles.icon} />
                <Text>Thời gian tắt</Text>
              </View>
              <View style={styles.textInput}>
                <Text
                  onPress={this.changeScheduleOff}
                  style={{textDecorationLine: 'underline'}}>
                  {schedule_off}
                </Text>
                <DateTimePickerModal
                  isVisible={isVisibleScheduleOff}
                  mode="time"
                  onConfirm={this.choseScheduleOff}
                  onCancel={this.changeScheduleOff}
                />
              </View>
            </View>
          </>
        ) : null}
      </View>
    );
  }
}
