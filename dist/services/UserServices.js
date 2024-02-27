"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.UserServices = void 0;
const tsyringe_1 = require("tsyringe");
const prisma_1 = require("../database/prisma");
const errors_1 = require("../middlewares/errors");
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserServices = class UserServices {
    constructor() {
        this.register = (data) => __awaiter(this, void 0, void 0, function* () {
            const hashedPwd = yield bcrypt_1.default.hash(data.password, 10);
            const emailExists = yield prisma_1.prisma.user.findFirst({
                where: { email: data.email },
            });
            if (emailExists)
                throw new errors_1.AppError("This email is already registered", 409);
            const newUser = yield prisma_1.prisma.user.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPwd }),
            });
            return schemas_1.userReturnSchema.parse(newUser);
        });
        this.login = (data) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield prisma_1.prisma.user.findFirst({
                where: { email: data.email },
            });
            if (!userFound)
                throw new errors_1.AppError("User not exists", 404);
            const pwdMatch = yield bcrypt_1.default.compare(data.password, userFound.password);
            if (!pwdMatch)
                throw new errors_1.AppError("Email and password doesn't match", 401);
            const token = jsonwebtoken_1.default.sign({ user: userFound }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return {
                accessToken: token,
                user: schemas_1.userReturnSchema.parse(userFound),
            };
        });
        this.autoLogin = (user) => __awaiter(this, void 0, void 0, function* () {
            return schemas_1.userReturnSchema.parse(user);
        });
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);
