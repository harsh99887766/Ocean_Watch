const express = require("express");
const router = express.Router();
const { getArgoIds, getCyclesByArgo, getCycleDetails } = require("../controllers/argoController");

router.get("/", getArgoIds);
router.get("/:argoId/cycles", getCyclesByArgo);
router.get("/:argoId/cycles/:cycleId", getCycleDetails);

module.exports = router;
