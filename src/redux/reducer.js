import {
  GET_DEVICE_TYPE_AIR,
  LOADING,
  GET_DEVICE_TYPE_MOTOR,
  GET_DEVICE_DETAIL,
  GET_DEVICE_TYPE_LIGHT,
} from './type';
import {TextComponent} from 'react-native';

const initialState = {
  device_type_air_conditioner: [],
  device_type_light: [],
  device_type_motor: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DEVICE_TYPE_AIR:
      return {
        ...state,
        device_type_air_conditioner: action.payload,
      };
    case GET_DEVICE_TYPE_MOTOR:
      return {
        ...state,
        device_type_motor: action.payload,
      };
    case GET_DEVICE_DETAIL:
      let index = action.payload.index;
      let tempState;
      if (index == 0) {
        tempState = state.device_type_air_conditioner;
      } else if (index == 1) {
        tempState = state.device_type_light;
      } else {
        tempState = state.device_type_motor;
      }
      let device_name = action.payload.device_name;
      let json = action.payload.json;
      for (let i = 0; i < tempState.length; i++) {
        if (device_name == tempState[i].device_id) {
          tempState[i] = {...tempState[i], ...json};
        } else {
          continue;
        }
      }
      if (index == 0) {
        state.device_type_air_conditioner = tempState;
      } else if (index == 1) {
        state.device_type_light = tempState;
      } else {
        state.device_type_motor = tempState;
      }
      return {
        ...state,
      };
    case GET_DEVICE_TYPE_LIGHT:
      return {
        ...state,
        device_type_light: action.payload,
      };
    default:
      return state;
  }
}
