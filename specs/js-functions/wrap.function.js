this.wrap = function(selector) {
  var element = document.querySelector(selector);
  var span = document.createElement('span');
  element.parentNode.insertBefore(span, element);
  span.appendElement(element);
};
