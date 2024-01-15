import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from './../consts/localstorage';

export const $api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    Authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
  },
});
