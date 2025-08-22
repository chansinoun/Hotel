// server.js (or index.js)
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';


import staffRoutes from './routes/staff.js';
import Staff from './models/Staff.js'; // Make sure this path is correct

const app = express();

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/hotel', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/', staffRoutes);

// PUT route to update staff
app.put('/api/staff/:id', async (req, res) => {
  try {
    const updatedStaff = await Staff.findOneAndUpdate(
      { Id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedStaff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.json({ message: 'Staff updated successfully', data: updatedStaff });
  } catch (error) {
    res.status(500).json({ message: 'Error updating staff', error });
  }
});

// GET route to view staff
app.get('/view-staff', async (req, res) => {
  try {
    const staffList = await Staff.find();
    let html = '<h3>Staff List</h3>';
    staffList.forEach(staff => {
      html += `
        <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ccc;">
          <strong>ID:</strong> ${staff.Id}<br>
          <strong>Name:</strong> ${staff.Name}<br>
          <strong>Gender:</strong> ${staff.Gender}<br>
          <strong>Position:</strong> ${staff.Position}<br>
          <strong>Email:</strong> ${staff.Email}<br>
          <strong>Phone:</strong> ${staff.Phone}
        </div>
      `;
    });
    res.send(html);
  } catch (error) {
    res.send('<p>Error loading staff data.</p>');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});