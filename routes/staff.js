import express from 'express';
import Staff from '../models/Staff.js';

const router = express.Router();

// Example: GET all staff
router.get('/staff', async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: DELETE staff by MongoDB _id
router.delete('/staff/:id', async (req, res) => {
  try {
    const deleted = await Staff.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json({ message: 'Staff deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;