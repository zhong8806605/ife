/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/*
 * 渲染图表
 */
function renderChart() {
    var aqi_chart_wrap = document.getElementById("aqi-chart-wrap");
    var newNode;
    aqi_chart_wrap.innerHTML = "";
    for (var item in chartData) {
        newNode = document.createElement("div");
        newNode.className = "common";
        switch (pageState.nowGraTime) {
        case "day":
            newNode.style.width = "0.5rem";
            newNode.style.height = chartData[item] + "px";
            break;
        case "week":
            newNode.style.width = "2rem";
            newNode.style.height = chartData[item] + "px";
            break;
        case "month":
            newNode.style.width = "5rem";
            newNode.style.height = chartData[item] + "px";
            break;
        }
        newNode.title =item;
        aqi_chart_wrap.appendChild(newNode);
    }
}

/*
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    if (event.target.type === "radio") {
        // 设置对应数据
        pageState.nowGraTime = event.target.value;
        initAqiChartData();
        // 调用图表渲染函数
        renderChart()
    }

}



/*
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    // 设置对应数据
    if (event.target.text !== undefined) {
        pageState.nowSelectCity = event.target.text;
        // 调用图表渲染函数
        initAqiChartData();
        renderChart()
    }
}

/*
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect_node = document.getElementById("city-select");
    var optionCity_node;
    for (var item in aqiSourceData) {
        optionCity_node = document.createElement("option");
        optionCity_node.innerHTML = item;
        citySelect_node.appendChild(optionCity_node);
    }
    initAqiChartData();
    renderChart();
}

/*
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = {};
    var curCityData = aqiSourceData[pageState.nowSelectCity];
    var flag = 0;
    var num = 1;
    var newData = {};
    var count = 0;
    var title = "";
    var count = 0;
    switch (pageState.nowGraTime) {
    case "day":
        chartData = curCityData;
        break;
    case "week":
        for (var item in curCityData) {
            count += curCityData[item];
            flag += 1;
            if (flag === 7) {
                count = count / 30;
                title = "第" + num + "周"
                chartData[title] = count;
                count = 0;
                flag = 0;
                num++;
            }
        }
        break;
    case "month":
        for (var item in curCityData) {
            count += curCityData[item];
            flag += 1;
            if (flag === 30) {
                count = count / 30;
                title = "第" + num + "月"
                chartData[title] = count;
                count = 0;
                flag = 0;
                num++;
            }
        }
        break;
    }
}

//绑定事件
function initEvent() {
    document.getElementById("form-gra-time").onclick = graTimeChange;
    document.getElementById("city-select").onclick = citySelectChange;
}
/*
 * 初始化函数
 */
function init() {
    initEvent();
    initCitySelector();
    initAqiChartData();
}
init();