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
