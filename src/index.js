const app = require('./app');
const { PORT } = require('./constants/constants');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
