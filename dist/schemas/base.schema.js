"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseSchema = void 0;
const zod_1 = require("zod");
const baseSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
exports.baseSchema = baseSchema;
