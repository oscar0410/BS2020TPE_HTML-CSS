    // 取得顯示攔
    var text = document.getElementById("stream");
    // 暫存輸入運算子
    var temp;
    // 運算子
    var operator;
    // 是否已有運算子
    var hasOperator = false;
    // 判斷"."是否有
    var hasDot = false;

    // 小數點精準校正
    function roundDecimal(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, (
            precision || 0));
    }

    // 數字處理
    function Digital(num) {
        // 小數點已存在
        if ((text.value.indexOf(".") > -1 && num.value == ".")|| hasDot==true) {
            return false;
        }
        // 小數點還沒有在字串中
        else {
            // 若是還沒輸入數字時
            if (text.value == "" && num.value == ".") {
                text.value += "0";
                text.value += num.value;
            }
            // 已有數字時
            else {
                text.value += num.value;
            }            
        }
    }
    // AC鍵
    function AllClear() {
        text.value = "";
        temp = null;
        operator = null;
    }
    // 正負號鍵
    function PlusOrMinus(sign) {
        if (text.value.indexOf("-") > -1 && sign.value == "^") {
            var items = text.value.split("-");
            text.value = items.join("");
            // console.log(text.value);
        } else {
            if (text.value == "") {

            } else {
                text.value = ("-" + text.value);
                // console.log(text.value);
            }
        }
    }
    // 運算子處理
    function Operater(oper) {
        operator = oper.value;
        // 尚未輸入數字時，不能有運算子
        if (text.value == "") {
            return false;
        }

        if (hasOperator) {}
        else {
            text.value += operator;
            hasOperator = true;
        }
        hasDot = false;
        console.log(`Operater函式中的hasDot :${hasDot}`)
    }
    // "="鍵處理
    function GetResult() {
        if (text.value == "") {}
        else {
            text.value = roundDecimal(eval(text.value),8);
            hasOperator = false;
        }
    }
    // 百分比鍵
    function Percent() {
        if (text.value == "") {}
        else {
            text.value /= 100;
        }
    }