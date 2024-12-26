import Package from '../models/Package.js';

/**
 * Apply dynamic pricing for a package
 */
export const applyDynamicPricing = async (req, res) => {
  const { packageId, basePrice, demandFactor, timeFactor } = req.body;

  try {
    const packages = await Package.findById(packageId);

    if (!packages) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Dynamic pricing logic
    const newPrice = basePrice * demandFactor * timeFactor;

    packages.price = newPrice;
    await packages.save();

    res.status(200).json({ message: 'Dynamic pricing applied', price: newPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
