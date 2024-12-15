"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_core_module_1 = require("./core/mongodb.core.module");
const content_schema_1 = require("./schemas/content.schema");
const crawled_data_schema_1 = require("./schemas/crawled_data.schema");
const media_resource_schema_1 = require("./schemas/media_resource.schema");
const user_interactions_schema_1 = require("./schemas/user_interactions.schema");
const content_versions_schema_1 = require("./schemas/content_versions.schema");
const content_repository_1 = require("./repositories/content.repository");
const crawled_data_1 = require("./repositories/crawled_data");
const media_resource_1 = require("./repositories/media_resource");
const user_interaction_1 = require("./repositories/user_interaction");
const content_versions_schema_2 = require("./repositories/content_versions.schema");
let MongoDBModule = class MongoDBModule {
};
exports.MongoDBModule = MongoDBModule;
exports.MongoDBModule = MongoDBModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongodb_core_module_1.MongoDBCoreModule,
            mongoose_1.MongooseModule.forFeature([
                { name: content_schema_1.Content.name, schema: content_schema_1.ContentSchema },
                { name: crawled_data_schema_1.CrawledData.name, schema: crawled_data_schema_1.CrawledDataSchema },
                { name: media_resource_schema_1.MediaResource.name, schema: media_resource_schema_1.MediaResourceSchema },
                { name: user_interactions_schema_1.UserInteraction.name, schema: user_interactions_schema_1.UserInteractionSchema },
                { name: content_versions_schema_1.ContentVersion.name, schema: content_versions_schema_1.ContentVersionSchema },
            ]),
        ],
        providers: [
            content_repository_1.ContentRepository,
            crawled_data_1.CrawledDataRepository,
            media_resource_1.MediaResourceRepository,
            user_interaction_1.UserInteractionRepository,
            content_versions_schema_2.ContentVersionRepository,
        ],
        exports: [
            mongodb_core_module_1.MongoDBCoreModule,
            mongoose_1.MongooseModule,
            content_repository_1.ContentRepository,
            crawled_data_1.CrawledDataRepository,
            media_resource_1.MediaResourceRepository,
            user_interaction_1.UserInteractionRepository,
            content_versions_schema_2.ContentVersionRepository,
        ],
    })
], MongoDBModule);
//# sourceMappingURL=mongodb.module.js.map