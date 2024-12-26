import GiftCard from '../models/GiftCard.js';

/**
 * Create a gift card
 */
export const createGiftCard = async (req, res) => {
  const { code, value } = req.body;

  try {
    const giftCard = new GiftCard({
      code,
      value,
      isActive: true,
    });

    await giftCard.save();
    res.status(201).json({ message: 'Gift card created successfully', giftCard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Redeem a gift card
 */
export const redeemGiftCard = async (req, res) => {
  const { code } = req.body;

  try {
    const giftCard = await GiftCard.findOne({ code, isActive: true });

    if (!giftCard) {
      return res.status(404).json({ message: 'Gift card not found or inactive' });
    }

    // Redeem logic: Apply the gift card value to the user's balance/booking.
    giftCard.isActive = false; // Mark as used
    await giftCard.save();

    res.status(200).json({ message: 'Gift card redeemed successfully', value: giftCard.value });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
