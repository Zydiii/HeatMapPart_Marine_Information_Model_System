import Overlay from 'ol/Overlay';
import * as olProj from 'ol/proj'

export function showInfo(map, iconInfoLayer) {
    map.removeLayer(iconInfoLayer);

    var container = document.getElementById("popup");
    var content = document.getElementById("popup-content");
    // var popupCloser = document.getElementById("popup-closer");

    iconInfoLayer = new Overlay({
        positioning: 'center-center',
        // stopEvent: false,
        offset: [0, -40],
        //设置弹出框的容器
        element: container,
        //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
        autoPan: true
    });
    map.addOverlay(iconInfoLayer);

    map.on('click', function (e) {
        //在点击时获取像素区域
        var pixel = map.getEventPixel(e.originalEvent);
        iconInfoLayer.setPosition(undefined);
        map.forEachFeatureAtPixel(pixel, function (feature) {
            if (feature.get('name') == 'icon') {
                //coodinate存放了点击时的坐标信息
                var coodinate = e.coordinate;
                //设置overlay的显示位置
                iconInfoLayer.setPosition(coodinate);

                coodinate = olProj.toLonLat(coodinate);
                //设置弹出框内容，可以HTML自定义
                content.innerHTML = "<p> W：" + coodinate[0].toFixed(6) + "°" + "<br>" + "E: " + coodinate[1].toFixed(6) + "°" + "</p>";
                //显示overlay
                // map.addOverlay(iconInfoLayer);
                //console.log(feature)
            }
            else {
                iconInfoLayer.setPosition(undefined);
            }

        });
    });

    // popupCloser.addEventListener('click', function () {
    //     iconInfoLayer.setPosition(undefined);
    // });
}