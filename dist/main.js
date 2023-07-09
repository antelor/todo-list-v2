/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/folder.js":
/*!***********************!*\
  !*** ./src/folder.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Folder\": () => (/* binding */ Folder)\n/* harmony export */ });\nclass Folder{\n    constructor(name){\n        this.name = name;\n        this.items = [];\n    }\n\n    getItems(){\n        return this.items;\n    }   \n\n    addItem(item){\n        this.items.push(item);\n    }\n\n    deleteItem(item){\n        let index = this.items.indexOf(item);\n            if (index > -1) { // only splice array when item is found\n                this.items.splice(index, 1); // 2nd parameter means remove one item only\n        }\n    }\n\n    renderFolder(){\n        let folderCard = document.createElement('div');\n        folderCard.classList.add('folderCard');\n\n        let folderName = document.createElement('h1');\n        folderName.textContent = this.name;\n        folderCard.appendChild(folderName);\n\n        return folderCard;\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/folder.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./item */ \"./src/item.js\");\n/* harmony import */ var _folder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./folder */ \"./src/folder.js\");\n\n\n\n//Container of all folders\nlet folderContainer = {\n    currentIndex: -1,\n    folders: [],\n    addFolder: function(folder){\n        this.folders.push(folder);\n        this.currentIndex = this.folders.length - 1;\n    },\n    removeFolder: function(folderName){\n        this.folders = this.folders.filter((folder) => folder.name !== folderName);\n    },\n    changeIndex: function(newIndex){\n        this.currentIndex = newIndex;\n    },\n    getCurrentFolder: function(){\n        return this.folders[this.currentIndex];\n    },\n    searchFolder: function(folderName){\n        //Returns array with only searched folder, then extracts the folder from it\n        //(filter returns array)\n        let foundFolderArray = this.folders.filter((folder) => folder.name === folderName);\n        let foundFolder = foundFolderArray[0];\n        let folderIndex = this.folders.indexOf(foundFolder);\n        \n        this.changeIndex(folderIndex);\n        return foundFolder;\n    },\n    renderFolders: function(){\n        let folderList = document.createElement('div');\n        folderList.classList.add('folderList');\n\n        //for each folder in the folderlist\n        this.folders.forEach((folder) => {\n            folderList.appendChild(folder.renderFolder());\n        })\n\n        return folderList;\n    },\n    renderActiveFolder: function(){\n        let itemList = document.createElement('div');\n        itemList.classList.add('itemList');\n\n        //for each item in the current active folder\n        this.folders[this.currentIndex].items.forEach((item) => {\n            itemList.appendChild(item.renderItem());\n        })\n\n        return itemList;\n    }\n};\n\n//Default folder creation\nlet defaulFolder = new _folder__WEBPACK_IMPORTED_MODULE_1__.Folder('carpeta');\nfolderContainer.addFolder(defaulFolder);\nlet defaulFolder2 = new _folder__WEBPACK_IMPORTED_MODULE_1__.Folder('carpeta1');\nfolderContainer.addFolder(defaulFolder2);\n\n\nlet itemtest = new _item__WEBPACK_IMPORTED_MODULE_0__.Item('a','a','a','a');\nlet itemtest2 = new _item__WEBPACK_IMPORTED_MODULE_0__.Item('b','b','b','b');\ndefaulFolder.addItem(itemtest);\ndefaulFolder2.addItem(itemtest2);\n\n\nconsole.log(folderContainer.searchFolder('carpeta1'));\nconsole.log(folderContainer.currentIndex)\n\n\ndocument.querySelector('.folderMenu').appendChild(folderContainer.renderFolders());\ndocument.querySelector('.itemDisplay').appendChild(folderContainer.renderActiveFolder());\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/item.js":
/*!*********************!*\
  !*** ./src/item.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Item\": () => (/* binding */ Item)\n/* harmony export */ });\nclass Item{\n    constructor(name, desc, dueDate, priority){\n        this.name = name;\n        this.desc = desc;\n        this.dueDate = dueDate;\n        this.priority = priority;\n    };\n\n    setName(newName){\n        this.name = newName;\n    }\n\n    setDesc(newDesc){\n        this.desc = newDesc;\n    }\n\n    setDueDate(newDueDate){\n        this.dueDate = newDueDate;\n    }\n\n    setPriority(newPriority){\n        this.priority = newPriority;\n    }\n\n    renderItem(){\n        let itemCard = document.createElement('div');\n        itemCard.classList.add('itemCard');\n\n        let itemName = document.createElement('h1');\n        itemName.textContent = this.name;\n        itemCard.appendChild(itemName);\n\n        let itemDesc = document.createElement('p');\n        itemDesc.textContent = this.desc;\n        itemCard.appendChild(itemDesc);\n\n        let itemDueDate = document.createElement('p2');\n        itemDueDate.textContent = this.dueDate;\n        itemCard.appendChild(itemDueDate);\n\n        return itemCard;\n    }\n}\n\n//# sourceURL=webpack://todo-list/./src/item.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;