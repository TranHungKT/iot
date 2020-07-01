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
} from 'react-native';
import HeaderComponent from './component/HeaderComponent';
import {ListItem, Left, Body, Right, Icon, Switch} from 'native-base';
import {getDeviceDetail} from './redux/action';
import {connect} from 'react-redux';

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
    paddingTop: 2,
    paddingLeft: 5,
    paddingBottom: 7,
    flexDirection: 'column',
    borderColor: '#AAAAAA',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    borderRadius: 2,
  },
  listText: {
    color: '#E9E9E9',
  },
  viewList: {
    zIndex: 99,
  },
});

class EditSystemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status_of_air: false,
      mode: '',
      temp: '',
      humid: '',
      intensity: '',
      time: '',
    };
  }
  toggleAir = () => {
    this.setState((prevState) => ({status_of_air: !prevState.status_of_air}));
  };

  chooseMode = (mode) => {
    this.setState({mode: mode});
    this.toggleAir();
    console.log('mode', mode);
  };

  getDevice = (index, name) => () => {
    this.props.getDeviceDetail(index, name);
  };
  render() {
    const nameTitle = [
      'HỆ THỐNG MÁY LẠNH',
      'HỆ THỐNG ĐÈN NHÀ',
      'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG',
    ];
    const {index, name} = this.props.navigation.state.params;
    let drop = ['auto', 'on', 'off', 'schedule'];
    let body =
      index == 0 ? (
        <View>
          <ListItem icon>
            <Left>
              <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
            </Left>
            <Body>
              <Text>Bật/Tắt máy lạnh</Text>
            </Body>
            <Right>
              {this.state.status_of_air == false ? (
                <>
                  <Text>{this.state.mode}</Text>
                  <Icon name="ios-arrow-down" onPress={this.toggleAir} />
                </>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  {drop.map((option, key) => (
                    <TouchableHighlight
                      style={styles.list}
                      underlayColor={'#ADADAD'}
                      key={key}
                      onPress={() => this.chooseMode(drop[key])}>
                      <Text style={styles.listText}>{option}</Text>
                    </TouchableHighlight>
                  ))}
                </View>
              )}
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name={'water'} type="Entypo" style={{fontSize: 22}} />
            </Left>
            <Body>
              <Text>Điều chỉnh độ ẩm</Text>
            </Body>
            <Right>
              <TextInput
                placeholder="Type here"
                onChangeText={(humid) => this.setState({humid})}
                value={this.state.humid}></TextInput>
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
              <Text>Nhiệt độ</Text>
            </Body>
            <Right>
              <TextInput
                style={{paddingLeft: 10}}
                placeholder="Type here"
                onChangeText={(temp) => this.setState({temp})}
                value={this.state.temp}></TextInput>
            </Right>
          </ListItem>
        </View>
      ) : index == 1 ? (
        <View>
          <ListItem icon>
            <Left>
              <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
            </Left>
            <Body>
              <Text>Bật/Tắt bóng đèn</Text>
            </Body>
            <Right>
              {this.state.status_of_air == false ? (
                <>
                  <Text>{this.state.mode}</Text>
                  <Icon name="ios-arrow-down" onPress={this.toggleAir} />
                </>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  {drop.map((option, key) => (
                    <TouchableHighlight
                      style={styles.list}
                      underlayColor={'#ADADAD'}
                      key={key}
                      onPress={() => this.chooseMode(drop[key])}>
                      <Text style={styles.listText}>{option}</Text>
                    </TouchableHighlight>
                  ))}
                </View>
              )}
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
              <Text>cường độ bóng đèn</Text>
            </Body>
            <Right>
              <TextInput
                placeholder="Type here"
                onChangeText={(intensity) => this.setState({intensity})}
                value={this.state.intensity}></TextInput>
            </Right>
          </ListItem>
        </View>
      ) : (
        <View>
          <ListItem icon>
            <Left>
              <Icon name={'ios-power'} type="Ionicons" style={{fontSize: 22}} />
            </Left>
            <Body>
              <Text>Bật/Tắt motor</Text>
            </Body>
            <Right>
              {this.state.status_of_air == false ? (
                <>
                  <Text>{this.state.mode}</Text>
                  <Icon name="ios-arrow-down" onPress={this.toggleAir} />
                </>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  {drop.map((option, key) => (
                    <TouchableHighlight
                      style={styles.list}
                      underlayColor={'#ADADAD'}
                      key={key}
                      onPress={() => this.chooseMode(drop[key])}>
                      <Text style={styles.listText}>{option}</Text>
                    </TouchableHighlight>
                  ))}
                </View>
              )}
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
              <Text>Công suất</Text>
            </Body>
            <Right>
              <TextInput
                placeholder="Type here"
                onChangeText={(intensity) => this.setState({intensity})}
                value={this.state.intensity}></TextInput>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name={'ios-time'} style={{fontSize: 22}} />
            </Left>
            <Body>
              <Text>Thời gian vận hành</Text>
            </Body>
            <Right>
              <TextInput
                placeholder="Type here"
                onChangeText={(time) => this.setState({time})}
                value={this.state.time}></TextInput>
            </Right>
          </ListItem>
        </View>
      );

    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flex: 1, minHeight: screenHeight}}>
        <HeaderComponent style={{flex: 0.2}} />
        <View style={styles.titleView}>
          <Text style={styles.textTitle}>{nameTitle[index]}</Text>
          <Text style={styles.textId}>{name}</Text>
        </View>
        <View style={{flex: 0.5}}>{body}</View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Điều chỉnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.getDevice(index, name)}>
            <Text style={styles.textButton}>Thống kê</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {getDeviceDetail})(EditSystemDetail);
