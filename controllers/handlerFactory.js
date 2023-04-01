const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    const updatedDocument = await Model.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });

    if (!updatedDocument) {
      return next(new AppError('No docuement found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedDocument
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
      }
    });
  });
