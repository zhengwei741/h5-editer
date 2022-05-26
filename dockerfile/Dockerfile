#基准镜像
FROM centos:7
#工作目录
WORKDIR /usr/local/src/
#定义环境变量
ENV NG_VERSION nginx-1.21.0
#安装epel仓库
RUN yum -y install epel-release 
#安装wget
RUN yum -y install wget 
#下载nginx文件并解压
RUN wget http://nginx.org/download/$NG_VERSION.tar.gz && tar xzvf $NG_VERSION.tar.gz 
#安装编译依赖包
RUN yum install -y gcc gcc-c++ glibc make autoconf openssl openssl-devel && yum install -y pcre-devel libxslt-devel gd-devel GeoIP GeoIP-devel GeoIP-data
#清理仓库
RUN yum clean all 
#切换工作目录
WORKDIR /usr/local/src/$NG_VERSION 
#编译安装nginx
RUN ./configure --user=nginx --group=nginx --prefix=/usr/local/nginx --with-file-aio --with-http_ssl_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module --with-http_image_filter_module --with-http_geoip_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_stub_status_module && make && make install

# 删除可能存在的Nginx配置文件，非必须；
RUN rm nginx.conf
# 复制Nginx配置；
COPY dockerfile/nginx.conf .
# 字符编码，时区；
ENV LANG=zh_CN.UTF-8
ENV TZ=Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime
RUN echo $TZ >/etc/timezone
# 复制前端静态资源；
COPY dist html/
# 服务对外暴露端口，仅仅是声明容器打算使用什么端口而已，并不会自动在宿主进行端口映射
EXPOSE 80
# 应用启动命令；
ENTRYPOINT ["nginx", "-g", "daemon off;"]
