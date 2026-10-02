const router = require("express").Router();
const auth = require("../middleware/auth");
const Model = require("../models/FocusSession");

router.use(auth);

router.get("/", async (req, res) => {
  try {
    const items = await Model.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post("/", async (req, res) => {
  try {
    const data = {};
    const body = req.body || {};
    if (body["minutes"] !== undefined) data["minutes"] = body["minutes"];
if (body["mode"] !== undefined) data["mode"] = body["mode"];
if (body["label"] !== undefined) data["label"] = body["label"];
if (body["date"] !== undefined) data["date"] = body["date"];
    const item = await Model.create({ ...data, user: req.userId });
    res.status(201).json(item);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put("/:id", async (req, res) => {
  try {
    const data = {};
    const body = req.body || {};
    if (body["minutes"] !== undefined) data["minutes"] = body["minutes"];
if (body["mode"] !== undefined) data["mode"] = body["mode"];
if (body["label"] !== undefined) data["label"] = body["label"];
if (body["date"] !== undefined) data["date"] = body["date"];
    const item = await Model.findOneAndUpdate({ _id: req.params.id, user: req.userId }, data, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Model.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Deleted" });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
