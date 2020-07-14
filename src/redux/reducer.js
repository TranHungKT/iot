import {
  GET_DEVICE_TYPE_AIR,
  LOADING,
  GET_DEVICE_TYPE_MOTOR,
  GET_DEVICE_DETAIL,
  GET_DEVICE_TYPE_LIGHT,
  GET_DEVICE_TYPE_SPEAKER,
  GET_DEVICE_TYPE_LIGHTD,
<<<<<<< HEAD
  GET_SYSTEM_DETAIL,
=======
>>>>>>> feature
} from './type';
import {TextComponent} from 'react-native';

const initialState = {
  device_type_air_conditioner: [],
  device_type_light: [],
  device_type_motor: [],
  device_type_speaker: [],
  device_type_lightD: [],
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
      } else if (index == 2) {
        tempState = state.device_type_motor;
      } else if (index == 4) {
        tempState = state.device_type_speaker;
      } else if (index == 5) {
        tempState = state.device_type_lightD;
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
      } else if (index == 2) {
        state.device_type_motor = tempState;
      } else if (index == 4) {
        state.device_type_speaker = tempState;
      } else if (index == 5) {
        state.device_type_lightD = tempState;
      }
      return {
        ...state,
      };
    case GET_DEVICE_TYPE_LIGHT:
      return {
        ...state,
        device_type_light: action.payload,
      };
    case GET_DEVICE_TYPE_SPEAKER:
      return {
        ...state,
        device_type_speaker: action.payload,
      };
    case GET_DEVICE_TYPE_LIGHTD:
      return {
        ...state,
        device_type_lightD: action.payload,
      };
<<<<<<< HEAD
    // case GET_SYSTEM_DETAIL:
    //   return {
    //     ...state,
    //   };
=======
>>>>>>> feature
    default:
      return state;
  }
}
