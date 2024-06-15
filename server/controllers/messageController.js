const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username').populate('receiver','username')
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const postMessage = async (req, res) => {
  try {
    const { text,receiverId,senderId } = req.body;
   

    if (!senderId) {
      return res.status(400).json({ error: 'Sender ID is required' });
    }

    // Example: Saving the message to MongoDB using Mongoose
    const newMessage = new Message({
      text,
      receiver: receiverId, // Assuming receiverId is the ID of the user receiving the message
      sender: senderId, // Assuming req.user._id contains the ID of the sender (authenticated user)
    });

    await newMessage.save();

    res.status(201).json(newMessage); // Respond with the saved message
  } catch (err) {
    console.error('Error saving message:', err);
    res.status(500).json({ error: 'Server error' }); // Generic error response
  }
};

module.exports = { getMessages, postMessage };
