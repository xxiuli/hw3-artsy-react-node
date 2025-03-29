# 使用官方 Node.js 运行时作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装依赖（使用 `npm ci` 确保一致性）
RUN npm ci --omit=dev

# 复制所有源代码到容器中
COPY . .

# 让 Cloud Run 正确运行的环境变量
ENV PORT=8080

# 公开 8080 端口（Cloud Run 默认使用 8080 端口）
EXPOSE 8080

# 启动应用
CMD ["node", "src/server.js"]
