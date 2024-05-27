const mongoose = require("mongoose");

const ChatUserSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatUser = mongoose.model("ChatUser", ChatUserSchema);

module.exports.postMessage = (req, res) => {
  const { sender, receiver, text } = req.body;

  const chatMessage = new ChatUser({
    sender,
    receiver,
    text,
  });

  chatMessage
    .save()
    .then(() => {
      res.status(201).json({ message: "Message sent successfully." });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error." });
    });
};

module.exports.getAllMessages = (req, res) => {
  ChatUser.find()
    .sort({ createdAt: 1 })
    .then((messages) => {
      res.status(200).json({ messages });
    })
    .catch((err) => {
      res.status(500).json({ message: "Server error." });
    });
};
