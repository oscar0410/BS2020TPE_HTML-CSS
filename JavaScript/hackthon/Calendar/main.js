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
let btnNew = document.querySelector("#addClaeBtn");
btnNew.addEventListener("click", ModalDefault);
// 行事曆內部按鈕-新增(預設顯示)
let btnAdd = document.querySelector("#btn-add");
btnAdd.addEventListener("click", AddSchdule);
// 行事曆內部按鈕-修改
let btnUpdate = document.querySelector("#btn-update");
btnUpdate.addEventListener("click", UpdateSchdule)
// 行事曆內部按鈕-刪除
let btnDelete = document.querySelector("#btn-delete");
btnDelete.addEventListener("click",DeleteSchdule)

Refresh();
// 刷新表格內容
function Refresh() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";
    ShowYear();
    ShowMonth();
    ShowDate();
    ShowSchedule(currentYear, currentMonth);
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
            btn.classList.add(
                "bg-success",
                "text-white",
                "btn",
                "btn-block",
                "dateBtn"
            );
            markToday = true;
        } else {
            btn.classList.add("btn", "btn-block", "dateBtn");
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

    while (td_counter % 7 != 0) {
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
function BackToday() {
    currentMonth = nowdate.getMonth();
    currentYear = nowdate.getFullYear();
    Refresh();
}

// 切換Modal Button
function ModalDefault() {
    btnAdd.classList.remove("d-none");
    btnDelete.classList.add("d-none");
    btnUpdate.classList.add("d-none");
    // input清空
    let input = document.querySelectorAll("input");
    input.forEach((element) => (element.value = ""));
}

// 新增行事曆
function AddSchdule(val) {
    let title = document.querySelector("#title").value;
    let date = document.querySelector("#date").value;
    let time = document.querySelector("#time").value;
    let details = document.querySelector("#details").value;

    if (title == "" || date == "" || time == "") {
        alert("標題、時間、日期 缺一不可!!!");
        return false;
    } else {
        if (typeof value == "string") {
            localStorage.removeItem(value);
        }
        SetLocalStorage(title, date, time, details);
        $("#Schedule").modal("hide");
        Refresh();
    }
}
// 將行程儲存至LS
function SetLocalStorage(title, date, time, details){
    // 建立物件
    let data = {
        title: title,
        date: date,
        time: time,
        details: details,
    };
    // 物件轉成JSON格式儲存至LocalStorage
    localStorage.setItem(Date.now(), JSON.stringify(data));
};
// 顯示該年該月的行程
 function ShowSchedule(year, month){
    for (var i = 0; i < localStorage.length; i++) {
        let getdata = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let dataDate = getdata.date;

        if (year + "-" + month.toString().padStart(2, "0") == dataDate.substring(0, 7)
        ) {
            let key = localStorage.key(i);
            let title = data.title.toString();
            let target = document.getElementById(dataDate);
            let btnSche = document.createElement("button");
            btnSche.classList.add("btn", "btn-block", "border", "border-secondary");
            if (title.length <= 3) {
                btnSche.textContent = title
            }
            else {
                btnSche.textContent = title.substring(0, 3) + "....."
            }
            btnSche.dataset.toggle = "modal";
            btnSche.dataset.target = "#Schedule";

            btnSche.addEventListener("click", function () {
                //Model按鈕
                // 新增 X 修改 O 刪除 O
                btnAdd.classList.add("d-none");
                btnDelete.classList.remove("d-none");
                btnUpdate.classList.remove("d-none");
                document.querySelector("#ScheduleTitle").textContent = "顯示/修改";


                btnDelete.setAttribute("value", key);
                btnUpdate.setAttribute("value", key);

                document.querySelector("#title").value = getdata.title;
                document.querySelector("#date").value = dataDate;
                document.querySelector("#time").value = getdata.time;
                document.querySelector("#contents").value = getdata.contents;
                document.querySelector("#color").value = getdata.color;
                document.querySelector("#position").value = getdata.position;

            });
            target.appendChild(btnSche);
        }
    }
};

function DeleteSchdule(){
    localStorage.removeItem(this.value);
        $('#todoModal').modal('hide');
        showCalendar(currentYear, currentMonth);
}

function UpdateSchdule(){
    AddSchdule(this.value)
}