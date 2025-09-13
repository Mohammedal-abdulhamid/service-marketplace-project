const { Message, User } = require('../models');

const sendMessage = async (req, res) => {
  try {
    const { receiver_id, content, service_id } = req.body;
    const sender_id = req.user.user_id;

    const message = await Message.create({
      sender_id,
      receiver_id,
      content,
      service_id
    });

    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMessagesByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const messages = await Message.findAll({
      where: { service_id: serviceId },
      include: [{ model: User, as: 'sender', attributes: ['full_name'] }],
      order: [['sent_at', 'ASC']]
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage, getMessagesByService };
