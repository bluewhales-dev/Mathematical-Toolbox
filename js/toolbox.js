/*!
 * Tool box js contains all basic functions and interfaces
 *
 * by Ayola Jayamaha
 * Date: 2016-09-10
 */

var selectedItem = '';
var selectedMethod = '';
var radius1 = 0;
var lock = false;
var circle = false;
var fabricCanvas = new fabric.Canvas('canvas1');
var rclicked =false;
var cclicked =false;
var lclicked =false;


$('#ir').click(function () {
    if(rclicked==false) {
        selectedMethod = 'r';
        selectedItem = 'a';
        clearvalues();
        fabricCanvas.renderAll();
        $('#ir').css("opacity", "1");
        $('#ic').css("opacity", "0.4");
        $('#il').css("opacity", "0.4");
        $('#compass').hide();
        $('#ruler').show();
        $('#label').hide();
        $('#extension').show();
        $('#textLabel').text('Select starting point');
        var obj = fabricCanvas.getActiveObject();
        if (obj != null) {
            obj.active = false;
            obj.selected = false;
            fabricCanvas.renderAll();
        }
        rclicked=true;
        lclicked=false;
        cclicked=false;
    }
    else{
        $('#ir').css("opacity", "0.4");
        selectedMethod = '';
        selectedItem = '';
        rclicked=false;
		$('#ruler').hide();
		$('#textLabel').text('');
    }
});

$('#ic').click(function () {
    if(cclicked==false) {
        selectedMethod = 'c';
        selectedItem = 'c';
        clearvalues();
        fabricCanvas.renderAll();
        $('#compass').show();
        $('#ic').css("opacity", "1");
        $('#ruler').hide();
        $('#ir').css("opacity", "0.4");
        $('#label').hide();
        $('#il').css("opacity", "0.4");
        $('#pickC').hide();
        $('#extension').hide();
        $('#textLabel').text('Select center');
        var obj = fabricCanvas.getActiveObject();
        if (obj != null) {
            obj.active = false;
            obj.selected = false;
            fabricCanvas.renderAll();
        }
        cclicked=true;
        rclicked=false;
        lclicked=false;
    }
    else{
        $('#ic').css("opacity", "0.4");
        selectedMethod = '';
        selectedItem = '';
        cclicked=false;
        $('#compass').hide();
        $('#textLabel').text('');
    }
});

$('#il').click(function () {
    if(lclicked==false) {
        selectedMethod = 'l';
        selectedItem = 'l';
        clearvalues();
        fabricCanvas.renderAll();
        $('#label').show();
        $('#il').css("opacity", "1");
        $('#ruler').hide();
        $('#ir').css("opacity", "0.4");
        $('#compass').hide();
        $('#ic').css("opacity", "0.4");
        $('#pickL').hide();
        $('#extension').hide();
        $('#textLabel').text('Click on label position');
        lclicked=true;
        rclicked=false;
        cclicked=false;
    }
    else{
        $('#ic').css("opacity", "0.4");
        selectedMethod = '';
        selectedItem = '';
        lclicked=false;
        $('#label').hide();
        $('#textLabel').text('');
        fabricCanvas.forEachObject(function(o
        ) {
            o.hasControls =true;
            o.active=true;
            console.log(o);
        });
    }
});

function setL(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);
    var newText = new fabric.IText("", {
        left: mousePos.x * 50,
        top: mousePos.y * 50,
        fontFamily: 'Times_New_Roman',
        fontSize: 20,
        hasControls: true,
        hasRotatingPoint: true,
        selected: true,
        editable: true,
        selectable: true
    });
    fabricCanvas.add(newText);
    fabricCanvas.setActiveObject(newText);
    newText.selectAll();
    newText.enterEditing();
    newText.hiddenTextarea.focus();
}

function setA(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);
    $('#x1').val(mousePos.x);
    $('#y1').val(mousePos.y);
    $('#textLabel').text('Select ending point');
}

function setB(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);
    $('#x2').val(mousePos.x);
    $('#y2').val(mousePos.y);
}

function setC(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);
    $('#x').val(mousePos.x);
    $('#y').val(mousePos.y);
}

