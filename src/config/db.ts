import { connect } from 'mongoose';

export default () => {
  const connectionParams: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    connect(`${process.env.DB}`, connectionParams);
    console.log('Connection SuccessFully............');
  } catch (error) {
    console.log(error, 'Could not connect to database...........', error);
  }
};
