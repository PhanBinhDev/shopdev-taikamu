"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _mocks_1 = require("../../_mocks_");
const user_controller_1 = require("../../controllers/user.controller");
describe('getUser', () => {
    it('Should return an object of user', () => {
        (0, user_controller_1.getUser)(_mocks_1.mockRequest, _mocks_1.mockResponse);
        expect(_mocks_1.mockResponse.send).toHaveBeenCalledWith({});
    });
});
