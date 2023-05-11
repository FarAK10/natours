/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://farak10-natours.onrender.com/api/v1/users/login',
      withCredentials: true,
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const signUp = async data => {
  console.log('signup', data);
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://farak10-natours.onrender.com/api/v1/users/signup',
      withCredentials: true,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'SignUp successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://farak10-natours.onrender.com/api/v1/users/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
