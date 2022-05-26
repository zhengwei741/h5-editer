#基准镜像
FROM nginx:latest
# 删除可能存在的Nginx配置文件，非必须；
RUN rm /etc/nginx/nginx.conf
# 复制Nginx配置；
COPY dockerfile/nginx.conf /etc/nginx/nginx.conf
# 字符编码，时区；
ENV LANG=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime
RUN echo $TZ >/etc/timezone
# 复制前端静态资源；
COPY dist /usr/share/nginx/html/
# 服务对外暴露端口，仅仅是声明容器打算使用什么端口而已，并不会自动在宿主进行端口映射
EXPOSE 80
# 应用启动命令；
ENTRYPOINT ["nginx", "-g", "daemon off;"]
