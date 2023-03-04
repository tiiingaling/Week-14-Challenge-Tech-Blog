const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create comment
router.post('/', withAuth ,async (req, res) => {
  try{
    const user = await User.findByPk(req.session.user_id);
    const newComment = await Comment.create({
      commentText: req.body.commentText,
      name: user.name,
      post_id: req.body.post_id
    })
    

      res.status(200).json(newComment)
  } catch(err){
      res.status(400).json(err)
  }
})

// Delete comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'Comment unavailable with this id' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
