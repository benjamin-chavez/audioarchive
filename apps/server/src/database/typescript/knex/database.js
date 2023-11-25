"use strict";
// src/database/db.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = __importDefault(require("../../apps/server/knexfile"));
// import updateTypes from 'knex-types';
// const environment = process.env.NODE_ENV || 'development';
var environment = process.env.NODE_ENV || 'production';
var config = knexfile_1.default[environment];
var knex = (0, knex_1.default)(config);
exports.default = knex;
