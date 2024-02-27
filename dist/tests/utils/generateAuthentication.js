"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvalidToken = exports.generateAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../database/prisma");
const user_mocks_1 = require("../mocks/user.mocks");
const generateAuthentication = (user = user_mocks_1.userMock) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield prisma_1.prisma.user.create({
        data: user,
    });
    const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        subject: newUser.id.toString(),
    });
    return { user: newUser, token };
});
exports.generateAuthentication = generateAuthentication;
const generateInvalidToken = () => {
    const token = jsonwebtoken_1.default.sign({}, "INVALID_SECRET");
    return token;
};
exports.generateInvalidToken = generateInvalidToken;
