function iPhonePic() {
    document.getElementById("ProductPic").src ="pic/iphone11-select-2019-family.jpg"
}

function MacProPic() {
    document.getElementById("ProductPic").src ="pic/mbp13touch-silver-select-202005_GEO_TW.jpg"
}

function iPadPic() {
    document.getElementById("ProductPic").src ="pic/ipad-hero-unselected-201909_GEO_TW.jpg"
}

function GrayiPad() {
    document.getElementById("ProductPic").src ="pic/ipad-wifi-select-space-201909_GEO_TW.png"
}

function SliveriPad() {
    document.getElementById("ProductPic").src ="pic/ipad-wifi-select-silver-201909_GEO_TW.png"
}

function GoldiPad() {
    document.getElementById("ProductPic").src ="pic/ipad-wifi-select-gold-201909_GEO_TW.png"
}

function spec(num) {
    var normalSpec = document.getElementById("normal-spec");
    var highSpec = document.getElementById("high-spec");
    var result = 0;
    var normalprice, highprice=0;
    if (num == 32) {
        normalprice = "10,900";
        highprice = "15,400";
        normalSpec.innerText = `NT$${normalprice}`;
        highSpec.innerText = `NT$${highprice}`;
        document.getElementById("final-price").innerText = "NT$10,900";

    } else if (num == 128) {
        normalprice = "13,900";
        normalSpec.innerText = `NT$${normalprice}`;
        highprice = "18,400";
        highSpec.innerText = `NT$${highprice}`;
        document.getElementById("final-price").innerText = "NT$13,900";
    }

}

function NormalPrice(){
    var result="";        
    result = document.getElementById("normal-spec").innerText;
    document.getElementById("final-price").innerText = result;
}

function HighPrice(){
    var result="";        
    result = document.getElementById("high-spec").innerText;
    document.getElementById("final-price").innerText = result;
}