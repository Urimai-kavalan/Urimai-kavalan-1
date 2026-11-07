require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const app = require('./app').default;

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Urimai Kaavalan API is running on port ${PORT}`);
});