# 使用 Node.js 官方镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 yarn.lock
COPY package.json yarn.lock ./

# 安装依赖
RUN yarn install

# 复制源代码
COPY . .

# 编译 TypeScript
RUN yarn build

# 设置容器暴露端口
EXPOSE 3000

# 启动应用
CMD ["yarn", "start:prod"]
