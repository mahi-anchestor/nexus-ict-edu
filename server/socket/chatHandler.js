const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return next(new Error('User not found'));
    }

    socket.user = user;
    next();
  } catch (error) {
    console.error('Socket auth error:', error);
    next(new Error('Authentication error'));
  }
};

const chatHandler = (io) => {
  io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log(`User ${socket.user.username} connected`);

    // Join user to their personal room and role-based rooms
    socket.join(`user_${socket.user._id}`);
    socket.join(`role_${socket.user.role}`);
    
    if (socket.user.classLevel) {
      socket.join(`class_${socket.user.classLevel}`);
    }

    // Handle joining specific chat rooms
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.user.username} joined room ${roomId}`);
    });

    // Handle leaving specific chat rooms
    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.user.username} left room ${roomId}`);
    });

    // Handle sending messages
    socket.on('send_message', async (data) => {
      try {
        const { content, chatRoom, messageType = 'text', recipients = [] } = data;

        // Create message in database
        const message = new Message({
          sender: socket.user._id,
          content,
          chatRoom,
          messageType,
          isGroupMessage: recipients.length === 0,
          recipients: recipients.length > 0 ? recipients : []
        });

        await message.save();

        // Populate sender info
        await message.populate('sender', 'fullName username');

        // Emit to room or specific recipients
        if (recipients.length > 0) {
          // Private message
          recipients.forEach(recipientId => {
            socket.to(`user_${recipientId}`).emit('new_message', message);
          });
        } else {
          // Group message
          socket.to(chatRoom).emit('new_message', message);
        }

        // Send back to sender for confirmation
        socket.emit('message_sent', message);

      } catch (error) {
        console.error('Send message error:', error);
        socket.emit('message_error', { error: 'Failed to send message' });
      }
    });

    // Handle typing indicators
    socket.on('typing_start', ({ roomId }) => {
      socket.to(roomId).emit('user_typing', {
        userId: socket.user._id,
        username: socket.user.username,
        isTyping: true
      });
    });

    socket.on('typing_stop', ({ roomId }) => {
      socket.to(roomId).emit('user_typing', {
        userId: socket.user._id,
        username: socket.user.username,
        isTyping: false
      });
    });

    // Handle message read receipts
    socket.on('mark_message_read', async ({ messageId }) => {
      try {
        await Message.findByIdAndUpdate(messageId, {
          $push: {
            readBy: {
              user: socket.user._id,
              readAt: new Date()
            }
          }
        });

        socket.emit('message_read_confirmed', { messageId });
      } catch (error) {
        console.error('Mark message read error:', error);
      }
    });

    // Handle online status
    socket.on('user_online', () => {
      socket.broadcast.emit('user_status', {
        userId: socket.user._id,
        username: socket.user.username,
        isOnline: true
      });
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.user.username} disconnected`);
      socket.broadcast.emit('user_status', {
        userId: socket.user._id,
        username: socket.user.username,
        isOnline: false
      });
    });
  });
};

module.exports = chatHandler;