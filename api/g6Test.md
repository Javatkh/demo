## 1. G6demo  @/src/views/test.vue
### 1.1 功能描述
提供节点模型数据和边模型数据。
### 1.2 请求说明
> 请求方式：POST<br>
请求URL ：[http://192.168.44.1:3001/api/action](#)

### 1.3 请求参数
字段       |字段类型       |字段说明
------------|-----------|-----------
null       |null        |null
### 1.4 返回结果
```json  
{
        "nodes": [
            {
                "id": "node1",
                "color": "#333",
                "x": 100,
                "y": 200
            },
            {
                "id": "node2",
                "x": 300,
                "y": 200
            }
        ],
        "edges": [
            {
                "id": "edge1",
                "color": "red",
                "target": "node2",
                "source": "node1"
            }
        ]
    }
```
### 1.5 返回参数
字段       |字段类型       |字段说明
------------|-----------|-----------
nodes       |string        |节点模型
id       |string        |唯一
color       |string        |颜色
x       |string        |距离左侧距离
y       |string        |距离右侧距离
edges       |string        |边的数据模型
id       |string        |唯一
color       |string        |颜色
target      |string        |目标节点
source       |string        |源节点
### 1.6 错误状态码
状态码       |说明
------------|-----------
200       |成功
401       | 无权限
403  |Session失效
404|接口不存在
500|其他异常



