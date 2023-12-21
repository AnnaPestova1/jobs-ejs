const Data = require("../models/Data");
// const { StatusCodes } = require("http-status-codes");
// const { BadRequestError, NotFoundError } = require("../errors");

const getAllData = async (req, res) => {
  const data = await Data.find({ createdBy: req.user.id }).sort("createdAt");
  console.log(data);
  res.render("data", { data });
};

const newData = async (req, res) => {
  res.render("dataForm", { data: null });
};

const getData = async (req, res) => {
  const userId = req.user._id.toString();
  const dataId = req.params.id;
  console.log(userId, dataId);
  const data = await Data.findOne({
    _id: dataId,
    createdBy: userId
  });
  if (!data) {
    throw new Error(`No data with id ${req.params.id}`);
  }
  console.log("data", data);
  res.render("data", { data: [data] });
};

const createData = async (req, res) => {
    req.body.createdBy = req.user._id;
    const data = await Data.create(req.body);
    res.status(200).json({ data });
};

const editData = async (req, res) => {
  const userId = req.user._id.toString();
  const dataId = req.params.id;

  console.log(userId, dataId);

  const data = await Data.findOne({
    _id: dataId,
    createdBy: userId
  });
  if (!data) {
    throw new Error(`No data with id ${req.params.id}`);
  }
  console.log("data", data);
  res.render("dataForm", { data });
};

const updateData = async (req, res) => {
    const {
      body: { event, name, date, description },
      user: { _id: userId },
      params: { id: dataId }
    } = req;
    if (event === "" || name === "") {
      throw new Error("Event or Name fields cannot be empty");
    }
    const data = await Data.findByIdAndUpdate(
      {
        _id: dataId,
        createdBy: userId
      },
      req.body,
      // { new: true, runValidators: true }
    );
    if (!data) {
      throw new Error(`No data with id ${dataId}`);
    }
    res.status(200).json({ data });
};

const deleteData = async (req, res) => {
  // res.send("delete data");
  console.log("from req", req.user, req.params)
    const {
      user: { _id: userId },
      params: { id: dataId }
    } = req;
    const data = await Data.findOneAndDelete({
      _id: dataId,
      createdBy: userId
    });
    console.log(data)
    if (!data) {
      throw new Error(`No data with id ${dataId}`);
    }
    res.status(200).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllData,
  getData,
  newData,
  createData,
  editData,
  updateData,
  deleteData
};
