"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCards = void 0;
const lodash_1 = require("lodash");
const card_entity_1 = require("../../db/entities/card.entity");
const wrapper_helpers_1 = require("../../tools/wrapper.helpers");
exports.postCards = (0, wrapper_helpers_1.wrapper)(async (req, res) => {
    if (!(req === null || req === void 0 ? void 0 : req.body)) {
        throw new wrapper_helpers_1.HttpError('Card data has not been provided', 400);
    }
    const requiredCardField = ['number', 'expired', 'cvv'];
    const cardData = (0, lodash_1.pick)(req.body, requiredCardField);
    const balance = await axios;
    requiredCardField.forEach(el => {
        if (!(el in cardData)) {
            throw new wrapper_helpers_1.HttpError(`Field "${el}" is required`);
        }
    });
    const card = new card_entity_1.CardEntity();
    (0, lodash_1.assign)(card, cardData);
    card.user = req.user;
    try {
        await card.save();
    }
    catch (err) {
        if (+err.code === 23505) {
            throw new wrapper_helpers_1.HttpError('Your card has already been added, please try another one.', 400);
        }
        throw new wrapper_helpers_1.HttpError('Error during creating card. Please try again later', 500);
    }
    return res.status(200).send(`Card successfully saved with id - ${card.id}`);
});
//# sourceMappingURL=post.js.map