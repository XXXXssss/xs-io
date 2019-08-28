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
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const defaultHttpReadOption = {
    method: 'GET'
};
class XsIO {
    constructor(arg) {
        this.Arg = {};
        if (arg) {
            this.Arg.httpReadOption = arg.httpReadOption || defaultHttpReadOption;
        }
    }
    readFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    read(path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                let options = Object.assign({}, this.Arg.httpReadOption, { url: path });
                return request_promise_native_1.default.get(options);
            }
            else {
                return this.readFile(path);
            }
        });
    }
}
exports.default = XsIO;
