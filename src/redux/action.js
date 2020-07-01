import {
  GET_DEVICE_TYPE_AIR,
  LOADING,
  GET_DEVICE_DETAIL,
  GET_DEVICE_TYPE_MOTOR,
  GET_DEVICE_TYPE_LIGHT,
} from './type';

export const getDeviceTypeAir = () => (dispatch) => {
  // dispatch({type: LOADING});
  return fetch('https://iotserver192.herokuapp.com/getStatusNoLogin', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({device_type: 'AIR_CONDITIONER', device_name: ''}),
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({type: GET_DEVICE_TYPE_AIR, payload: json});
      return true;
    })
    .catch((err) => console.log(err));
};

export const getDeviceTypeMotor = () => (dispatch) => {
  return fetch('https://iotserver192.herokuapp.com/getStatusNoLogin', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({device_type: 'MOTOR', device_name: ''}),
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({type: GET_DEVICE_TYPE_MOTOR, payload: json});
      return true;
    })
    .catch((err) => console.log(err));
};

export const getDeviceTypeLight = () => (dispatch) => {
  return fetch('https://iotserver192.herokuapp.com/getStatusNoLogin', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({device_type: 'LIGHT_BULB', device_name: ''}),
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch({type: GET_DEVICE_TYPE_LIGHT, payload: json});
      return true;
    })
    .catch((err) => console.log(err));
};

export const getDeviceDetail = (index, device_name) => (dispatch) => {
  let device_type = '';
  if (index == 0) {
    device_type = 'AIR_CONDITIONER';
  } else if (index == 1) {
    device_type = 'LIGHT_BULB';
  } else {
    device_type = 'MOTOR';
  }
  return fetch('https://iotserver192.herokuapp.com/getStatusNoLogin', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      device_type: `${device_type}`,
      device_name: `${device_name}`,
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      const data = {index, json, device_name};
      dispatch({type: GET_DEVICE_DETAIL, payload: data});
      return true;
    })
    .catch((err) => console.log(err));
};
