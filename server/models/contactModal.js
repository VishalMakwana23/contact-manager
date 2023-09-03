const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    avatar: {
      type: String,
      required: [true, "Please add the image url"],
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    description: {
      type: String,
    },
  },
  {
    timeStamp: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
