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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const DOMNodeCollection = __webpack_require__(1);

let documentReady = false;
let callbacks = [];

const $lite = function(selector) {
  let nodeList = [];

  if (typeof(selector) === 'string') {
    nodeList = document.querySelectorAll(selector);
    nodeList = Array.from(nodeList);
    nodeList = new DOMNodeCollection(nodeList);
  } else if (selector instanceof HTMLElement) {
    nodeList.push(selector);
    nodeList = new DOMNodeCollection(nodeList);
  } else if (typeof(selector) === "function") {
    if (documentReady) {
      selector();
    } else {
      callbacks.push(selector);
    }
  }
return nodeList;
};
/* harmony export (immutable) */ __webpack_exports__["$lite"] = $lite;


window.$lite = $lite;

$lite.extend = (base, ...otherObjs) => {
  otherObjs.forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });
  return base;
};

$lite.ajax = (options) => {
  const xhr = new XMLHttpRequest();
  const defaults = {
    success: () => {},
    error: () => {},
    url: "",
    method: "GET",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  options = $lite.extend(defaults, options);
  options.method = options.method.toUpperCase();

  xhr.open(options.method, options.url, true);

  xhr.onload = (e) => {
    if (xhr.status === 200) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(options.data));
};

const toQueryString = (object) => {
  let result = "";
  for (const prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      result += `${prop}=${object[prop]}&`;
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  callbacks.forEach(funk => funk());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  html (str) {
    if (str) {
      this.HTMLElements.forEach( (element) => {
        element.innerHTML = str;
      });
    } else {
      return this.HTMLElements[0].innerHTML;
    }

    return this.HTMLElements;
  }

  empty () {
    this.HTMLElements.forEach( (element) => {
      element.innerHTML = "";
    });

    return this.HTMLElements;
  }

  append (argument) {

    if (typeof(argument) === 'string') {
      this.HTMLElements.forEach( (element) => {
        element.innerHTML += argument;
      });
    } else if (typeof(argument) === 'object' && argument.length > 1) {
      this.HTMLElements.forEach( (element) => {
        element.innerHTML += argument.outerHTML;
      });
    } else {
      this.HTMLElements.forEach( (element) => {
        argument.HTMLElements.forEach( (argNode) => {
          // debugger
          return element.appendChild(argNode.cloneNode(true));
        });
      });
    }

    return this.HTMLElements;
  }

  attr (attribute, value) {

    if (!value) {
      if (this.HTMLElements[0].attributes[attribute]) {
        return this.HTMLElements[0].attributes[attribute].value;
      } else {
        return undefined;
      }
    } else if (value) {
        this.HTMLElements.forEach((el) => {
        el.setAttribute(attribute, value);
      });
    }

    return this.HTMLElements;
  }

  addClass (addedClass) {
    this.HTMLElements.forEach((el) => {
      let classList = el.classList;

      if (classList.contains(addedClass)) {
        return;
      } else {
        return classList.add(addedClass);
      }
    });

    return this.HTMLElements;
  }

  removeClass (removedClass) {
    this.HTMLElements.forEach((el) => {
      let classList = el.classList;

      if (classList.contains(removedClass)) {
        return classList.remove(removedClass);
      } else {
        return;
      }
    });

    return this.HTMLElements;
  }


 children (selector) {
   let selectedChildren = [];
   if (selector) {
     this.HTMLElements.forEach((el) => {
       for (let i = 0; i < el.children.length; i++) {
         if (el.children[i].localName !== selector) {
           selectedChildren.push(el.children[i]);
         }
       }
     });

    return new DOMNodeCollection(selectedChildren);
   } else {
     this.HTMLElements.forEach((el) => {
       for (let i = 0; i < el.children.length; i++) {
         selectedChildren.push(el.children[i]);
       }
     });

    return new DOMNodeCollection(selectedChildren);
   }
 }

 parent (selector) {
   let selectedParents = [];

   if (selector) {
     this.HTMLElements.forEach((el) => {
       if (!selectedParents.includes(el.parentElement) && el.parentElement === selector) {
         selectedParents.push(el.parentElement);
       }
     });
   } else {
     this.HTMLElements.forEach((el) => {
       if (!selectedParents.includes(el.parentElement)) {
         selectedParents.push(el.parentElement);
       }
     });
   }

   return new DOMNodeCollection(selectedParents);
 }

 find (selector) {
   let selectedChildren = [];

   if (selector) {
     this.HTMLElements.forEach((htmlEl) => {
       let elements = htmlEl.querySelectorAll(selector);
       elements.forEach((el) => {
         selectedChildren.push(el);
       });
     });
   }

   return new DOMNodeCollection(selectedChildren);
 }


 remove (selector) {
   let filtered = this.HTMLElements.filter((element) => {
     if (element.localName === selector) {
       element.outerHTML = "";
       return;
     } else {
       return element;
     }
   });

   this.HTMLElements = filtered;
 }

 on (eventName, cb) {
   this.HTMLElements.forEach((el) => {
     el.addEventListener(eventName, cb);
     const eventKey = `jqliteEvents-${eventName}`;
     if(typeof el[eventKey] === "undefined") {
       el[eventKey] = [];
     }
     el[eventKey].push(cb);
   });
 }

 off (eventName) {
   this.HTMLElements.forEach((el) => {
     const eventKey = `jqliteEvents-${eventName}`;
     if (el[eventKey]) {
       el[eventKey].forEach((callback) => {
         el.removeEventListener(eventName, callback);
       });
     }
     el[eventKey] = [];
   });
 }


}

module.exports = DOMNodeCollection;






















// const createdNode = document.createElement(argument);
// this.HTMLElements.forEach( (node) => {
//   node += createdNode;
// });


// if (argument instanceof DOMNodeCollection) {
//   // debugger
//   this.HTMLElements.forEach( (node) => {
//     // debugger
//     argument.HTMLElements.forEach( (argNode) => {
//       // debugger
//       node.innerHTML += argNode.outerHMTL;
//       // node.innerHTML.push(argNode.outerHMTL);
//       // return node.appendChild(argNode.cloneNode(true));
//     });
//   });
// } else if (typeof(selector) === 'string') {
//     this.HTMLElements.forEach((node) => {
//       return node.innerHTML += argument;
//   });
// }


/***/ })
/******/ ]);