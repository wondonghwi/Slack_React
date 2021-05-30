import axios, { AxiosResponse } from 'axios';

const fetcher = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default fetcher;
