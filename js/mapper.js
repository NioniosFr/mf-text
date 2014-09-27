"use strict";
$ = jQuery.noConflict();

(function($) {

    $.fn.applyConversion = function(options) {
        
        var instance = this;

        function getConfig(field) {

            if (typeof options === 'undefined' ||
                    typeof options[field] === 'undefined') {
                // Use default field class name
                return instance.find('#' + field);
            } else {
                // Developer chose to specify form field manually.
                return $(options[field]);
            }
        }

        instance.pretext = getConfig('pretext');
        instance.mftext = getConfig('mftext');
        instance.button = getConfig('convert');

        instance.pretext.keydown(function(event){
            //  previewText(instance, event.which);
        });

        instance.button.click(function(){
            convertText(instance);
        });

    };

/**
* For reference only.
*
    var ascii_mapping = {
    "10": "\n",   "13": "\n",
    "31": "",     "32": " ",    "33": "!",    "34": "\"",    "35": "#",    
    "36": "$",    "37": "%",    "38": "&",    "39": "'",    "40": "(",    
    "41": ")",    "42": "*",    "43": "+",    "44": ",",    "45": "-",    
    "46": ".",    "47": "/",    "48": "0",    "49": "1",    "50": "2",    
    "51": "3",    "52": "4",    "53": "5",    "54": "6",    "55": "7",    
    "56": "8",    "57": "9",    "58": ":",    "59": ";",    "60": "<",    
    "61": "=",    "62": ">",    "63": "?",    "64": "@",    "65": "A",    
    "66": "B",    "67": "C",    "68": "D",    "69": "E",    "70": "F",    
    "71": "G",    "72": "H",    "73": "I",    "74": "J",    "75": "K",    
    "76": "L",    "77": "M",    "78": "N",    "79": "O",    "80": "P",    
    "81": "Q",    "82": "R",    "83": "S",    "84": "T",    "85": "U",    
    "86": "V",    "87": "W",    "88": "X",    "89": "Y",    "90": "Z",    
    "91": "[",    "92": "\\",    "93": "]",    "94": "^",    "95": "_",    
    "96": "`",    "97": "a",    "98": "b",    "99": "c",    "100": "d",    
    "101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",    
    "106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
    "111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",    
    "116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
    "121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",    
    "126": "~",    "127": ""
    }
*/

var brain_mapping = {
"10": "\n",   "13": "\n",
"31": "",     "32": " ",    "33": "!",    "34": "\"",    "35": "#",    
"36": "$",    "37": "%",    "38": "&",    "39": "'",    "40": "(",    
"41": ")",    "42": "*",    "43": "+",    "44": ",",    "45": "-",    
"46": ".",    "47": "/",    "48": "0",    "49": "1",    "50": "2",    
"51": "3",    "52": "4",    "53": "5",    "54": "6",    "55": "7",    
"56": "8",    "57": "9",    "58": ":",    "59": ";",    "60": "<",    
"61": "=",    "62": ">",    "63": "?",    "64": "@",    "65": "4",    
"66": "B",    "67": "C",    "68": "D",    "69": "3",    "70": "F",    
"71": "G",    "72": "H",    "73": "1",    "74": "J",    "75": "K",    
"76": "L",    "77": "M",    "78": "N",    "79": "0",    "80": "P",    
"81": "Q",    "82": "R",    "83": "5",    "84": "7",    "85": "U",    
"86": "V",    "87": "W",    "88": "X",    "89": "Y",    "90": "Z",    
"91": "[",    "92": "\\",    "93": "]",    "94": "^",    "95": "_",    
"96": "`",    "97": "4",    "98": "b",    "99": "c",    "100": "d",    
"101": "3",    "102": "f",    "103": "g",    "104": "h",    "105": "1",    
"106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
"111": "0",    "112": "p",    "113": "q",    "114": "r",    "115": "5",    
"116": "7",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
"121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",    
"126": "~",    "127": ""
}

function previewText(obj, char){
    var current = obj.mftext.val();
    
    if (char === 8){
        current.substring(0, current.length-1);
    }else{
        var additional = brain_mapping[char.toString()];
    }

    var mfText = (typeof additional === 'undefined') ? current : current + additional;

    obj.mftext.val(mfText);
}

function convertText(obj){
    var text = obj.pretext.val();
    var mftext = "";

    for(var i = 0; i <text.length; i++ ){
        var c = brain_mapping[text.charCodeAt(i).toString()];
        mftext += (typeof c === 'undefined') ? "" : c;
    }

    obj.mftext.val(mftext);
}

})(jQuery);
