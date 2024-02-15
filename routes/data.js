const express = require("express");
const router = express.Router();

const {
  getAllData,
  getData,
  newData,
  createData,
  editData,
  updateData,
  deleteData
} = require("../controllers/data");

router.route("/").get(getAllData).post(createData);
router.route("/new").get(newData);
router.route("/:id").get(getData);
router.route("/edit/:id").get(editData);
router.route("/update/:id").post(updateData);
router.route("/delete/:id").post(deleteData);

module.exports = router;
