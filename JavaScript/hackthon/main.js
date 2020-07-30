var map;
var marker = [];
var currentInfoWindow = "";
var card_title;
var card_text;

function initMap() {
  var LatLng = {
    lat: 25.0415956,
    lng: 121.5362985,
  };
  map = new google.maps.Map(document.getElementById("map"), {
    center: LatLng,
    zoom: 16,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
}
let url = "https://maskmap.azurewebsites.net/api/mask/getmaskstock";
let xhr = new XMLHttpRequest();
let dataArray = [];

window.onload = function () {
  xhr.open("GET", url);
  xhr.send();
  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      dataArray = JSON.parse(this.responseText);

      // // 抓到的資料
      // console.log(dataArray);
      // // 總長度
      // console.log(dataArray.features.length);
      // // 第一筆資料
      // console.log(dataArray.features[0]);

      // 顯示位置
      for (let index = 0; index < dataArray.features.length; index++) {
        let latLng = dataArray.features[index].geometry.coordinates;
        let shopName = dataArray.features[index].properties.name;
        let shopId = dataArray.features[index].properties.id;
        let adultMasks = dataArray.features[index].properties.masksLeft;
        let childMasks = dataArray.features[index].properties.childMasksLeft;

        AddMarker(index, latLng, shopName, shopId, adultMasks, childMasks);
      }
    } else {
      alert(`錯誤代碼: ${xhr.status}`);
    }
  };
};

function AddMarker(index, pos, name, id, adult, child) {
  // 預設icon
  var icon_url = "http://maps.google.com/mapfiles/kml/paddle/red-circle.png";
  if (adult > 50) {
    icon_url = "http://maps.google.com/mapfiles/kml/paddle/grn-circle.png";
  } else if (adult > 20) {
    icon_url = "http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png";
  }

  let icon = {
    url: icon_url,
  };

  marker[index] = new google.maps.Marker({
    position: {
      lat: pos[1],
      lng: pos[0],
    },
    map: map,
    icon: icon,
  });
  var msg =
    "<h2>店名: " + name +"</h2>" +
    "<h4>店家代碼: " + id + "</h4>" +
    "<span>成人剩餘口罩: " + adult + "</span>" +
    "<span>, 兒童剩餘口罩: " + child + "</span>";

  AddInfoWindow(marker[index], msg, name, adult, child);
}


function AddInfoWindow(marker, message, name, adult, child) {
  var infoWindow = new google.maps.InfoWindow({
    content: message,
  });

  google.maps.event.addListener(marker, "click", function () {
    if (currentInfoWindow != "") {
      currentInfoWindow.close();
      currentInfoWindow = "";
    }

    currentInfoWindow = infoWindow;
    infoWindow.open(map, marker);

    card = document.getElementById("card");
    card_title = document.querySelector("#card-title");
    card_text = document.querySelector("#card-text");

    card.classList.remove("d-none");
    card.classList.add("d-inline");
    card_title.innerHTML = name;
    card_text.innerHTML = `成人口罩剩餘:${adult}<br>兒童口罩剩餘:${child}`;
  });
}
