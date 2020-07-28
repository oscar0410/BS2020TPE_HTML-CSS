let row = document.getElementById("row");
        // 資料站存區
        let dataArray = [];
        let xhr = new XMLHttpRequest();
        // 需要做Request的網站
        let url = "https://raw.githubusercontent.com/oscar0410/FileStorage/master/pizza.json";

        window.onload = function () {
            xhr.open("GET", url);
            xhr.send();
            xhr.onload = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 將JSON檔轉成物件
                    dataArray = JSON.parse(this.responseText);
                    console.table(dataArray);
                    dataArray.forEach(element => {
                        // 取得Template的ID
                        let pizzaCard = document.getElementById("pizzaCard");
                        // Clone內容
                        let clonecontent = pizzaCard.content.cloneNode(true);
                        // 選取複製容器內的內容物
                        // 圖片
                        let img = clonecontent.querySelector("img");
                        img.src = element["Img"];
                        // 中文名
                        let h5 = clonecontent.querySelector("h5");
                        h5.innerText = element["Chinese"];
                        // 英文名
                        let p = clonecontent.querySelector("p");
                        p.innerText = element["English"]
                        // 按鈕
                        let btn = clonecontent.querySelector("button");
                        // 按鈕按擊觸發事件
                        btn.addEventListener("click", function () {
                            // 取得modal
                            let modal = document.querySelector("#exampleModal");
                            // 設定modal的內容物
                            // 中文名
                            let modalh5 = modal.querySelector("h5");
                            modalh5.innerText = element["Chinese"];
                            // 英文名
                            let modalp = modal.querySelector("p");
                            modalp.innerText = element["English"]
                            // 圖片
                            let modalimg = modal.querySelector("img");
                            modalimg.src = element["Img"];

                            // 餡料
                            let modalstuf = modal.querySelector("#stuf");
                            modalstuf.innerText = element["Stuf"];
                            // 美味說明
                            let modaldescri = modal.querySelector("#description");
                            modaldescri.innerText = element["Descri"];
                            // 價格
                            let modalprice = modal.querySelector("#price");
                            modalprice.innerText = element["Price"];
                        });
                        console.log(clonecontent);
                        row.append(clonecontent);
                    });


                } else {
                    msg.innerHTML = "發生錯誤 " + xhr.status;
                }
            }
        }