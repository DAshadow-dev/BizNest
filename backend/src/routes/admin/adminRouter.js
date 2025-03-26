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
router.put("/approve/:userId", isAdmin, approveUser);
router.put("/reject/:userId", isAdmin, rejectUser);

module.exports = router;
