const Data = require("../models/Data");

const getAllData = async (req, res) => {
  const data = await Data.find({ createdBy: req.user.id }).sort("createdAt");
  res.render("data", { data });
};

const newData = async (req, res) => {
  res.render("dataForm", { data: null });
};

const getData = async (req, res) => {
  const userId = req.user._id.toString();
  const dataId = req.params.id;
  const data = await Data.findOne({
    _id: dataId,
    createdBy: userId
  });
  if (!data) {
    req.flash("error", `No data with id ${req.params.id}`);
    res.redirect("/data"); 
  }
  res.render("data", { data: [data] });
};

const createData = async (req, res) => {
    const {
      body: { event, name }
    } = req;
    req.body.createdBy = req.user._id;
   if (event === "" || name === "") {
    req.flash("error", "Event or Name fields cannot be empty.");
     res.redirect("/data/new"); 
   }
    await Data.create(req.body);
    res.redirect("/data"); 
};

const editData = async (req, res) => {
  const userId = req.user._id.toString();
  const dataId = req.params.id;

  const data = await Data.findOne({
    _id: dataId,
    createdBy: userId
  });
  if (!data) {
     req.flash("error", `No data with id ${req.params.id}`);
     res.redirect("/data"); 
  }
  res.render("dataForm", { data });
};

const updateData = async (req, res) => {
    const {
      body: { event, name },
      user: { _id: userId },
      params: { id: dataId }
    } = req;
    if (event === "" || name === "") {
       req.flash("error", "Event or Name fields cannot be empty");
       res.redirect("/data"); 
    }
    const data = await Data.findByIdAndUpdate(
      {
        _id: dataId,
        createdBy: userId
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!data) {
      req.flash("error", `No data with id ${dataId}`);
      res.redirect("/data"); 
    }
    res.redirect("/data") 
};

const deleteData = async (req, res) => {
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
         req.flash("error", `No data with id ${dataId}`);
         res.redirect("/"); 
    }
     res.redirect("/data"); 
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
