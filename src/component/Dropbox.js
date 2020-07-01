import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class dropbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let drop = ['auto', 'on', 'off', 'schedule'];
    return (
      <View>
        <Text> dropbox </Text>
      </View>
    );
  }
}
