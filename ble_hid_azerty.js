/* Copyright (c) 2016 Gordon Williams, Pur3 Ltd. See the file LICENSE for copying permission. */
/*
Usage:
  var kb = require("ble_hid_azerty");
  NRF.setServices(undefined, { hid : kb.report });
  kb.tap(kb.KEY.A, 0);
  kb.tap(kb.KEY.A, kb.MODIFY.SHIFT);

*/
// http://www.usb.org/developers/hidpage/Hut1_12v2.pdf
exports.report = new Uint8Array([
  0x05, 0x01,       // Usage Page (Generic Desktop)
  0x09, 0x06,       // Usage (Keyboard)
  0xA1, 0x01,       // Collection (Application)
  0x05, 0x07,       // Usage Page (Key Codes)
  0x19, 0xe0,       // Usage Minimum (224)
  0x29, 0xe7,       // Usage Maximum (231)
  0x15, 0x00,       // Logical Minimum (0)
  0x25, 0x01,       // Logical Maximum (1)
  0x75, 0x01,       // Report Size (1)
  0x95, 0x08,       // Report Count (8)
  0x81, 0x02,       // Input (Data, Variable, Absolute)

  0x95, 0x01,       // Report Count (1)
  0x75, 0x08,       // Report Size (8)
  0x81, 0x01,       // Input (Constant) reserved byte(1)

  0x95, 0x05,       // Report Count (5)
  0x75, 0x01,       // Report Size (1)
  0x05, 0x08,       // Usage Page (Page# for LEDs)
  0x19, 0x01,       // Usage Minimum (1)
  0x29, 0x05,       // Usage Maximum (5)
  0x91, 0x02,       // Output (Data, Variable, Absolute), Led report
  0x95, 0x01,       // Report Count (1)
  0x75, 0x03,       // Report Size (3)
  0x91, 0x01,       // Output (Data, Variable, Absolute), Led report padding

  0x95, 0x06,       // Report Count (6)
  0x75, 0x08,       // Report Size (8)
  0x15, 0x00,       // Logical Minimum (0)
  0x25, 0x73,       // Logical Maximum (115 - include F13, etc)
  0x05, 0x07,       // Usage Page (Key codes)
  0x19, 0x00,       // Usage Minimum (0)
  0x29, 0x73,       // Usage Maximum (115 - include F13, etc)
  0x81, 0x00,       // Input (Data, Array) Key array(6 bytes)

  0x09, 0x05,       // Usage (Vendor Defined)
  0x15, 0x00,       // Logical Minimum (0)
  0x26, 0xFF, 0x00, // Logical Maximum (255)
  0x75, 0x08,       // Report Count (2)
  0x95, 0x02,       // Report Size (8 bit)
  0xB1, 0x02,       // Feature (Data, Variable, Absolute)

  0xC0              // End Collection (Application)
]);

var MODIFY = exports.MODIFY = {
  CTRL        : 0x01,
  SHIFT       : 0x02,
  ALT         : 0x04,
  ALT_GR      : 0xe1,
  GUI         : 0x08,
  LEFT_CTRL   : 0x01,
  LEFT_SHIFT  : 0x02,
  LEFT_ALT    : 0x04,
  LEFT_GUI    : 0x08,
  RIGHT_CTRL  : 0x10,
  RIGHT_SHIFT : 0x20,
  RIGHT_ALT   : 0x40,
  RIGHT_GUI   : 0x80
 };

