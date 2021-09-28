var textInput = document.getElementById("textInput").value;
var textOutput = document.getElementById("textOutput").value;

function separateScriptDialogToArray(textInput) {
    let regexGetDialogOneTab = /^\t{1}\S.*/gm
    return array= textInput.match(regexGetDialogOneTab)
    .map(s => s.replace("\t", ""))
    .filter(Boolean);
    console.log(array)

}
function splitDialogOnlyToArray(textInput) {
    let str = textInput.replace(/\n{1,}/g, "\n")
    return array = str.split("\n");
}

function turnArrayToBalloonShortToArray(array) {
    var result = [];
    for (sent of array) {
        if (sent.split(" ").length <= 6) {
            result.push(breakDiamondAt5(sent))
        } else {
            result.push(breakDiamondMoreThan5Short(sent))
        }
    }
    return result;
}

function scriptBreakAndBalloonToArray(textInput) {
    let array = separateScriptDialogToArray(textInput)
    console.log("break ")
}
function breakDiamondAtEnterTall() {
    var str = textInput.replace(/\n\n?/g, "\n")
    let split1= str.split("\n");
    let result = [];
    for (sent of split1) {
        if (sent.split(" ").length <= 6) {
            result.push(breakDiamondAt5(sent))
        } else {
            result.push(breakDiamondMoreThan5Tall(sent))
        }
    }
    return result;
}

function breakDiamondAt5(str) {
    let word =str.split(" ");
    let n=Math.round(Math.sqrt(word.length));
    return word.reduce((a, e, j)=> a + e + (j%n === 0 ? '\n' : ' '), '');
}

function breakDiamondMoreThan5Short(str) {
    var rows = Math.ceil(Math.sqrt(str.split(" ").length))
    var len = Math.ceil(str.length/rows)
    var re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
    var res = [];
    var finalResult = [];
    while ((m = re.exec(str)) !== null) {
        res.push(m[1]);
    }
    for (var i = 0; i < res.length - 1; i++){    
        if(res[i].indexOf(' ') != -1){  
        while(res[i].length < len){      
            for(var j=0; j < res[i].length-1; j++){
            if(res[i][j] == ' '){
                res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
                if(res[i].length == len) break;
                while(res[i][j] == ' ') j++;
            }
            }
        }      
        }    
        finalResult.push(res[i]);    
    }
    finalResult.push(res[res.length - 1]);
    finalResult = finalResult.join('\n').replace(/\s\s+/g, " ")
    return finalResult;
}


function breakDiamondMoreThan5Tall(str) {
    var rows = Math.ceil(Math.sqrt(str.split(" ").length))+1
    var len = Math.floor(str.length/rows)-3
    var re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
    var res = [];
    var finalResult = [];
    while ((m = re.exec(str)) !== null) {
        res.push(m[1]);
    }
    for (var i = 0; i < res.length - 1; i++){    
        if(res[i].indexOf(' ') != -1){  
        while(res[i].length < len){      
            for(var j=0; j < res[i].length-1; j++){
            if(res[i][j] == ' '){
                res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
                if(res[i].length == len) break;
                while(res[i][j] == ' ') j++;
            }
            }
        }      
        }    
        finalResult.push(res[i]);    
    }
    finalResult.push(res[res.length - 1]);
    return finalResult.join('\n').replace(/\s\s+/g, " ")
}

function keepDialogOnly() {
    // var textInput = document.getElementById("textInput").value;
    var regexKeepDialog = /^\t\S.*/gm
    const a = textInput
        .match(regexKeepDialog)
        .flatMap((s) => s.split(/\t/))
        .filter(Boolean);
    var resultDialog = a.join("\n");
    document.getElementById("textOutput").value=resultDialog;
    var textInputBreakLine, result;
    textInputBreakLine = document.getElementById("textOutput").value;
    resultH = textInputBreakLine.replace(/\-\-\s/g, "--\n");
    resultG = resultH.replace(/\u2026|\.{3}/g, "...\n");
    resultF = resultG.replace(/\!\s/g, "!\n");
    resultE = resultF.replace(/\)\s/g, ")\n");
    resultD = resultE.replace(/\,\s/g, ",\n");
    resultC = resultD.replace(/\:/g, ":\n");
    resultB = resultC.replace(/\.\s/g, ".\n");
    resultA = resultB.replace(/\?\s/g, "?\n");
    result1 = resultA.replace(/\n/g, "\n\n\n");
    let split1= result1.split("\n\n\n");
    var split2= [];
    var result = [];
    for (var i=0; i<split1.length; i++) {
        let l =split1[i].split(" ").length;
        let n=Math.floor(Math.sqrt(l));
        split2 += split1[i].split(" ").reduce((a, e, j)=> a + e + (j%n === 0 ? '\n' : ' '), '')+"\n\n\n";
    }
    result = split2; 
    document.getElementById("textOutput").value=result;
}



