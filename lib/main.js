const DOMNodeCollection = require('./dom_node_collection.js');

let documentReady = false;
let callbacks = [];

export const $lite = function(selector) {
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
