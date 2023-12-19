const Data = require("../models/Data");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, NotFoundError } = require("../errors");

const getAllData = async (req, res) => {
  //   console.log(req.session);
  //   res.send("all data");
  //   const data = await Data.find({ createdBy: req.user.userId }).sort(
  //     "createdAt"
  //   );
  console.log("req is:", req.session);
  res.render("data", { data });
  //   res.status(StatusCodes.OK).json({ data, count: data.length });
};

const newData = async (req, res) => {
  res.send("new data");
  //   const {
  //     user: { userId },
  //     params: { id: dataId }
  //   } = req;
  //   const data = await Data.findOne({
  //     _id: dataId,
  //     createdBy: userId
  //   });
  //   if (!data) {
  //     throw new NotFoundError(`No job with id ${dataId}`);
  //   }
  //   res.status(StatusCodes.OK).json({ data });
};

const getData = async (req, res) => {
  res.send("get single data");
  //   const {
  //     user: { userId },
  //     params: { id: dataId }
  //   } = req;
  //   const data = await Data.findOne({
  //     _id: dataId,
  //     createdBy: userId
  //   });
  //   if (!data) {
  //     throw new NotFoundError(`No job with id ${dataId}`);
  //   }
  //   res.status(StatusCodes.OK).json({ data });
};

const createData = async (req, res) => {
  res.send("create data");
  //   console.log(req.body);
  //   req.body.createdBy = req.user.userId;
  //   const data = await Data.create(req.body);
  //   res.status(StatusCodes.CREATED).json({ data });
};

const updateData = async (req, res) => {
  res.send("update data");
  //   const {
  //     body: { event, name, date, description },
  //     user: { userId },
  //     params: { id: dataId }
  //   } = req;
  //   if (event === "" || name === "") {
  //     throw new BadRequestError("Event or Name fields cannot be empty");
  //   }
  //   const data = await Data.findByIdAndUpdate(
  //     {
  //       _id: dataId,
  //       createdBy: userId
  //     },
  //     req.body,
  //     { new: true, runValidators: true }
  //   );
  //   if (!data) {
  //     throw new NotFoundError(`No job with id ${dataId}`);
  //   }
  //   res.status(StatusCodes.OK).json({ data });
};

const deleteData = async (req, res) => {
  res.send("delete data");
  //   const {
  //     user: { userId },
  //     params: { id: dataId }
  //   } = req;
  //   const data = await Data.findOneAndRemove({
  //     _id: dataId,
  //     createdBy: userId
  //   });
  //   if (!data) {
  //     throw new NotFoundError(`No job with id ${dataId}`);
  //   }
  //   res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllData,
  getData,
  newData,
  createData,
  updateData,
  deleteData
};
