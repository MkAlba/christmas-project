const Post = require('../models/post.model');


module.exports.home = (req, res, next) => {
  res.render('common/home');
}

module.exports.create = (req, res, next) => {
  res.render('posts/create');
}

module.exports.new = async (req, res, next) => {
  const {title, text, image } = req.body;
  const post =  {
    title: title,
    text: text,
    image: image,
  }
  await Post.create(post);
  res.render('posts/details', {
    post: post
  })
}

module.exports.list = (req, res, next) => {
  const lists = Post.posts

  res.render('posts/list', {
    lists: lists
  })
}

module.exports.details = async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id)

  res.render('posts/details', {
    post: post
  });
}

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);

  res.redirect('/posts/list')
}

module.exports.edit =  async (req, res, next) => {
  const { id } = req.params;
  const { title, image, text } = req.body;
  console.log(req.body)
  const postEdited = {
      title: title,
      image: image,
      text: text
  }
  await Post.findByIdAndUpdate(id, postEdited);
 

  res.redirect('/posts/list')
}