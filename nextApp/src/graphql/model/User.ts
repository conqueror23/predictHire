import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
  companyId: String,
});

const UserModel = model('User', userSchema);
export default UserModel 