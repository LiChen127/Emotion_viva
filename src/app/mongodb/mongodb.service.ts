import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content } from './content.schema';
import { MediaResource } from './media-resource.schema';
import { ContentVersion } from './content-versions.schema';
import { UserInteraction } from './user-interactions.schema';
import { CrawledData } from './crawled-data.schema';

@Injectable()
export class MongoDBService {
  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    @InjectModel(MediaResource.name)
    private mediaResourceModel: Model<MediaResource>,
    @InjectModel(ContentVersion.name)
    private contentVersionModel: Model<ContentVersion>,
    @InjectModel(UserInteraction.name)
    private userInteractionModel: Model<UserInteraction>,
    @InjectModel(CrawledData.name) private crawledDataModel: Model<CrawledData>,
  ) { }

  // 创建内容
  async createContent(
    title: string,
    body: string,
    category: string,
    tags: string[],
  ): Promise<Content> {
    const newContent = new this.contentModel({ title, body, category, tags });
    return await newContent.save();
  }

  // 创建媒体资源
  async createMediaResource(
    contentId: string,
    resourceType: string,
    url: string,
    metadata: object,
  ): Promise<MediaResource> {
    const newResource = new this.mediaResourceModel({
      content_id: contentId,
      resource_type: resourceType,
      url,
      metadata,
    });
    return await newResource.save();
  }

  // 创建内容版本
  async createContentVersion(
    contentId: string,
    versionId: string,
  ): Promise<ContentVersion> {
    const newVersion = new this.contentVersionModel({
      content_id: contentId,
      version_id: versionId,
    });
    return await newVersion.save();
  }

  // 创建用户交互记录
  async createUserInteraction(
    userId: number,
    contentId: string,
    interactionType: string,
    interactionData: object,
  ): Promise<UserInteraction> {
    const newInteraction = new this.userInteractionModel({
      user_id: userId,
      content_id: contentId,
      interaction_type: interactionType,
      interaction_data: interactionData,
    });
    return await newInteraction.save();
  }

  // 创建爬虫数据
  async createCrawledData(
    crawlSource: string,
    contentData: object,
    crawlStatus: string,
  ): Promise<CrawledData> {
    const newCrawlData = new this.crawledDataModel({
      crawl_source: crawlSource,
      content_data: contentData,
      crawl_status: crawlStatus,
    });
    return await newCrawlData.save();
  }

  async findAll(): Promise<CrawledData[]> {
    return await this.crawledDataModel.find();
  }
}
