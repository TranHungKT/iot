import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#74BFE4',
    height: 90,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    top: 50,
  },
});

export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.header}>
          <Text style={styles.text}> IoT </Text>
        </View>
      </>
    );
  }
}
