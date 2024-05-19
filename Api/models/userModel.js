const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePitchure: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fprofile-image&psig=AOvVaw2MvkCM423KrDt5xuVAqM3a&ust=1716011899970000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICi2cyAlIYDFQAAAAAdAAAAABAE",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userdata = mongoose.model("userdata", userSchema);

module.exports = userdata;
