import Discount from '../models/Discount.js';


export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().select(' -_id -__v');
    res.status(200).json({ message: 'Discounts fetched successfully', discounts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching discounts', error: error.message });
  }
};


export const applyDiscount = async (req, res) => {
  const { code } = req.body;
  const userId = req.user.userId;
  try {
    const discount = await Discount.findOne({ code, isActive: true });

    if (!discount) {
      return res.status(404).json({ message: 'Invalid or expired discount code' });
    }

    // Check if the discount is valid based on its date range
    const currentDate = new Date();
    if (currentDate < discount.validFrom || currentDate > discount.validTo) {
      return res.status(400).json({ message: 'This discount is not valid at the current date.' });
    }

    // Add the user to the `usedBy` list if not already added
    if (!discount.usedBy.includes(userId)) {
      discount.usedBy.push(userId);
      await discount.save();
    }

    res.status(200).json({ message: 'Discount applied successfully', discount });
  } catch (error) {
    res.status(500).json({ message: 'Error applying discount', error: error.message });
  }
};


export const createDiscount = async (req, res) => {
  try {
    const { code, description, discountPercentage, validFrom, validTo, codeId } = req.body;

    // Validate input
    if (!code || !description || discountPercentage == null || !validFrom || !validTo) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Ensure validFrom is before validTo
    if (new Date(validFrom) >= new Date(validTo)) {
      return res.status(400).json({ message: '"validFrom" must be before "validTo".' });
    }

    // Create a new discount
    const newDiscount = new Discount({
      createdBy: req.user.userId,
      code,
      codeId,
      description,
      discountPercentage,
      validFrom,
      validTo,
    });

    // Save to the database
    await newDiscount.save();

    res.status(201).json({ message: 'Discount created successfully', discount: newDiscount });
  } catch (error) {
    // Handle duplicate code errors or other database errors
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Discount code must be unique.' });
    }
    res.status(500).json({ message: 'Error creating discount', error: error.message });
  }
};
