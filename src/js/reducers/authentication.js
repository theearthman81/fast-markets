import {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  UNAUTH_REQUEST,
  UNAUTH_SUCCESS,
  UNAUTH_FAILURE,
  ACCOUNT_UPDATE
} from '../actions/types';
import { Map } from 'immutable';

export default (state={ isAuthenticated: false }, { payload, type }) => {
  switch (type) {
    case AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        session: payload,
        error: null,
      };
    case UNAUTH_SUCCESS:
    case UNAUTH_FAILURE:
      return {
        isAuthenticated: false,
        session: null,
        error: null,
      };
    case AUTH_FAILURE:
      return {
        isAuthenticated: false,
        session: null,
        error: payload || 'generic error',
      };
    case ACCOUNT_UPDATE:
    return {
      ...state,
      session: { ...state.session, ...payload},
    };
    default:
      return state;
  }
}

export const isAuthenticated = ({ isAuthenticated }) => {
  return !!isAuthenticated;
}
