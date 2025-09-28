// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/documentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Document Schema
const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['engineer', 'hr', 'technician', 'employee'],
    required: true
  },
  description: String,
  fileName: String,
  uploadDate: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);

// Seed database with dummy data
const seedDatabase = async () => {
  const count = await Document.countDocuments();
  if (count === 0) {
    const dummyDocuments = [
      // Engineer documents
      { title: 'Engineering Standards', category: 'engineer', description: 'Technical standards for engineering projects', fileName: 'eng_standards.pdf' },
      { title: 'CAD Guidelines', category: 'engineer', description: 'Computer-aided design specifications', fileName: 'cad_guidelines.pdf' },
      { title: 'Safety Protocols', category: 'engineer', description: 'Engineering safety procedures', fileName: 'eng_safety.pdf' },
      
      // HR documents
      { title: 'Employee Handbook', category: 'hr', description: 'Company policies and procedures', fileName: 'hr_handbook.pdf' },
      { title: 'Benefits Guide', category: 'hr', description: 'Employee benefits information', fileName: 'benefits_guide.pdf' },
      { title: 'Onboarding Checklist', category: 'hr', description: 'New hire onboarding procedures', fileName: 'onboarding_checklist.pdf' },
      
      // Technician documents
      { title: 'Equipment Manual', category: 'technician', description: 'Technical equipment operating instructions', fileName: 'equipment_manual.pdf' },
      { title: 'Maintenance Schedule', category: 'technician', description: 'Regular maintenance procedures', fileName: 'maintenance_schedule.pdf' },
      { title: 'Troubleshooting Guide', category: 'technician', description: 'Common technical issues resolution', fileName: 'troubleshooting.pdf' },
      
      // Employee documents
      { title: 'Code of Conduct', category: 'employee', description: 'Professional behavior guidelines', fileName: 'code_of_conduct.pdf' },
      { title: 'Time Off Policy', category: 'employee', description: 'Vacation and leave policies', fileName: 'time_off_policy.pdf' },
      { title: 'Performance Review', category: 'employee', description: 'Annual performance evaluation form', fileName: 'performance_review.pdf' }
    ];
    
    await Document.insertMany(dummyDocuments);
    console.log('Dummy data inserted');
  }
};

// Routes
app.get('/api/engineer', async (req, res) => {
  try {
    const documents = await Document.find({ category: 'engineer' });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/hr', async (req, res) => {
  try {
    const documents = await Document.find({ category: 'hr' });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/technician', async (req, res) => {
  try {
    const documents = await Document.find({ category: 'technician' });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const documents = await Document.find({ category: 'employee' });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all documents (for testing)
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedDatabase();
});