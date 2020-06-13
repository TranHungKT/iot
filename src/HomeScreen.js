import React, { Component, isValidElement } from 'react';
import { View, Text, StyleSheet, StatusBar ,TouchableOpacity} from 'react-native';
import {Card, CardItem, Icon} from 'native-base';
import HeaderComponent from './component/HeaderComponent'
import SystemLightAndAir from './component/SystemLightAndAir'


const styles = StyleSheet.create({
  header: {
    flex: 0.2
  },
  body:{
    flex: 0.9
  },
  cards: {
      flex: 0.5,
      flexDirection: 'row',
    
  }
})

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  moveToDetails = (index) => {
      this.props.navigation.navigate('SystemDetail', {
          index: index
      })
  } 

  render() {
    return (
      <View style = {{flex : 1}}>
          <HeaderComponent style = {styles.header}/>
          <View style = {styles.body}>
                <View style = {styles.cards}>
                 
                        <TouchableOpacity onPress = {() => {this.moveToDetails(0)}} style = {{flex: 0.5}}>
                            <SystemLightAndAir data = {0} />
                        </TouchableOpacity>
              
                    <TouchableOpacity onPress = {() => {this.moveToDetails(1)}} style = {{flex: 0.5}}>
                            <SystemLightAndAir data = {1} />
                        </TouchableOpacity>
                </View>
                <View style = {styles.cards}>
                <TouchableOpacity onPress = {() => {this.moveToDetails(2)}} style = {{flex: 0.5}}>
                            <SystemLightAndAir data = {2} />
                        </TouchableOpacity>
                    {/* <View style={{flex: 0.5}}>
                        <SystemLightAndAir data = {1}/>
                    </View> */}
                </View>

          </View>
      </View>
    );
  }
}
