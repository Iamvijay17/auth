import Package from '../models/Package.js';

/**
 * Create a new package
 */
export const createPackage = async (req, res) => {
  const { name, description, price, destinations, duration } = req.body;

  try {
    const newPackage = new Package({
      name,
      description,
      price,
      destinations,
      duration,
    });

    await newPackage.save();
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all packages
 */
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find().populate('destinations');
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a package
 */
export const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    await Package.findByIdAndDelete(id);
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPackageForTravelAgency = async (req, res) => {
  try {
    const { id } = req.params; // Travel agency ID
    const { destinationId, packageName, price, description } = req.body;

    const travelAgency = await TravelAgency.findById(id);
    if (!travelAgency) return res.status(404).json({ message: 'Travel agency not found' });

    const travelPackage = new TravelPackage({
      travelAgencyId: id,
      destinationId,
      packageName,
      price,
      description,
    });

    await travelPackage.save();
    res.status(201).json({ message: 'Package created successfully', travelPackage });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getTravelAgenciesForDestination = async (req, res) => {
  try {
    const { id } = req.params; // Destination ID
    const travelPackages = await TravelPackage.find({ destinationId: id }).populate('travelAgencyId');

    if (travelPackages.length === 0) {
      return res.status(404).json({ message: 'No travel agencies found for this destination' });
    }

    res.status(200).json(travelPackages);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};