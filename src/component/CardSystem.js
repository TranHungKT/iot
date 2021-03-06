import React, {Component} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Icon,
} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';

const screenWidth = Math.round(Dimensions.get('window').width);

const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  icon: {
    marginRight: 1,
  },
  CARD: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 4,
    width: screenWidth / 2 - 30,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default class CardSystem extends Component {
  render() {
    const nameIcon = [
      'ios-snow',
      'md-bulb',
      'md-color-fill',
      'ios-settings',
      'ios-volume-high',
      'md-bulb',
    ];
    const nameTitle = [
      'HỆ THỐNG MÁY LẠNH',
      'HỆ THỐNG ĐÈN NHÀ',
      'HỆ THỐNG TƯỚI CÂY TỰ ĐỘNG',
      'CÀI ĐẶT NGƯỜI DÙNG',
      'SPEAKER',
      'LIGHTD',
    ];
    const {data} = this.props;
    return (
      <Container>
        <Content>
          <Card style={styles.CARD}>
            <CardItem style={styles.card}>
              <Body
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name={nameIcon[data]} style={styles.icon} />
                <Text style={styles.text}>{nameTitle[data]}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
