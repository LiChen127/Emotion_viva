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
exports.ContentVersionSchema = exports.ContentVersion = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let ContentVersion = class ContentVersion extends mongoose_2.Document {
};
exports.ContentVersion = ContentVersion;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ContentVersion.prototype, "version_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, ref: 'Content' }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], ContentVersion.prototype, "content_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], ContentVersion.prototype, "created_at", void 0);
exports.ContentVersion = ContentVersion = __decorate([
    (0, mongoose_1.Schema)()
], ContentVersion);
exports.ContentVersionSchema = mongoose_1.SchemaFactory.createForClass(ContentVersion);
//# sourceMappingURL=content_versions.schema.js.map