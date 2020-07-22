import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import moment from 'moment';
import {LineChart, YAxis, Grid, XAxis} from 'react-native-svg-charts';
import {connect} from 'react-redux';
import {Spinner} from 'native-base';
const styles = StyleSheet.create({
  title: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reducer.loading !== false) {
      this.loadData();
    }
  }
  loadData = () => {
    const {name, index} = this.props.navigation.state.params;
    const {reducer} = this.props;

    let tempData;
    if (index == 0) {
      tempData = reducer.device_type_air_conditioner;
    } else if (index == 1) {
      tempData = reducer.device_type_light;
    } else if (index == 2) {
      tempData = reducer.device_type_motor;
    } else if (index == 4) {
      tempData = reducer.device_type_speaker;
    } else if (index == 5) {
      tempData = reducer.device_type_lightD;
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
    let humid1 = [];
    let intensity1 = [];
    if (data && data.length) {
      for (let i = 0; i < data.length; i++) {
        time.push(moment(data[i].time).format('L'));
        if (index == 0) {
          temp.push(data[i].temperature);
        } else if (index == 1) {
          intensity.push(data[i].intensity);
        } else if (index == 2) {
          humid.push(data[i].humid);
        } else if (index == 4) {
          humid1.push(data[i].humid);
        } else if (index == 5) {
          intensity1.push(data[i].intensity);
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
    } else if (index == 2) {
      this.setState({
        time: time,
        data: humid,
      });
    } else if (index == 4) {
      this.setState({
        time: time,
        data: humid1,
      });
    } else if (index == 5) {
      this.setState({
        time: time,
        data: intensity1,
      });
    }
  };

  render() {
    const {name, index} = this.props.navigation.state.params;
    const {reducer} = this.props;
    const contentInset = {top: 10, bottom: 10};
    const {data, time} = this.state;

    return this.props.reducer.loading == false ? (
      <View style={{flex: 1}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.title}>
          <Text style={styles.titleText}>Thống kê {name}</Text>
        </View>

        <View style={{height: 300, flexDirection: 'row'}}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: 'grey',
              fontSize: 8,
            }}
            style={{marginLeft: 4}}
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
          svg={{fontSize: 8, fill: 'black'}}
        />
      </View>
    ) : (
      <Spinner
        color="red"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  reducer: state.reducer,
});

export default connect(mapStateToProps, {})(Statictical);
