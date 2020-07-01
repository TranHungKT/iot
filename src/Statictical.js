import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import moment from 'moment';
import {LineChart, YAxis, Grid, XAxis} from 'react-native-svg-charts';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
  title: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
  },
  loadData: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Statictical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      time: [],
    };
  }
  loadData = () => {
    const {name, index} = this.props.navigation.state.params;
    const {reducer} = this.props;

    let tempData;
    if (index == 0) {
      tempData = reducer.device_type_air_conditioner;
    } else if (index == 1) {
      tempData = reducer.device_type_light;
    } else {
      tempData = reducer.device_type_motor;
    }
    let data;

    if (tempData && tempData.length) {
      for (let i = 0; i < tempData.length; i++) {
        if (name == tempData[i].device_id) {
          data = tempData[i].data;
        } else {
          continue;
        }
      }
    }

    let time = [];
    let temp = [];
    let intensity = [];
    let humid = [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        time.push(moment(data[i].time).format('L'));
        if (index == 0) {
          temp.push(data[i].temperature);
        } else if (index == 1) {
          intensity.push(data[i].intensity);
        } else {
          humid.push(data[i].humid);
        }
      }
    }
    if (index == 0) {
      this.setState({
        time: time,
        data: temp,
      });
    } else if (index == 1) {
      this.setState({
        time: time,
        data: intensity,
      });
    } else {
      this.setState({
        time: time,
        data: humid,
      });
    }
    console.log('time', time);
  };

  render() {
    const {name, index} = this.props.navigation.state.params;
    const {reducer} = this.props;
    const contentInset = {top: 10, bottom: 10};
    const {data, time} = this.state;

    return (
      <View style={{flex: 1}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.title}>
          <Text style={styles.titleText}>Thống kê {name}</Text>
        </View>
        <TouchableOpacity onPress={this.loadData} style={styles.loadData}>
          <Text>LOAD DATA</Text>
        </TouchableOpacity>
        <View style={{height: 300, flexDirection: 'row'}}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
          />
          <LineChart
            style={{flex: 1, marginLeft: 10}}
            data={data}
            svg={{stroke: 'rgb(134, 65, 244)', strokeWidth: 2.5}}
            contentInset={contentInset}>
            <Grid />
          </LineChart>
        </View>
        <XAxis
          style={{marginLeft: 10}}
          data={this.state.time}
          formatLabel={(value, index) => time[index]}
          contentInset={{left: 30, right: 30}}
          svg={{fontSize: 10, fill: 'black'}}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {})(Statictical);
