const express = require("express");
const router = express.Router();

const {
  getAllData,
  getData,
  newData,
  createData,
  updateData,
  deleteData
} = require("../controllers/data");

router.route("/").get(getAllData).post(createData);
router.route("/new").get(newData);
router.route("/:id").get(getData).post(updateData).post(deleteData);

module.exports = router;
