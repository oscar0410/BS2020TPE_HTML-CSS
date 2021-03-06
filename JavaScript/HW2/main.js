        //表中的數據項
        var bodyData = [{
            Country: "台灣",
            Confirmed: 455,
            Recovery: 440,
            Death: 7
        },
        {
            Country: "美國",
            Confirmed: 3970000,
            Recovery: 1160000,
            Death: 144000
        },
        {
            Country: "巴西",
            Confirmed: 2170000,
            Recovery: 1470000,
            Death: 81597
        },
        {
            Country: "印度",
            Confirmed: 1190000,
            Recovery: 753000,
            Death: 28732
        },
        {
            Country: "俄羅斯",
            Confirmed: 789000,
            Recovery: 572000,
            Death: 12745
        },
        
    ];
    //定義表頭內容
    var headData = ["地區", "已確診", "康復人數", "死亡人數"];


    var box = document.getElementById("box");

    creatTable(box, headData, bodyData);


    function creatTable(parent, headData, bodyData) {

        var table = creatHead(parent, headData); //thead
        creatBody(table, bodyData); //tbody
        createTotal(table);

    }
    //定義創建表頭的函數
    function creatHead(parent, headData) {
        // table標籤產生
        var table = document.createElement("table");
        parent.appendChild(table);
        table.border = "1px";
        table.width = "500px";

        // thead標籤產生
        var thead = document.createElement("thead");
        table.appendChild(thead);
        // thead中tr產生
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        tr.style.height = "35px";
        tr.style.background = "lightgray";

        // thead資料填入 th
        headData.forEach(function (item) {
            // th標籤產生
            var th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = item;
        })
        return table;
    }

    // 將tbody資料塞入 table
    function creatBody(table, bodyData) {
        // tbody區域產生
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);

        // 針對物件陣列，每一物件依序將資料寫入
        bodyData.forEach(function (item) {
            // tbody中tr標籤產生 
            tr = document.createElement("tr");
            tbody.appendChild(tr);
            // 產生td
            for (var index in item) {
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerHTML = item[index];
            }
        })
    };

    function createTotal(table) {
        // 列總數
        var rows = table.rows;
        // 行總數
        var cells = table.cells;
        var colums = table.rows[0].cells.length;

        // 產生tr
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        tr = document.createElement("tr");
        tbody.appendChild(tr);

        var td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = "總計";

        for (let j = 1; j < colums; j++) {
            var sum = 0;
            for (let i = 1; i < rows.length - 1; i++) {
                var a = parseInt(rows[i].cells[j].innerHTML.trim());
                sum = sum + a;
            }
            var td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = sum;
        }
    }