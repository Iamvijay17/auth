import i18next from 'i18next';

/**
 * Get translated content
 */
export const getTranslation = async (req, res) => {
  const { key, lang } = req.query;

  try {
    const translation = i18next.t(key, { lng: lang });
    res.status(200).json({ translation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
