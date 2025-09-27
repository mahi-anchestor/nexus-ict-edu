const express = require('express');
const Message = require('../models/Message');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get chat messages for a room
router.get('/messages/:roomId', auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { limit = 50, page = 1 } = req.query;

    const messages = await Message.find({ chatRoom: roomId })
      .populate('sender', 'fullName username')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get chat rooms for user
router.get('/rooms', auth, async (req, res) => {
  try {
    // Get distinct chat rooms where user has sent messages
    const rooms = await Message.distinct('chatRoom', {
      $or: [
        { sender: req.user._id },
        { recipients: req.user._id }
      ]
    });

    const roomsWithLastMessage = await Promise.all(
      rooms.map(async (room) => {
        const lastMessage = await Message.findOne({ chatRoom: room })
          .populate('sender', 'fullName username')
          .sort({ createdAt: -1 });

        return {
          roomId: room,
          lastMessage,
          unreadCount: await Message.countDocuments({
            chatRoom: room,
            sender: { $ne: req.user._id },
            'readBy.user': { $ne: req.user._id }
          })
        };
      })
    );

    res.json({ rooms: roomsWithLastMessage });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark messages as read
router.put('/messages/:roomId/read', auth, async (req, res) => {
  try {
    const { roomId } = req.params;

    await Message.updateMany(
      {
        chatRoom: roomId,
        sender: { $ne: req.user._id },
        'readBy.user': { $ne: req.user._id }
      },
      {
        $push: {
          readBy: {
            user: req.user._id,
            readAt: new Date()
          }
        }
      }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;