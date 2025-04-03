"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFindingController = void 0;
const user_service_1 = require("./user.service");
const userFindingController = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await (0, user_service_1.userFindingService)(email, password, role);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.userFindingController = userFindingController;
