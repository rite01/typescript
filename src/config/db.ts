import { connect } from 'mongoose';

export default () => {
  try {
    connect(`${process.env.DB}`);
    console.log('Connection SuccessFully............');
  } catch (error) {
    console.log(error, 'Could not connect to database...........', error);
  }
};
