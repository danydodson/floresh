const Mongoose = require("mongoose")
const crypto = require('crypto')

const { Schema } = Mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== "email" ? false : true
    },
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
    default: "email",
  },
  googleId: {
    type: String,
    unique: null,
  },
  facebookId: {
    type: String,
    unique: null,
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: "ROLE_MEMBER",
    enum: ["ROLE_MEMBER", "ROLE_ADMIN", "ROLE_MERCHANT"],
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
})

// Before saving create salt & hash
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
}

UserSchema.methods.comparePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hash = hash
}

UserSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.hash
    delete ret.salt
    return ret
  }
})

UserSchema.set('toObject', {
  transform(doc, ret, options) {
    delete ret.hash
    delete ret.salt
    return ret
  }
})

module.exports = Mongoose.model("User", UserSchema)


