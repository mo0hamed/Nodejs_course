import mongoose from 'mongoose'

 const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
  },
  lastName: {
      type: String,
      required: true,
  },
  username: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      unique: true,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  recoveryEmail: {
      type: String,
  },
  DOB: {
      type: Date,
      required: true,
  },
  mobileNumber: {
      type: String,
      unique: true,
      required: true,
  },
  role: {
      type: String,
      enum: ['User', 'Company_HR'],
      default: 'User',
  },
  status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline',
  }
  //i remove AddedBy cause it make error when i test in add job
}, {
  timestamps: true,
})

userSchema.pre('save', function (next) {
  this.username = this.firstName + this.lastName;
  next()
})

const User = mongoose.model('User', userSchema,'User')
export default User