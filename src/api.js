/* eslint-disable import/prefer-default-export */
// export const API_URL = process.env.NODE_ENV === 'production' ? 'https://webarcade-server.herokuapp.com' : 'http://localhost:8080';
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const getAuthHeaders = () => {
  if (localStorage?.getItem('user')) {
    const accessToken = JSON.parse(localStorage.getItem('user'))?.accessToken;
    if (!accessToken) {
      console.log('Unable to find access token');
    }
    return {
      'x-access-token': accessToken,
    };
  }
  return {};
};