function clearvalues() {
    $('#x').val("");
    $('#y').val("");
    $('#x1').val("");
    $('#y1').val("");
    $('#x2').val("");
    $('#y2').val("");
    $('#ea').val("");
    $('#sa').val("");
    $('#xx').val("");
    $('#yy').val("");
    $('#e1').val("");
    $('#e2').val("");
    $('#radius').val("");
    $('#txt').val("");
}

function setR(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);

    if (document.getElementById('rad1').checked) {
        lock = true;
        circle = false;
    }
    else if (document.getElementById('rad2').checked) {
        lock = false;
        circle = false;
    }
    else if (document.getElementById('rad4').checked) {
        lock = false;
        $('#radius').val(Math.sqrt(($('#x').val() - (mousePos.x) ) * ($('#x').val() - (mousePos.x)) + ($('#y').val() - (mousePos.y )) * ($('#y').val() - (mousePos.y))).toFixed(1));
        circle = true;
    }

    if (lock == true) {
        if (radius1 > 0)
            $('#radius').val(radius1);
    } else {
        $('#radius').val(Math.sqrt(($('#x').val() - (mousePos.x )) * ($('#x').val() - (mousePos.x )) + ($('#y').val() - (mousePos.y )) * ($('#y').val() - (mousePos.y ))).toFixed(1));
        radius1 = $('#radius').val();
    }

    if (circle == true) {
        $('#sa').val(0);
    }
    else {

        if (Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) >= 0) {
            if (mousePos.y <= $('#y').val()) {
                //2nd quadrant
                $('#sa').val((270 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            } else {
                //4th quadrant
                $('#sa').val((90 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            }
        } else {
            if (mousePos.y <= $('#y').val()) {
                //1st quadrant
                $('#sa').val((270 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * (180)).toFixed(0));
            } else {
                //3rd quadrant
                $('#sa').val((90 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * (180)).toFixed(0));
            }
        }

    }


}

//set ending angle
function setAngle(evt) {
    var mousePos = getMousePointer(fabricCanvas, evt);

    if (circle == true) {
        $('#ea').val(360);
    }
    else {

        if (Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) >= 0) {
            if (mousePos.y <= $('#y').val()) {
                $('#ea').val((270 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            } else {
                $('#ea').val((90 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            }
        } else {
            if (mousePos.y <= $('#y').val()) {
                $('#ea').val((270 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            } else {
                $('#ea').val((90 - Math.atan((mousePos.x - $('#x').val()) / (mousePos.y - $('#y').val())) / Math.PI * 180).toFixed(0));
            }
        }

    }

}

//padding around grid

function init() {
    $('#ruler').hide();
    $('#pickA').hide();
    $('#pickB').hide();
    $('#compass').hide();
    $('#label').hide();
    fabricCanvas.setHeight(500);
    fabricCanvas.setWidth(800);
}


function compass() {

    //arc(center coordinates,radius,start angle,end angle,anticlockwise)
    var x = document.getElementById('x').value * 50;
    var y = document.getElementById('y').value * 50;
    var radius = document.getElementById('radius').value * 50;
    var startAngle = document.getElementById('sa').value;
    var endAngle = document.getElementById('ea').value;
    var clc = document.getElementById('clc').value;
    startAngle = startAngle * Math.PI / 180;
    endAngle = endAngle * Math.PI / 180;

    var fabricCircle = new fabric.Circle({
        radius: radius,
        left: x - radius,
        top: y - radius,
        angle: 0,
        startAngle: startAngle,
        endAngle: endAngle,
        stroke: clc,
        strokeWidth: 1,
        fill: ''
    });
    fabricCanvas.add(fabricCircle);
    fabricCanvas.renderAll();
}


function ruler() {

    var x1 = document.getElementById('x1').value * 50;
    var y1 = document.getElementById('y1').value * 50;
    var x2 = document.getElementById('x2').value * 50;
    var y2 = document.getElementById('y2').value * 50;
    var e1 = document.getElementById('e1').value * 50;
    var e2 = document.getElementById('e2').value * 50;
    var x0 = x3 = y3 = y0 = 0;
    var rcolor = document.getElementById('clr').value;

    if (e1 > 0) {
        var m0 = (y1 - y2) / (x1 - x2);

        x0 = x1 - (e1 / Math.sqrt(m0 * m0 + 1));


        //line parallel to y axis
        if (x1 == x2) {
            y0 = y1 - e1;
        } else {
            var test = (y1 - y2) / (x1 - x2) * (x0 - x1);
            if (test < 0)
                y0 = y1 - Math.abs(test);
            else
                y0 = y1 + Math.abs(test);
        }

        x1 = x0;
        y1 = y0;

    }

    if (e2 > 0) {
        var m1 = (y1 - y2) / (x1 - x2);
        var x3 = x2 + (e2 / Math.sqrt(m1 * m1 + 1));
        var y3 = 0;

        //line parallel to y axis
        if (x1 == x2) {
            y0 = y1 - e1;

        } else {
            var ext = m1 * (x3 - x2);

            if (ext > 0)
                y3 = y2 + Math.abs(ext);
            else
                y3 = y2 - Math.abs(ext);
        }

        x2 = x3;
        y2 = y3;

    }
    var lineModel = {
        fill: rcolor,
        stroke: rcolor,
        strokeWidth: 1,
        hasControls: false,
        hasRotatingPoint: false,
        padding: 10,
        scaleX: 1,
        scaleY: 1
    };

    var line1 = new fabric.Line([x1, y1, x2, y2], lineModel);
    fabricCanvas.add(line1);
    fabricCanvas.renderAll();
}

function clearAll() {
    fabricCanvas.clear();
}

function getMousePointer(canvas, evt) {
    var mouse = canvas.getPointer(evt.e);
    var x = (mouse.x/50).toFixed(1);
    var y = (mouse.y/50).toFixed(1);
    return {
        x: x,
        y: y
    };
}

function text(canvas, message, x, y) {
    canvas.add(new fabric.Text(message, {
        fontFamily: 'Times_New_Roman',
        left: x,
        top: y,
        fontSize: 20
    }));
    canvas.renderAll();
}

function drawsvg() {
    $('#inputTextToSave').val(fabricCanvas.toSVG());
}

function functioncircle() {
    var x = document.getElementById('x').value * 50;
    var y = document.getElementById('y').value * 50;
    var radius = document.getElementById('radius').value * 50;
    var clc = document.getElementById('clc').value;

    var fabricCircle = new fabric.Circle({
        radius: radius,
        left: x - radius,
        top: y - radius,
        angle: 0,
        startAngle: 0,
        endAngle: 2 * Math.PI,
        stroke: clc,
        strokeWidth: 1,
        fill: ''
    });

    fabricCanvas.add(fabricCircle);
    fabricCanvas.renderAll();

}

function functionline(x, y) {
    var x0 = document.getElementById('x').value * 50;
    var y0 = document.getElementById('y').value * 50;
    var clc = document.getElementById('clc').value;
    var lineModel = {
        fill: clc,
        stroke: clc,
        strokeWidth: 1,
        hasControls: false,
        hasRotatingPoint: false,
        padding: 10,
        scaleX: 1,
        scaleY: 1
    };

    var line1 = new fabric.Line([x0, y0, x, y], lineModel);
    fabricCanvas.add(line1);
    fabricCanvas.renderAll();
}

function functionlockradius() {
    var x0 = document.getElementById('x').value * 50;
    var y0 = document.getElementById('y').value * 50;
    var startAngle = $('#sa').val() * Math.PI /180;
    var r = $('#radius').val();
    var clc = document.getElementById('clc').value;
    var lineModel = {
        fill: clc,
        stroke: clc,
        strokeWidth: 1,
        hasControls: false,
        hasRotatingPoint: false,
        padding: 10,
        scaleX: 1,
        scaleY: 1
    };

    var line1 = new fabric.Line([x0, y0, x0 + +Math.cos(startAngle) * +radius1.valueOf() *50, y0 + +Math.sin(startAngle) * +radius1.valueOf() *50], lineModel);
    fabricCanvas.add(line1);
    fabricCanvas.renderAll();
}
