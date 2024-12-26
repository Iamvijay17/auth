import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vendor from '../models/Vendor.js';

/**
 * Vendor registration
 */
export const registerVendor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });

    await vendor.save();
    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Vendor login
 */
export const loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get Vendor profile
 */
export const getVendorProfile = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Vendor profile
 */
export const updateVendorProfile = async (req, res) => {
  const { name, phone, address, description, profileImage } = req.body;
  try {
    const vendor = await Vendor.findById(req.user.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    vendor.name = name || vendor.name;
    vendor.phone = phone || vendor.phone;
    vendor.address = address || vendor.address;
    vendor.description = description || vendor.description;
    vendor.profileImage = profileImage || vendor.profileImage;

    await vendor.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
