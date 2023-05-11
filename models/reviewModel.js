const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviwSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJson: { virtual: true },
    toObject: { virtual: true }
  }
);

reviwSchema.index({ tour: 1, user: 1 }, { unique: true });

reviwSchema.pre(/^find/, function(next) {
  //   this.populate({
  //     path: 'tour',
  //     select: 'name'
  //   }).populate({
  //     path: 'user',
  //     select: 'name photo'
  //   });

  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviwSchema.statics.calcAvearageRatings = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRatings,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviwSchema.post('save', async function(next) {
  //this points to the current review
  await this.constructor.calcAvearageRatings(this.tour);
});

reviwSchema.pre(/^findOneAnd/, async function(next) {
  this.r = await this.findOne();
  next();
});
reviwSchema.post(/^findOneAnd/, async function(next) {
  await this.r.constructor.calcAvearageRatings(this.r.tour);
});
const Review = mongoose.model('Review', reviwSchema);

module.exports = Review;

//Post //tour/23334/reviews
