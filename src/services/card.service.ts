import axios, { AxiosResponse } from 'axios';

type TGetCardBalance = {
  balance: number;
};
const test = async () => {
  const axiosInstance = axios.create({ baseURL: '' });

  const response = await axiosInstance.patch<
    TGetCardBalance,
    AxiosResponse<TGetCardBalance>,
    { sum: number }
  >('/', { asdsad: 123 });

  const body = response.data;
};
