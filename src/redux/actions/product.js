import {  DELETE_USER, GET_USER, UPDATE_CHECK, UPDATE_USER } from "../actionTypes";

export const getUsers = () => {
  return {
    type: GET_USER,
  };
};


export const deleteUser = (payload) => {
  return {
    type: DELETE_USER,
    payload,
  };
};
export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload,
  };
};
export const updateCheck = (payload) => {
  return {
    type: UPDATE_CHECK,
    payload,
  };
};

