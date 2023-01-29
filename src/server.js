/* eslint-disable import/no-extraneous-dependencies */
// imports
const express = require('express');
const cors = require('cors');
const path = require('path');

// create server to server website code in production
const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
