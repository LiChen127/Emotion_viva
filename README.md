# Emotion Viva

## 项目介绍

Emotion Viva 是一个基于 NestJS 的微服务架构项目，专注于情感分析、情绪树洞和情感识别。项目采用 monorepo 结构，使用 pnpm 作为包管理工具。

## 技术栈

- **框架**: NestJS
- **数据库**:
  - MySQL: 用户数据、系统配置
  - MongoDB: 内容数据、日志
  - Redis: 缓存
- **消息队列**: RabbitMQ
- **包管理**: pnpm
- **容器化**: Docker

## 项目结构

emotion_viva/
├── apps/ # 应用服务
│ ├── api/ # 主 API 服务
│ │ └── src/
│ └── scraper/ # 爬虫服务
│ └── src/
├── libs/ # 共享库
│ ├── core/ # 核心基础设施
│ │ ├── src/
│ │ │ ├── db/ # 数据库连接
│ │ │ ├── cache/ # 缓存
│ │ │ └── queue/ # 消息队列
│ │ └── package.json
│ └── common/ # 通用功能
│ └── src/
├── scripts/ # 工具脚本
│ └── db/ # 数据库相关脚本
└── docker-compose.dev.yml # 开发环境配置

## 开发环境设置

1. **安装依赖**

```bash
pnpm install
```

2. **环境配置**

```bash
cp .env.example .env
```

3. **启动开发环境**

```bash
pnpm dev
```

4. **启动 Docker**

```bash
docker compose -f docker-compose.dev.yml up -d
```

5. **初始化数据库**

```bash
pnpm run db:init
```
