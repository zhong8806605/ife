 var Calendar = function () {
     //私有方法
     // 渲染日历的控制
     var renderTitle = function (currDay) {
             var captionNode = document.createElement("caption");
             captionNode.innerHTML = "<span class='calendarLastMonth'></span><div class='calendarCurDay'>" + currDay + "</div><span class='calendarNextMonth'></span>"
             return captionNode;
         },

         //渲染当前的日期
         renderCurDay = function (currDay) {
             var curDivNode = document.createElement("div");
             curDivNode.innerHTML = currDay;
             curDivNode.classList.add("calendarCurDay");
             return curDivNode;
         },

         //渲染头部
         renderHead = function () {
             var headNode = document.createElement("thead");
             headNode.innerHTML = "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>"
             headNode.classList.add("calendarThead");
             return headNode;
         },

         //渲染内容
         renderTbody = function (year, mon) {
             var doc = document;
             var bodyNode, data, firstDay, dayNums;
             bodyNode = doc.createElement('tbody');
             //获取第一天的星期 该月的天数
             data = new Date(year, mon, 1);
             firstDay = data.getDay();
             //             data.setMonth(mon);
             data.setDate(0);
             dayNums = data.getDate();
             for (var i = 1; i <= dayNums;) {
                 var trNode = doc.createElement("tr");
                 for (var j = 0; j < 7 && i <= dayNums; j++, i++) {
                     var tdNode = doc.createElement("td");
                     for (; firstDay > 1; firstDay--, j++) {
                         var temTdNode = doc.createElement("td");
                         trNode.appendChild(temTdNode);
                     }
                     tdNode.innerHTML = i;
                     trNode.appendChild(tdNode);
                 }
                 bodyNode.appendChild(trNode);
             }
             return bodyNode;
         },

         //渲染整个日历
         renderCalendar = function (data, title, offsetX, offsetY) {
             var table = document.createElement("table");
             table.appendChild(renderTitle(title));
             table.appendChild(renderHead());
             table.appendChild(renderTbody(data.getFullYear(), data.getMonth()));
             table.classList.add("calendarTable");
             return table;
         },

         //日历类
         _calendar = function (options) {
             var _self = this,

                 renderNewMonth = function () {
                     var title = _self.data.getFullYear() + "年" + (_self.data.getMonth() + 1) + "月";
                     _self.e.querySelector("caption").replaceChild(renderCurDay(title), _self.e.querySelector(".calendarCurDay"));
                     _self.e.replaceChild(renderTbody(_self.data.getFullYear(), _self.data.getMonth()),
                         _self.e.querySelector("tbody"));
                 },

                 clickEvent = function (Event) {
                     if (Event.target.classList.contains("calendarLastMonth")) {
                         _self.data.setMonth(_self.data.getMonth() - 1);
                         renderNewMonth();
                     }
                     if (Event.target.classList.contains("calendarNextMonth")) {
                         _self.data.setMonth(_self.data.getMonth() + 1);
                         renderNewMonth();
                     }
                 },

                 mouseleaveEvent = function (Event) {
                     _self.hide();
                 },

                 addEvent = function () {
                     _self.options.field.addEventListener("click", _self.show.bind(_self));
                     _self.e.addEventListener("click", clickEvent);
                     _self.e.addEventListener("mouseleave", mouseleaveEvent)
                 },

                 init = function () {
                     _self.data = new Date();
                     _self.e = renderCalendar(_self.data, _self.data.toDateString());
                     _self.options = options;
                     _self.draw();
                     _self.hide();
                 };
             init();
             addEvent();
         };
     //对象原型，共有部分
     _calendar.prototype = {
         show: function () {
             this.e.style.display = "table"
         },
         hide: function () {
             this.e.style.display = "none"
         },
         draw: function () {
             document.body.appendChild(this.e);
         }
     }
     return _calendar;
 }()