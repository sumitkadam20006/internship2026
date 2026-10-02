const router = require("express").Router();
const auth = require("../middleware/auth");
const Model = require("../models/Task");

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
    if (body["title"] !== undefined) data["title"] = body["title"];
if (body["description"] !== undefined) data["description"] = body["description"];
if (body["category"] !== undefined) data["category"] = body["category"];
if (body["priority"] !== undefined) data["priority"] = body["priority"];
if (body["dueDate"] !== undefined) data["dueDate"] = body["dueDate"];
if (body["time"] !== undefined) data["time"] = body["time"];
if (body["reminder"] !== undefined) data["reminder"] = body["reminder"];
if (body["status"] !== undefined) data["status"] = body["status"];
    const item = await Model.create({ ...data, user: req.userId });
    res.status(201).json(item);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put("/:id", async (req, res) => {
  try {
    const data = {};
    const body = req.body || {};
    if (body["title"] !== undefined) data["title"] = body["title"];
if (body["description"] !== undefined) data["description"] = body["description"];
if (body["category"] !== undefined) data["category"] = body["category"];
if (body["priority"] !== undefined) data["priority"] = body["priority"];
if (body["dueDate"] !== undefined) data["dueDate"] = body["dueDate"];
if (body["time"] !== undefined) data["time"] = body["time"];
if (body["reminder"] !== undefined) data["reminder"] = body["reminder"];
if (body["status"] !== undefined) data["status"] = body["status"];
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
