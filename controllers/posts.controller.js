const Post = require('../models/post.model');
const createError = require('http-errors');


module.exports.home = (req, res, next) => {
  res.render('common/home');
}

module.exports.create = (req, res, next) => {
  res.render('posts/create');
}

module.exports.new = async (req, res, next) => {
  const { title, text, image } = req.body;
  const post = {
    title: title,
    text: text,
    image: image,
    
  }
  if (!text || !title) {
    const errors = {};
    if (!title) {
      errors.title = 'Title is mandatory';
    }
    if (!text) {
      errors.text = 'Text is mandatory';
    }
    res.render('errors/error', {
      post: post,
      errors: errors
    })

  } else {
    await Post.create(post);
    res.render('posts/details', {
      post: post
    })
  }
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

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const editpost = await Post.findById(id)

  res.render('posts/edit', {
    editpost: editpost
  })
}

module.exports.update = async (req, res, next) => {

  const { id } = req.params;
  const {
    title,
    image,
    text
  } = req.body;
  const postEdited = {
    title: title,
    image: image,
    text: text
  }

  if (!text || !title) {
    const errors = {};
    if (!title) {
      errors.title = 'Title is mandatory';
    }
    if (!text) {
      errors.text = 'Text is mandatory';
    }
    res.render('errors/error', {
      postEdited: postEdited,
      errors: errors
    })

  } else {
    await Post.findByIdAndUpdate(id, postEdited);

    res.render('posts/details', {
      id: id,
      postEdited: postEdited
    })
  }
}