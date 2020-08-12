// 今天日期 年、月、日、星期
let nowdate = new Date();
// 年
let currentYear = nowdate.getFullYear();
// 月
let currentMonth = nowdate.getMonth();
// 日
let currentDate = nowdate.getDate();
// 星期幾
let currentDay = nowdate.getDay();
// 當月有幾天
let currentDaysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
// 當月第一天為星期幾
let currentFirstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();
// 月份中文顯示
let Monthstring = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
];

// 去年按鈕
let btnLY = document.getElementById("LastYear");
btnLY.addEventListener("click", LastYear);
// 明年按鈕
let btnNY = document.getElementById("NextYear");
btnNY.addEventListener("click", NextYear);
// 上個月按鈕
let btnLM = document.getElementById("LastMonth");
btnLM.addEventListener("click", LastMonth);
// 下個月按鈕
let btnNM = document.getElementById("NextMonth");
btnNM.addEventListener("click", NextMonth);
// 回到今天
let btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", BackToday);
// 增加行事曆按鈕
let btnNew = document.querySelector("#addClaeBtn")
// 行事曆內部按鈕-新增(預設顯示)
let btnAdd = document.querySelector("#btn-add")
// 行事曆內部按鈕-修改
let btnUpdate = document.querySelector("#btn-update")
// 行事曆內部按鈕-刪除
let btnDelete = document.querySelector("#btn-delete")

Refresh();
// 刷新表格內容
function Refresh() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";
    ShowYear();
    ShowMonth();
    ShowDate();
}
// 顯示年分
function ShowYear() {
    let h2 = document.querySelector("h2");
    h2.innerText = `${currentYear}年`;
}
//顯示月份
function ShowMonth() {
    let h4 = document.querySelector("h4");
    h4.innerText = `${Monthstring[currentMonth]}月`;
}
// 顯示行事曆
function ShowDate() {
    var td_counter = 0;
    let tbody = document.getElementById("tbody");
    var tr = document.createElement("tr");

    currentDaysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    currentFirstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();

    for (let j = 0; j < currentFirstDayofMonth; j++) {
        let td = document.createElement("td");
        td.innerText = "";
        tr.appendChild(td);
        td_counter++;
    }
    tbody.appendChild(tr);

    let markToday = false;
    let yearOfToday = nowdate.getFullYear();
    let monthOfToday = nowdate.getMonth();
    let dateOfToday = nowdate.getDate();

    for (let i = 1; i <= currentDaysOfMonth; i++) {
        let td = document.createElement("td");
        let btn = document.createElement("button");
        td.classList.add("text-center");
        // 標記今天
        if (
            markToday == false &&
            i == dateOfToday &&
            currentMonth == monthOfToday &&
            currentYear == yearOfToday
        ) {
            btn.classList.add("bg-success", "text-white","btn","btn-block","dateBtn");
            markToday = true;
        }
        else{
            btn.classList.add("btn","btn-block","dateBtn");
        }
        btn.innerText = i;
        td.appendChild(btn);
        tr.appendChild(td);
        td_counter++;

        // 換行
        if (td_counter % 7 == 0) {
            tbody.appendChild(tr);
            tr = document.createElement("tr");
            tbody.appendChild(tr);
        }
        
        if (td_counter % 7 == 0 || td_counter % 7 == 1) {
            td.classList.add("bg-danger", "text-white");
        }
    }

    while(td_counter %7 !=0){
        td = document.createElement("td");
        td.innerText = "";
        tr.appendChild(td);
        td_counter++;
    }
}

// 執行去年按鈕
function LastYear() {
    currentYear--;
    Refresh();
}
// 執行明年按鈕
function NextYear() {
    currentYear++;
    Refresh();
}
// 執行上個月按鈕
function LastMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentYear--;
        currentMonth = 11;
    }
    Refresh();
}
// 執行下個月按鈕
function NextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentYear++;
        currentMonth = 0;
    }
    Refresh();
}

// 回到今天
function BackToday(){
    currentMonth = nowdate.getMonth();
    currentYear = nowdate.getFullYear();
    Refresh();
}
