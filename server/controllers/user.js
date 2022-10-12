import { createError } from '../error.js';
import User from '../models/User.js';
import Video from '../models/Video.js';

/** Update a user */
export const updateUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can update only your account!'));
  }
};

/** delete a user */
export const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User has been deleted' });
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, 'You can delete only your account!'));
  }
};

/** get a user */
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/** subscribe a user */
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json({ message: 'Subscribtion succsessful!' });
  } catch (err) {
    next(err);
  }
};

/** unsubscribe a user */
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json({ message: 'Unsubscribtion succsessful!' });
  } catch (err) {
    next(err);
  }
};

/** like a video */
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json({ message: 'Video has been liked' });
  } catch (err) {
    next(err);
  }
};

/** dislike a video */
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json({ message: 'Video has been disliked' });
  } catch (err) {
    next(err);
  }
};
