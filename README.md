## 运行
```
pm2 start webhook.js --watch --name 'webhook'
```
## 配置

将本项目 git clone 到项目同级目录中，如/www/

config.json
```
{
  "hostname": "0.0.0.0",
  "port": "8084", // webhook服务端口
  "projects": [
    {
      "url": "/xxx-hook", // nginx反向代理url
      "cwd": "../xxx/", // build.sh脚本执行目录，即项目目录
      "script": "../xxx/build.sh" // 项目脚本路径
    }
  ]
}
```

## 项目build.sh配置

```
git pull && npm run build
```

## nginx 配置
```
location /xxx-hook {
  proxy_pass http://127.0.0.1:8084/xxx-hook;
}
```

## 访问

webhook 地址为 `http://yyy.com/xxx-hook`

测试端口是否打开  

pm2 运行后，执行`netstat -ntlp`可查看端口监听状态  

防火墙放行端口：
```
firewall-cmd --add-port=8084/tcp --permanent
firewall-cmd --reload
```

执行 `telnet 127.0.0.1 8084`，返回`connected`表示端口可以访问