var KEY = exports.KEY = {
  "A"           : 20,
  "B"           : 5 ,
  "C"           : 6 ,
  "D"           : 7 ,
  "E"           : 8 ,
  "F"           : 9 ,
  "G"           : 10,
  "H"           : 11,
  "I"           : 12,
  "J"           : 13,
  "K"           : 14,
  "L"           : 15,
  "M"           : 51,
  "N"           : 17,
  "O"           : 18,
  "P"           : 19,
  "Q"           : 4 ,
  "R"           : 21,
  "S"           : 22,
  "T"           : 23,
  "U"           : 24,
  "V"           : 25,
  "W"           : 29,
  "X"           : 27,
  "Y"           : 28,
  "Z"           : 26,
  1           : 30,
  2           : 31,
  3           : 32,
  4           : 33,
  5           : 34,
  6           : 35,
  7           : 36,
  8           : 37,
  9           : 38,
  0           : 39,
  ENTER       : 40,
  "\n"        : 40,
  ESC         : 41,
  BACKSPACE   : 42,
  "\t"        : 43,
  " "         : 44,
  "-"         : 35,
  "="         : 46,
  "["         : 34,
  "]"         : 45,
  "\\"        : 37,
  NUMBER      : 50,
  ";"         : 54,
  "'"         : 33,
  "~"         : 31,
  ","         : 16,
  "."         : 54,
  "/"         : 55,
  CAPS_LOCK   : 57,
  F1          : 58,
  F2          : 59,
  F3          : 60,
  F4          : 61,
  F5          : 62,
  F6          : 63,
  F7          : 64,
  F8          : 65,
  F9          : 66,
  F10         : 67,
  F11         : 68,
  F12         : 69,
  PRINTSCREEN : 70,
  SCROLL_LOCK : 71,
  PAUSE       : 72,
  INSERT      : 73,
  HOME        : 74,
  PAGE_UP     : 75,
  DELETE      : 76,
  END         : 77,
  PAGE_DOWN   : 78,
  RIGHT       : 79,
  LEFT        : 80,
  DOWN        : 81,
  UP          : 82,
  NUM_LOCK    : 83,
  PAD_SLASH   : 84,
  PAD_ASTERIX : 85,
  PAD_MINUS   : 86,
  PAD_PLUS    : 87,
  PAD_ENTER   : 88,
  PAD_1       : 89,
  PAD_2       : 90,
  PAD_3       : 91,
  PAD_4       : 92,
  PAD_5       : 93,
  PAD_6       : 94,
  PAD_7       : 95,
  PAD_8       : 96,
  PAD_9       : 97,
  PAD_0       : 98,
  PAD_PERIOD  : 99
};

var KEY_MODIFIERS = exports.KEY_MODIFIERS = {
  "A"         : MODIFY.SHIFT,
  "B"         : MODIFY.SHIFT,
  "C"         : MODIFY.SHIFT,
  "D"         : MODIFY.SHIFT,
  "E"         : MODIFY.SHIFT,
  "F"         : MODIFY.SHIFT,
  "G"         : MODIFY.SHIFT,
  "H"         : MODIFY.SHIFT,
  "I"         : MODIFY.SHIFT,
  "J"         : MODIFY.SHIFT,
  "K"         : MODIFY.SHIFT,
  "L"         : MODIFY.SHIFT,
  "M"         : MODIFY.SHIFT,
  "N"         : MODIFY.SHIFT,
  "O"         : MODIFY.SHIFT,
  "P"         : MODIFY.SHIFT,
  "Q"         : MODIFY.SHIFT,
  "R"         : MODIFY.SHIFT,
  "S"         : MODIFY.SHIFT,
  "T"         : MODIFY.SHIFT,
  "U"         : MODIFY.SHIFT,
  "V"         : MODIFY.SHIFT,
  "W"         : MODIFY.SHIFT,
  "X"         : MODIFY.SHIFT,
  "Y"         : MODIFY.SHIFT,
  "Z"         : MODIFY.SHIFT,
  1           : MODIFY.SHIFT,
  2           : MODIFY.SHIFT,
  3           : MODIFY.SHIFT,
  4           : MODIFY.SHIFT,
  5           : MODIFY.SHIFT,
  6           : MODIFY.SHIFT,
  7           : MODIFY.SHIFT,
  8           : MODIFY.SHIFT,
  9           : MODIFY.SHIFT,
  0           : MODIFY.SHIFT,
  "["         : MODIFY.ALT_GR,
  "]"         : MODIFY.ALT_GR,
  "\\"        : MODIFY.ALT_GR,
  "~"         : MODIFY.ALT_GR,
  "."         : MODIFY.SHIFT,
  "/"         : MODIFY.SHIFT,
};


exports.tap = function(keyCode, modifiers, callback) {
	NRF.sendHIDReport([modifiers,0,keyCode,0,0,0,0,0], function() {
		NRF.sendHIDReport([0,0,0,0,0,0,0,0], function() {
			if (callback) callback();
		});
	});
};

exports.type = function(string, callback) {
	sendHID(0, string, function() {
      if (callback) callback();
    });
};

let sendHID = exports.sendHID = function(charNb, string, callback) {
	var modifier = 0;
    if (string[charNb] in KEY_MODIFIERS) {
      modifier = KEY_MODIFIERS[string[charNb]];
    }
    NRF.sendHIDReport([modifier,0,KEY[string[charNb].toUpperCase()],0,0,0,0,0], function() {
        if (charNb < string.length - 1) {
            charNb += 1;
            setTimeout(function() {
              if (string[charNb+1] == string[charNb]) {
                  NRF.sendHIDReport([0,0,0,0,0,0,0,0], function() {
                    sendHID(charNb,string, function() {
                      if (callback) callback();
                    });
                  });
              } else {
                sendHID(charNb,string, function() {
                  if (callback) callback();
                });
              }
            }, 0);
		} else {
			NRF.sendHIDReport([0,0,0,0,0,0,0,0], function() {
              if (callback) callback();
            });
		}
	});
};
