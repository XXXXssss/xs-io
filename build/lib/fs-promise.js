"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function readFile(path, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options) {
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(path, options, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(path, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        }
    });
}
exports.readFile = readFile;
function _writeFile(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options) {
            return new Promise((resolve, reject) => {
                fs_1.default.writeFile(path, data, options, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                fs_1.default.writeFile(path, data, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
    });
}
function writeFile(path, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let trueData;
        if (data instanceof Object) {
            trueData = JSON.stringify(data);
        }
        else if (typeof data == 'number') {
            trueData = data.toString();
        }
        else if (typeof data == 'string') {
            trueData = data;
        }
        else {
            trueData = data;
        }
        if (options) {
            return _writeFile(path, trueData, options);
        }
        else {
            return _writeFile(path, trueData);
        }
    });
}
exports.writeFile = writeFile;
