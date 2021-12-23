let locationArray = [
    {
        id: 1,
        name: "Hồ Chí Minh",
        location: [
            {
                idStore: 1,
                lat: 10.7327923,
                lng: 106.6970248,
                storeName: "Mkav Tea đại học Tôn Đức Thắng",
                address: "19 Nguyễn Hữu Thọ, phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 2,
                lat: 10.7422836,
                lng: 106.6977716,
                storeName: "Mkav Tea Lotte Mart quận 7",
                address: "469 Nguyễn Hữu Thọ, phường Tân Hưng, Quận 7, TP. Hồ Chí Minh",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 3,
                lat: 10.8274668,
                lng: 106.719508,
                storeName: "Mkav Tea Gigamall",
                address: "242 Đ. Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 4,
                lat: 10.8011622,
                lng: 106.6152058,
                storeName: "Mkav Tea Aeon Mall",
                address: "30 Đ. Tân Thắng, Sơn Kỳ, Tân Phú, Thành phố Hồ Chí Minh, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 5,
                lat: 10.7741656,
                lng: 106.7014805,
                storeName: "Mkav Tea phố đi bộ Nguyễn Huệ",
                address: "22 Nguyễn Huệ, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 700000, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            }
        ]
    }, 
    {
        id: 2,
        name: "Phú Yên",
        location: [
            {
                idStore: 1,
                lat: 13.1012724,
                lng: 109.3066399,
                storeName: "Mkav Tea vincom Tuy Hòa",
                address: "ĐL Hùng Vương, Phường7, Tuy Hòa, Phú Yên, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 2,
                lat: 13.1907432,
                lng: 109.2948169,
                storeName: "Mkav Tea Tuy An",
                address: "An Chấn, Phú Yên, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            }
        ]
    },
    {
        id: 3,
        name: "Kiên Giang",
        location: [
            {
                idStore: 1,
                lat: 10.0030007,
                lng: 105.0790266,
                storeName: "Mkav Tea vincom Rạch Giá",
                address: "Phường Vĩnh Bảo, Tp. Rạch Giá, Kiên Giang, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            },
            {
                idStore: 2,
                lat: 10.07398,
                lng: 105.0840025,
                storeName: "Mkav Tea Phi Thông",
                address: "Chợ, Tp. Rạch Giá, Kiên Giang, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            }
        ]
    },
    {
        id: 4,
        name: "Đồng Tháp",
        location: [
            {
                idStore: 1,
                lat: 10.2910912,
                lng: 105.7622278,
                storeName: "Mkav Tea vincom Sa Đéc",
                address: "Phường 1, Sa Đéc, Đồng Tháp, Việt Nam",
                tel: "0865997531",
                time: "Thứ Hai - Chủ Nhật: 09h00 - 22h00"
            }
        ]
    }
]

let infoWindowContent = []
let markerArr = []


function showMap() {
    initMap(1)
    document.querySelector('#btn-search-location').addEventListener('click', function () {
        // return parseInt(document.querySelector("#map-select").value)
        const locationId = parseInt(document.querySelector("#map-select").value)
        initMap(locationId)
    })
}

function initMap(locationId) {
    let locations = loadListLocation(locationId)
    let location = locations.location

    let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: location[0].lat, lng: location[0].lng },
        zoom: 12,
    })

    let infoWindow = new google.maps.InfoWindow()

    displayStoreListHeader(locations)

    location.forEach((loc, index) => {
        let marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: map,
            title: `
                <div class="map-marker">
                    <h3>${loc.storeName}</h3>
                    <p>
                        <span>Địa chỉ</span> 
                        <span>${loc.address}</span>
                    <p>
                    <p>
                        <span>Điện thoại</span> 
                        <span>${loc.tel}</span>
                    <p>
                    <p>
                        <span>Giờ mở cửa</span> 
                        <span>${loc.time}</span>
                    <p>
                    <a target="_blank" href="https://www.google.com/maps/place/${loc.lat},${loc.lng}">Chỉ đường</a>
                </div>
            `
        })

        google.maps.event.addListener(marker, "click", (function (marker) {
            infoWindowContent[loc.idStore] = marker.getTitle()
            return function () {
                let content = marker.getTitle()
                infoWindow.setContent(content)
                infoWindow.open(map, marker)
            }
        })(marker))

        markerArr[loc.idStore] = marker

        displayListStore(loc, index, map, infoWindow)
    })
}

function loadListLocation(locationId) {
    let location = {}
    locationArray.forEach(loc => {
        if (loc.id === locationId) {
            location = loc
        }
    })

    return location
}

function displayStoreListHeader(locations) {
    let child = 
        `
            <h2>${locations.name}</h2>
            <ul id="list-location">
            </ul>
        `
    document.querySelector("#store-list").innerHTML = child
}

function displayListStore(location, index, map, infoWindow) {
    let li = document.createElement("li")
    li.setAttribute("id", `location${index}`)
    li.innerHTML =
        `
            <h4>${location.storeName}</h4>
            <p>${location.address}</p>
        `


    document.querySelector("#list-location").appendChild(li)

    document.querySelector(`#location${index}`).addEventListener("click", function () {
        map.setCenter({ lat: location.lat, lng: location.lng }, 15)
        infoWindow.setContent(infoWindowContent[location.idStore])
        infoWindow.open(map, markerArr[location.idStore])
    })
}

function displayMarker(location, map, infoWindow) {
        map.setCenter({ lat: location.lat, lng: location.lng }, 15)
        infoWindow.setContent(infoWindowContent[location.idStore])
        infoWindow.open(map, markerArr[location.idStore])
}