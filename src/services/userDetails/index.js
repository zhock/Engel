import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { config } from '../config'

const getData = ({ data }) => data

export const getUserDetails = async (page, per_page) => {
  const dataUser = await AsyncStorage.getItem('@usuario');
  const info = JSON.parse(dataUser);
  const { userGit } = info
  return axios.get(
    `${config.BASE_API}/users/${userGit}/repos?page=${page}&per_page=${per_page}`
  ).then(getData)
}