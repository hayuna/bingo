"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.RoomController = void 0;
var socket_controllers_1 = require("socket-controllers");
var socket_io_1 = require("socket.io");
var RoomController = /** @class */ (function () {
    function RoomController() {
    }
    RoomController.prototype.joinGame = function (io, socket, message) {
        return __awaiter(this, void 0, void 0, function () {
            var connectedSockets, socketRooms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("New User joining room: ", message);
                        connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
                        socketRooms = Array.from(socket.rooms.values()).filter(function (r) { return r !== socket.id; });
                        if (!(socketRooms.length > 0 ||
                            (connectedSockets && connectedSockets.size === 2))) return [3 /*break*/, 1];
                        socket.emit("room_join_error", {
                            error: "Room is full please choose another room to play!"
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, socket.join(message.roomId)];
                    case 2:
                        _a.sent();
                        socket.emit("room_joined");
                        if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
                            socket.emit("start_game", { start: true, symbol: "x" });
                            socket
                                .to(message.roomId)
                                .emit("start_game", { start: false, symbol: "o" });
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, socket_controllers_1.OnMessage)("join_game"),
        __param(0, (0, socket_controllers_1.SocketIO)()),
        __param(1, (0, socket_controllers_1.ConnectedSocket)()),
        __param(2, (0, socket_controllers_1.MessageBody)()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [socket_io_1.Server,
            socket_io_1.Socket, Object]),
        __metadata("design:returntype", Promise)
    ], RoomController.prototype, "joinGame");
    RoomController = __decorate([
        (0, socket_controllers_1.SocketController)()
    ], RoomController);
    return RoomController;
}());
exports.RoomController = RoomController;
