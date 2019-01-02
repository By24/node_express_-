商城后台系统
## **web网站api文档**


[一、权限](#1)  
>   [1.1登陆](#11登陆)<br/>  

###### **接口说明：**

<h3 id="1">**一、登陆**</h3>
<h4 id="1.1">**#11登陆**</h4>
接口说明：
>获取小程序应用列表的首页导航
>请求参数：

| 参数名        | 含义       | 参数类型    | 是否必须 | 缺省值|
| email        |登录邮箱     | String     | 是       | 无   |

请求实例：
   POST
   [/admin/login]()
   HTTP/1.1 Host: [http://web.server.com:8080/admin/login]

返回结果：
登录成功

```json
{
    "code": 0,
    "message": "登陆成功",
    "data": []
}
```
返回参数：

| 参数名       | 含义              | 参数类型   | 长度 |
| ------------ | ------------------| ---------- | ---- |
|id            | 导航栏表主键ID    | integer    |  -   |
|name          | 导航栏名称        | string     |  -   |
|sort          | 排序，越小越靠前  | integer    |  -   |

