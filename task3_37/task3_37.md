#### 任务描述

* 参考如下设计图，实现一个浮出层的UI组件实现
![](http://7xrp04.com1.z0.glb.clouddn.com/task_3_37_1.jpg)

* 浮出层的中心默认在屏幕正中
* 当浮出层显示时，屏幕滚动时，浮出层始终保持位置固定在屏幕正中，不随屏幕滚动而变化位置。或者禁止页面在有浮出层出现时滚动
* 当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层。可以实现一个半透明的遮罩来挡住浮出层外的部分
* 浮出层的样式、内容和逻辑尽量解耦
* 提供使用JavaScript控制浮出层展现和关闭的接口

#### 任务总结
* 采用单例模式创建一个全局的浮出层
* 提供接口，接口包括控制浮出层的显示和隐藏 确认、取消按钮的绑定事件。其余所有内容封装的对象内部。