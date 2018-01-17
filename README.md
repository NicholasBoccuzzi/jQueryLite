# jQuery Lite - a Replica jQuery Library
jQuery Lite was designed with the intent and purpose of replicating the jQuery library. This includes jQuery's goal of providing efficient methods for selecting HTML elements, manipulating the DOM, making AJAX requests and handling events; all across various browsers.

### DOM Element Selector
A core feature of jQuery Lite is its ability to manipulate what is currently on the window and to actively change it. jQuery Lite uses if statements to choose what data to query the document for:

```
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
```

It's notable that if either the first or second 'if' statements are true, a new DOMNodeCollection is created by providing the elements extracted from the document as an argument. The prototype for DOMNodeCollection is where the majority of jQuery Lite's functions are being stored, therefore by creating these new DOMNodeCollections, we provide access to the DOMNodeCollection function library.

### DOM Element Manipulation

Now that we have these DOMNodeCollections, we have access to functions that can provide information to the User and provide the ability to mutate these elements on the page.

Once selected, using ```.html``` will return the innerHTML for the element provided on the page.

Using ```.empty``` will remove the innerHTML from all elements currently selected.

With ```.append```, we pass an argument and add the outerHTML of that argument to each element contained in the DOMNodeCollection.

The ```.attr``` function has multiple functionalities which is dependent on the number of arguments provided. With just one argument, ```.attr``` returns the first elements value of the argument attrobite. However, with two arguments, each element in the DOMNodeCollection sets the element attribute value equal to the passed arguments.

Both ```.addClass``` and ```.removeClass``` are as straightforward as they appear. We have the functionality of adding or removing a class to all of the selected HTML elements.

TOBECONTINUED -- next are children/parent
