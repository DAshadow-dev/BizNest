const express = require("express");
const router = express.Router();

const { isAdmin } = require("../../middlewares/checkAdmin");
const {
  approveUser,
  rejectUser,
  getBusinessOwners,
  toggleAccountStatus,
} = require("../../controllers/admin/adminController");

router.get("/businessOwners", isAdmin, getBusinessOwners);
router.put("/toggleStatus/:id", isAdmin, toggleAccountStatus);
router.post("/approve/:userId", isAdmin, approveUser);
router.post("/reject/:userId", isAdmin, rejectUser);

module.exports = router;
