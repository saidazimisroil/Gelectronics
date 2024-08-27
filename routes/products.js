const { Router } = require("express");
const requireAuth = require("../middlewares/requireAuth.js");
const upload = require("../middlewares/upload");
const checkUser = require("../middlewares/checkUser");

const productsController = require("../controllers/productsController");
const add2_sold = require("../controllers/add2_sold");
const hmiController = require("../controllers/hmi");
const plcController = require("../controllers/plc.js");
const inverterController = require("../controllers/inverter.js");
const servoController = require("../controllers/servo.js");

const router = Router();

router.get("*", checkUser);
router.get("/", productsController.main_get);

// +++++++++ ADD1  +++++++++
router.get("/add", requireAuth, productsController.add_get);
router.post("/add", requireAuth, upload.single("image"), productsController.add_post);

// hmi routes
router.get("/hmi", hmiController.hmi_get);
router.get("/hmi7", hmiController.hmi7_get);
router.get("/hmi10", hmiController.hmi10_get);
router.get("/hmi15", hmiController.hmi15_get);

// plc routes
router.get("/plc", plcController.plc_get);
router.get("/h1u", plcController.plc7_get);
router.get("/h3u", plcController.plc10_get);
router.get("/h5u", plcController.plc15_get);

// inverter routes
router.get("/inverter", inverterController.inverter_get);
router.get("/inv1", inverterController.inverter7_get);
router.get("/inv2", inverterController.inverter10_get);
router.get("/inv3", inverterController.inverter15_get);
router.get("/inv4", inverterController.inverter4_get);
router.get("/inv5", inverterController.inverter5_get);

// servo routes
router.get("/servo", (req, res) => res.render("servo"));
router.get("/servo1", servoController.servo7_get);
router.get("/servo2", servoController.servo10_get);
router.get("/servo3", servoController.servo15_get);
router.get("/servo4", servoController.servo4_get);
router.get("/servo5", servoController.servo5_get);

// ++++ add2 ++++
router.get("/add2", requireAuth, add2_sold.hmiAdd2_get);
router.post("/add2", requireAuth, add2_sold.hmiAdd2_post);
// ---- sold ----
router.get("/sold", requireAuth, add2_sold.hmiSold_get);
router.post("/sold", requireAuth, add2_sold.hmiSold_post);

// About
router.get("/product/:id", productsController.about_get);
router.get("/product", productsController.product_get);

router.get("/edit/:id", requireAuth, productsController.editId_get);
router.get("/edit-product", requireAuth, productsController.edit_get);
router.post("/edit-product", requireAuth, productsController.edit_post);

module.exports = router;
