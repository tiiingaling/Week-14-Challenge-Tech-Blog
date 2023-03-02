const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

User.hasMany(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

Post.hasMany(Comment, {
  foreignKey: 'comment_id'
});

module.exports = { User, Post, Comment };