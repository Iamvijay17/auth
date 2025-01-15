export const globalSearch = async (model, query, fields) => {
  if (!query || !fields || fields.length === 0) {
    throw new Error('Query and fields are required for a global search.');
  }

  const searchConditions = fields.map(field => ({
    [field]: { $regex: query, $options: 'i' } // Case-insensitive search for each field
  }));

  return model.find({ $or: searchConditions });
};
