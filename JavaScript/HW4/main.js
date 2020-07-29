
        $("#tbody").val("");
        var numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var answer = [];
        var times = 0;


        for (i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * numArray.length);
            answer.push(numArray[index]);
            numArray.splice(index, 1);
        }

        $("#submit").click(function () {
            var a = 0;
            var b = 0;
            var guess = $("#input").val();
            $("#input").val("");
            if (isFourNumber(guess)) {
                if (isRepeatNumber(guess) == false) {

                    for (let i = 0; i < 4; i++) {
                        let indx = answer.indexOf(guess[i]);
                        if (indx != -1) {
                            if (indx == i) {
                                a++;
                            } else {
                                b++;
                            }
                        }
                    }
                    times += 1;
                    $('tbody').append(`<tr><td>${times}</td> <td>${guess}</td> <td>${a}A${b}B</td> </tr>`);

                    if (a == 4) {
                        alert("猜到了~遊戲結束");
                        $('tbody').append(`<tr><td></td><td>遊戲結束</td><td></td></tr>`);
                        document.getElementById("input").disabled = true;
                        $("#show").addClass("disabled");
                        $("#submit").addClass("disabled");
                        $("#retry").text("重玩一次");
                    }

                } else {
                    alert("有重複數字，請重新輸入!");
                }
            } else {
                alert("請輸入四位數字!");
            }

        })

        $("#show").click(function () {
            alert(`${answer[0]}${answer[1]}${answer[2]}${answer[3]}`);
        })

        $("#retry").click(function () {
            numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            answer = [];
            times = 0;
            for (i = 0; i < 4; i++) {
                let index = Math.floor(Math.random() * numArray.length);
                answer.push(numArray[index]);
                numArray.splice(index, 1);
            }
            $("tbody").empty();
            document.getElementById("input").disabled = false;
            $("#show").removeClass("disabled");
            $("#submit").removeClass("disabled");
            $("#retry").text("放棄重來");
        })

        // 判斷是否為純數字 
        function isFourNumber(val) {
            var reg = /^[0-9]{4}$/;
            return reg.test(val);
        }

        // 判斷有無重複數字內容
        function isRepeatNumber(val) {
            let valArray = [];
            for (let i = 0; i < 4; i++) {
                valArray[i] = Math.floor(val / Math.pow(10, (3 - i)));
                val = Math.floor(val % Math.pow(10, (3 - i)))
            }
            valArray = valArray.sort();
            let repeatItem = false;
            for (let index = 0; index < valArray.length; index++) {
                if (valArray[index] == valArray[index + 1]) {
                    repeatItem = true;
                    break
                }
            }
            return repeatItem;
        }