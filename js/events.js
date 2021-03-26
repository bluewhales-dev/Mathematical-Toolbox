/*!
 * Tool contains events
 * functions
 * 
 * by Ayola Jayamaha
 * Date: 2016-09-10
 */

var fabricCanvas = new fabric.Canvas('canvas1');
var selectedItem = '';
var selectedMethod = '';
var selectedPreviousItem = '';
var isRedoing = false;
var h = [];
var xx, yy = 0;

fabricCanvas.on('mouse:move', function (e) {

    // get the current mouse position
    var mouse = getMousePointer(fabricCanvas, e);
    var x = $('#x1').val();
    var y = $('#y1').val();
    var x0 = $('#x').val();
    var y0 = $('#y').val();


    if (selectedMethod == 'r') {
        if (selectedItem == 'b') {
            //select end point of line
            setB(e);
            if (selectedPreviousItem == 'm') {
                fabricCanvas._objects.pop();
                fabricCanvas._objects.pop();
                fabricCanvas.renderAll();
            }
            selectedPreviousItem = 'm';
            ruler();
            //writeMessage("Length :" + Math.sqrt((mouse.x  - $('#x1').val()) * (mouse.x  - $('#x1').val()) +
            // (mouse.y - $('#y1').val()) * (mouse.y  - $('#y1').val())).toFixed(1)+' cm');
            text(fabricCanvas, Math.sqrt((mouse.x - $('#x1').val()) * (mouse.x - $('#x1').val()) +
                    (mouse.y - $('#y1').val()) * (mouse.y - $('#y1').val())).toFixed(1).valueOf() + ' cm',
                ((+mouse.x + +x) / 2) * 50, ((+mouse.y + +y) / 2) * 50);
        }
    }
    if (selectedMethod == 'c') {
        if (selectedItem == 'r') {
            setR(e);
            if (selectedPreviousItem == 'm') {
                fabricCanvas._objects.pop();
                fabricCanvas._objects.pop();
                fabricCanvas.renderAll();
            }
            selectedPreviousItem = 'm';
            if (lock === true) {
                var r = Math.sqrt((mouse.x - $('#x').val()) * (mouse.x - $('#x').val()) +
                    (mouse.y - $('#y').val()) * (mouse.y - $('#y').val())).toFixed(1);
                    functionlockradius();
                    text(fabricCanvas, radius1.valueOf() + ' cm',
                        ((+mouse.x + +x0) / 2) * 50, ((+mouse.y + +y0) / 2) * 50);

            }
            else {
                functionline(mouse.x * 50, mouse.y * 50);
                text(fabricCanvas, Math.sqrt((mouse.x - $('#x').val()) * (mouse.x - $('#x').val()) +
                        (mouse.y - $('#y').val()) * (mouse.y - $('#y').val())).toFixed(1).valueOf() + ' cm',
                    ((+mouse.x + +x0) / 2) * 50, ((+mouse.y + +y0) / 2) * 50);
            }
            //writeMessage("Radius :" + Math.sqrt((mouse.x  - $('#x').val()) * (mouse.x  - $('#x').val()) +
            // (mouse.y  - $('#y').val()) * (mouse.y  - $('#y').val())).toFixed(1)+' cm');

        } else if (selectedItem == 'k') {
            setAngle(e);
            if (selectedPreviousItem == 'm') {
                fabricCanvas._objects.pop();
                fabricCanvas.renderAll();
            }
            selectedPreviousItem = 'm';
            compass();

        }
    }
}, false);

fabricCanvas.on('mouse:down', function (e) {
    switch (selectedMethod) {
        case 'r':
            switch (selectedItem) {
                case 'a':
                    setA(e);
                    fabricCanvas.renderAll();
                    selectedItem = 'b';
                    selectedPreviousItem = 'a';
                    break;
            }
            break;

        case 'c':
            switch (selectedItem) {
                case 'c':
                    setC(e);
                    fabricCanvas.renderAll();
                    selectedItem = 'r';
                    selectedPreviousItem = 'c';
                    $('#textLabel').text('Select circumference');
                    break;

                case 'r':
                    if (selectedPreviousItem == 'm') {
                        if (circle === true) {
                            fabricCanvas._objects.pop();
                            fabricCanvas._objects.pop();
                            fabricCanvas.renderAll();
                            functioncircle(e);
                            selectedItem = 'c';
                            selectedPreviousItem = '';
                            $('#textLabel').text('Select center');
                            break;
                        }
                        selectedItem = 'k';
                        selectedPreviousItem = 'r';
                        fabricCanvas.renderAll();
                        $('#textLabel').text('Select end point');
                    }

                    break;

                case 'k':
                    if (selectedPreviousItem == 'm') {
                        var obj = fabricCanvas._objects.pop();
                        fabricCanvas._objects.pop();
                        fabricCanvas._objects.pop();
                        fabricCanvas.add(obj);
                        fabricCanvas.renderAll();
                    }
                    //draw another arc
                    selectedItem = 'c';
                    selectedPreviousItem = '';
                    $('#textLabel').text('Select center');
                    break;
            }
            break;

        case 'l':
            switch (selectedItem) {
                case 'l':
                    fabricCanvas.renderAll();
                    break;
            }
            break;
    }
}, false);

fabricCanvas.on('mouse:up', function (e) {
    switch (selectedMethod) {
        case 'r':
            switch (selectedItem) {
                case 'a':
                    break;

                case 'b':
                    if (selectedPreviousItem == 'm') {
                        fabricCanvas._objects.pop();
                        fabricCanvas.renderAll();
                    }
                    selectedItem = 'a';
                    $('#textLabel').text('Select starting point');
                    break;
            }

            break;

        case 'c':
            switch (selectedItem) {
                case 'c':
                    break;
                case 'r':
                    if (selectedPreviousItem == 'm') {
                        if (circle == true) {
                            fabricCanvas._objects.pop();
                            fabricCanvas._objects.pop();
                            fabricCanvas.renderAll();
                            functioncircle(e);
                            selectedItem = 'c';
                            selectedPreviousItem = '';
                            $('#textLabel').text('Select center');
                            break;
                        }
                        selectedItem = 'k';
                        selectedPreviousItem = 'r';
                    }
                    if (circle == true && selectedPreviousItem == 'c') {
                        selectedItem = 'r';
                        selectedPreviousItem = 'c';
                        break;
                    }

                    $('#textLabel').text('Select end point');
                    break;
            }
            break;

        case 'l':
            switch (selectedItem) {
                case 'l':
                    setL(e);
                    break;
            }
            break;
    }
});

fabricCanvas.on('object:added', function () {
    if (!isRedoing) {
        h = [];
    }
    isRedoing = false;
});

function undo() {
    if (fabricCanvas._objects.length > 0) {
        h.push(fabricCanvas._objects.pop());
        fabricCanvas.renderAll();
    }
}
function redo() {
    if (h.length > 0) {
        isRedoing = true;
        fabricCanvas.add(h.pop());
    }
    fabricCanvas.renderAll();
}

function saveTextAsFile() {
    var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([textToWrite], {
        type: 'text/plain'
    });
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}