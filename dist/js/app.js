/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/html5.css":
/*!***************************!*\
  !*** ./src/css/html5.css ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/html5.css?");

/***/ }),

/***/ "./src/js/html5App.js":
/*!****************************!*\
  !*** ./src/js/html5App.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_html5_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/html5.css */ \"./src/css/html5.css\");\n/* harmony import */ var _css_html5_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_html5_css__WEBPACK_IMPORTED_MODULE_0__);\n// html5 js\n\n// require('./log.js');\n// require('./offline.js');\n// console.log(\"html5app\");\nvar save = window.localStorage;\nlet db = null;\nwindow.onload = function () {\n    createDataBase();\n}\nwindow.addNote = function (e) {\n    e.preventDefault();\n    var today = new Date();\n    var creationDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();\n    const taskContent = {\n\n        name: document.getElementById(\"taskname\").value,\n        description: document.getElementById(\"description\").value,\n        date: document.getElementById(\"duedate\").value,\n        creation_date:creationDate\n    }\n    const transact = db.transaction(\"taskStore\", \"readwrite\");\n    const showTransact = transact.objectStore(\"taskStore\");\n    showTransact.add(taskContent);\n    removeExistingList();\n    showExistingTasks();\n}\nfunction createDataBase() {\n    const dataBaseName = \"task_db\";\n    const dataBaseVersion = \"1\";\n    const request = indexedDB.open(dataBaseName, dataBaseVersion);\n    request.onupgradeneeded = e => {\n        db = e.target.result;\n        const to_do_notes = db.createObjectStore(\"taskStore\", { keyPath: \"note_id\", autoIncrement: true });\n\n\n        alert(\"upgrade is called\");\n        console.log(db.dataBaseName);\n    }\n    request.onsuccess = e => {\n        db = e.target.result;\n        alert(\"success is called\");\n        console.log(db.dataBaseName);\n    }\n    request.onerror = e => {\n        alert(\"error is called\");\n    }\n\n}\nwindow.removeExistingList=function(){\n  var ol_container=document.getElementById(\"task_container\");\n  var ol_list=document.getElementById(\"sublist\");\n  ol_container.removeChild(ol_list);\n  ol_list=document.createElement(\"ol\");\n  ol_list.setAttribute(\"id\",\"sublist\");\n  ol_container.appendChild(ol_list);\n\n}\n\n  window.showExistingTasks = function() {\n    const transact = db.transaction(\"taskStore\",\"readonly\");\n    const showTransact = transact.objectStore(\"taskStore\");\n    const request = showTransact.openCursor();\n    var counter=0;\n    request.onsuccess = e => {\n        const cursor = e.target.result\n        if (cursor) {\n            counter+=1;\n\n            document.getElementById(\"sublist\").innerHTML += '<li><span class=\"sp1\">'+cursor.value.name+'</span><span class=\"sp2>'+cursor.value.description+'</span><span class=\"sp3\">'+cursor.value.date+'</span></li>';\n            cursor.continue();\n        }\n      }\n    }\n\n    /*GEOLOCATION PROPERTY USAGE*/\n    window.locator=function() {\n      if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(GetPosition);\n      } else {\n        console.log(\"Geolocation is not supported by this browser.\");\n      }\n    }\n\n    window.GetPosition=function(position) {\n      var latitude=position.coords.latitude;\n      var longitude=position.coords.longitude;\n      if(latitude<=53 && longitude <= 14)\n      {\n      window.location.replace(\"new-location.html\");\n      }\n    }\n\n    window.setTimeout(showExistingTasks,100);\n    window.setTimeout(locator,200);\n\n    window.setTimeout(function(){\n      var taskName = document.getElementById(\"taskname\");\n      var taskDescription = document.getElementById(\"description\");\n      var taskDate = document.getElementById(\"duedate\");\n      if(save!=null){\n      taskName.value = save.taskName;\n      taskDescription.value = save.taskDescription;\n      taskDate.value=save.taskDate;}\n    },1000);\n\n    /*LOCAL STORAGE IN EVERY 5 SECONDS AND AUTOFILL FORM*/\n\n    window.setInterval(function(){\n        var taskName = document.getElementById(\"taskname\");\n        var taskDescription = document.getElementById(\"description\");\n        var taskDate = document.getElementById(\"duedate\");\n\n        save.taskName = taskName.value;\n        save.taskDescription=taskDescription.value;\n        save.taskDate=taskDate.value;\n\n        console.log(taskName.value);\n        console.log(save.taskName);\n        console.log(save.taskDescription);\n        console.log(save.taskDate);\n    }, 5000);\n\n\n//# sourceURL=webpack:///./src/js/html5App.js?");

/***/ }),

/***/ "./src/js/offline.js":
/*!***************************!*\
  !*** ./src/js/offline.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.updateOnlineStatus = function() {\n    window.alert(\"Online\");\n}\n\nwindow.updateOfflineStatus = function() {\n    window.alert(\"Offline\");\n}\n\nwindow.addEventListener('online', updateOnlineStatus);\nwindow.addEventListener('offline', updateOfflineStatus);\n\n//# sourceURL=webpack:///./src/js/offline.js?");

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ./src/js/html5App.js ./src/js/offline.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/html5App.js */\"./src/js/html5App.js\");\nmodule.exports = __webpack_require__(/*! ./src/js/offline.js */\"./src/js/offline.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/html5App.js_./src/js/offline.js?");

/***/ })

/******/ });