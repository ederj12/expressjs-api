const app = require('./app');
const port = process.env.PORT | 3001;

init();

async function init() {
  try {
    app.listen(port, () => {
      console.log(`API listening ${port}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
