/* eslint-disable import/prefer-default-export */
// export const API_URL = process.env.NODE_ENV === 'production' ? 'https://webarcade-server.herokuapp.com' : 'http://localhost:8080';
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
