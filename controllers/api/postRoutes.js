const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// create post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);

    console.log('post created!')
  }
});

// delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log('error', err)
    res.status(500).json(err);
  }
});

// edit post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.update({ title: req.body.post_title, body: req.body.post_content }, { where: {id: req.params.id }} );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get comments
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [ { model: Comment}],
    });
    console.log(postData.comments); // log the comments data
    const post = postData.get({ plain: true });
    res.render('post', {
      ...post,
      comments: postData.comments,
      logged_in: req.session.logged_in,
    });
    
    console.log('postRoutes:',postData.comments)
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
