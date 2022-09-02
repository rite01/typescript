import app from './src/app';

const port = process.env.PORT;
app.listen(port, () => console.log(`listen on port ${port}`));
