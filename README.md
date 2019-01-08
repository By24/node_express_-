商城后台系统
## **api文档**


[一、权限](#1)  
>   [1.1登陆](#11登陆)<br/>  
>   [1.2注册](#12注册)<br/>  
###### **接口说明：**

<h3 id="1">**一、登陆**</h3>
<h4 id="1.1">**#11登陆**</h4>
接口说明：
>用户登陆
>请求参数：

| 参数名        | 含义       | 参数类型    | 是否必须 | 缺省值|
| ------------ | -----------| ---------- | -------- | ---- |
| email        |登录邮箱     | String     | 是       | 无   |
| password     |登录密码     | String     | 是       | 无   |

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

| 参数名         | 含义                                 | 参数类型   | 长度 |
| ------------  | -------------------------------------| ----------| ---- |
|avatar         | 用户头像                              | string    |  -   |
|email          | 用户账号                              | string    |  -   |
|status         | 用户权限（1、管理员；2、超级管理员）    | integer   |  -   |
|admin          | 用户类别                              | string    |  -   |
|token          | 令牌                                 | string     |  -   |


<h3 id="1">**一、注册**</h3>
<h4 id="1.2">**#12注册**</h4>
接口说明：
>用户注册
>请求参数：

| 参数名        | 含义       | 参数类型    | 是否必须 | 缺省值|
| ------------ | -----------| ---------- | -------- | ---- |
| email        |登录邮箱     | String     | 是       | 无   |
| password     |登录密码     | String     | 是       | 无   |

请求实例：
   POST
   [/admin/register]()
   HTTP/1.1 Host: [http://web.server.com:8080/admin/register]

返回结果：
登录成功

```json
{
    "code": 0,
    "message": "注册成功",
    "data": []
}
```
返回参数：
