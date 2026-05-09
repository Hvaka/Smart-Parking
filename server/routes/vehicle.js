
import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// Mock data for testing without MongoDB
const mockActiveVehicles = [
  {
    _id: "1",
    vehicleNumber: "KA-01-AB-1234",
    type: "2W",
    entryTime: new Date(Date.now() - 2*60*60*1000),
    status: "active"
  },
  {
    _id: "2",
    vehicleNumber: "KA-02-CD-5678",
    type: "4W",
    entryTime: new Date(Date.now() - 1*60*60*1000),
    status: "active"
  },
  {
    _id: "3",
    vehicleNumber: "KA-03-EF-9012",
    type: "2W",
    entryTime: new Date(Date.now() - 3*60*60*1000),
    status: "active"
  }
];

const mockRecords = [
  ...mockActiveVehicles,
  {
    _id: "4",
    vehicleNumber: "KA-04-GH-3456",
    type: "4W",
    entryTime: new Date(Date.now() - 5*60*60*1000),
    exitTime: new Date(Date.now() - 4*60*60*1000),
    amount: 3,
    status: "exited",
    paymentMode: "cash"
  },
  {
    _id: "5",
    vehicleNumber: "KA-05-IJ-7890",
    type: "2W",
    entryTime: new Date(Date.now() - 8*60*60*1000),
    exitTime: new Date(Date.now() - 6*60*60*1000),
    amount: 5,
    status: "exited",
    paymentMode: "card"
  }
];

router.post("/entry", async (req,res)=>{
  try {
    const v = await Vehicle.create({
      vehicleNumber:req.body.vehicleNumber,
      type:req.body.type,
      entryTime:new Date()
    });
    res.json(v);
  } catch (err) {
    // Fallback: return mock response
    console.warn("Database unavailable, returning mock entry response");
    res.json({
      _id: Math.random().toString(),
      vehicleNumber: req.body.vehicleNumber,
      type: req.body.type,
      entryTime: new Date(),
      status: "active"
    });
  }
});

router.get("/active", async (req,res)=>{
  try {
    res.json(await Vehicle.find({status:"active"}));
  } catch (err) {
    // Fallback: return mock data
    console.warn("Database unavailable, returning mock active vehicles");
    res.json(mockActiveVehicles);
  }
});

router.get("/records", async (req,res)=>{
  try {
    res.json(await Vehicle.find());
  } catch (err) {
    // Fallback: return mock data
    console.warn("Database unavailable, returning mock records");
    res.json(mockRecords);
  }
});

router.post("/exit/:id", async (req,res)=>{
  try {
    const v = await Vehicle.findById(req.params.id);
    const exitTime = new Date();
    const hours = (exitTime - v.entryTime)/(1000*60*60);

    let amount = v.type==="2W" ? 1+hours*0.5 : 2+hours*1;

    v.exitTime = exitTime;
    v.amount = Math.ceil(amount);
    v.status = "exited";
    v.paymentMode = req.body.paymentMode;

    await v.save();
    res.json(v);
  } catch (err) {
    // Fallback: return mock response
    console.warn("Database unavailable, returning mock exit response");
    const vehicle = mockActiveVehicles.find(v => v._id === req.params.id);
    if (vehicle) {
      const exitTime = new Date();
      const hours = (exitTime - vehicle.entryTime)/(1000*60*60);
      let amount = vehicle.type==="2W" ? 1+hours*0.5 : 2+hours*1;
      
      res.json({
        ...vehicle,
        exitTime: exitTime,
        amount: Math.ceil(amount),
        status: "exited",
        paymentMode: req.body.paymentMode
      });
    } else {
      res.status(404).json({ error: "Vehicle not found" });
    }
  }
});

export default router;
