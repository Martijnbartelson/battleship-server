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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const game_1 = require("./game");
let Game = class Game extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('json', { default: game_1.getShipsGrid() }),
    __metadata("design:type", Object)
], Game.prototype, "shipsGridUser", void 0);
__decorate([
    typeorm_1.Column('json', { default: game_1.getShipsGrid() }),
    __metadata("design:type", Object)
], Game.prototype, "shipsGridComputer", void 0);
__decorate([
    typeorm_1.Column('json', { default: [...game_1.baseGrid] }),
    __metadata("design:type", Object)
], Game.prototype, "shotsGridUser", void 0);
__decorate([
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { default: 1 }),
    __metadata("design:type", Number)
], Game.prototype, "turn", void 0);
__decorate([
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "scoreUser", void 0);
__decorate([
    class_validator_1.IsNumber(),
    typeorm_1.Column('int', { default: 0 }),
    __metadata("design:type", Number)
], Game.prototype, "scoreComputer", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { default: '' }),
    __metadata("design:type", String)
], Game.prototype, "feedbackUser", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { default: '' }),
    __metadata("design:type", String)
], Game.prototype, "feedbackComputer", void 0);
__decorate([
    class_validator_1.IsString(),
    typeorm_1.Column('text', { default: 'started' }),
    __metadata("design:type", String)
], Game.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], Game.prototype, "winner", void 0);
Game = __decorate([
    typeorm_1.Entity()
], Game);
exports.Game = Game;
//# sourceMappingURL=entity.js.map