async function checkBox() {
var dialogFileRadioButton = document.getElementById("dialogFileRadioButton");
var scriptDialogRadioButton = document.getElementById("scriptDialogRadioButton");
var textInput = document.getElementById("textInput").value;
var textOutput = document.getElementById("textOutput").value;

if(scriptDialogRadioButton.checked == true) {
        let array = separateScriptDialogToArray(textInput);
        let result = turnArrayToBalloonShortToArray(array);
        let  myTable = populateTable(result);
        document.getElementById("myDiv").innerHTML = myTable;
        document.getElementById("textOutput").value = result.join("\n\n\n");
    } else if (dialogFileRadioButton.checked == true) {
        console.log("Dialog ONLYclicked")
        // textOutput = splitDialogOnlyToArray(textInput);
        // let  myTable = populateTable(turnArrayToBalloonShortToArray(separateScriptDialogToArray(textInput)));
        // document.getElementById("myDiv").innerHTML = myTable;
        // if (dialogFileRadioButton.checked == true && ShortRadioButton.checked == true) {
        //     let  myTable = populateTable(turnArrayToBalloonShortToArray());
        //     document.getElementById("myDiv").innerHTML = myTable;
        //     document.getElementById("textOutput").value=turnArrayToBalloonShortToArray().join("\n\n\n");
        // } else if (dialogFileRadioButton.checked == true && TallRadioButton.checked == true) {
        //     let  myTable = populateTable(breakDiamondAtEnterTall());
        //     document.getElementById("myDiv").innerHTML = myTable;
        //     document.getElementById("textOutput").value=breakDiamondAtEnterTall().join("\n\n\n");
    }
}

async function paste() {
    var textarea2 = document.getElementById("textInput");
    textarea2.select()
    const text = await navigator.clipboard.readText();
    textarea2.value = text;
    checkBox();
    console.log("Paste Button click")
    }

function copyInput() {
    var textarea = document.getElementById('textInput');
    textarea.select();
    document.execCommand("copy");
    alert("INPUT copied!")
}

function copyOutput() {
    var textarea = document.getElementById("textOutput");
    textarea.select();
    document.execCommand("copy");
    alert("ALL OUTPUT copied!")
}

///////////////////////////////////////////////////////////////////////////////////
//// add copy button for each dialog for easy copy and paste//
function populateTable(dataArray) {
    let arrayCopy = dataArray.slice(0); // Create a copy as not to alter the original array
    let myTable = "<table>";
    let nColumns =1;
    // Populate body
    while (arrayCopy.length > 0) {
      myTable += "<tr>";
      for (let i = 0; i < nColumns; i++) {
        if (arrayCopy.length == 0) {
          myTable += "<td>" + "" + "</td>";
        } else {
          myTable += '<td><textarea id="copyEach" cols="25" rows="3">' + arrayCopy.shift() + '</textarea></td>';
        }
      }
      myTable += '<td><button class="otherButton" id="jQueryColorChange">Copy</button></td></tr>';
    }
    myTable += "</table>";
    $(document).ready(function(){
        $( "button#jQueryColorChange" ).click(function() {
            $(this).toggleClass( "selected" );
          });
        });
    return myTable;
}

async function copyEach() {
var a = document.getElementsByClassName('otherButton');
for (var i = 0; i < a.length; i++) {
  a[i].addEventListener('click', function() {
    var b = this.parentNode.parentNode.cells[0].textContent;
    copyToClipboard(b);
    // alert(b);
  });
}
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

$(document).ready(function() {
    var ctrlDown = false,
        ctrlKey = 17,
        cmdKey = 91,
        enterDown = false,
        enterKey = 13,
        vKey = 86,
        cKey = 67;

    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey || e.keyCode == enterKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey || e.keyCode == cmdKey || e.keyCode == enterKey) ctrlDown = false;
    });

    // Document Ctrl + C/V 
    $(document).keydown(function(e) {
        // if (ctrlDown && (e.keyCode == cKey)) {console.log("Document catch Ctrl+C"); copyOutput()};
        if (ctrlDown && (e.keyCode == vKey)) {console.log("Document catch Ctrl+V"); paste()};
        if ((ctrlDown && (e.keyCode == enterKey)) || (e.keyCode == enterKey)) {console.log("Enter pressed"); checkBox()};
    });
});


//even elistenre button
document.getElementById("enterButton").addEventListener("click", checkBox);
document.getElementById("pasteButton").addEventListener("click", paste);
document.getElementById("scriptDialogRadioButton").addEventListener("click", checkBox);
document.getElementById("dialogFileRadioButton").addEventListener("click", checkBox);


