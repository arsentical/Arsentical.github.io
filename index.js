
/**
 * Register event shorthand
 * @param {string} id - element id
 * @param {keyof HTMLElementEventMap} event - event name
 * @param {EventListenerOrEventListenerObject} func - callback function
 */
 function A(id, event, func) {
  var e = document.getElementById(id);
  if (e) {
    e.addEventListener(event, func);
  } else {
    console.warn(`attempted to add an event to element with id ${id}, which doesn't exist.`);
  }
}

/**
 * Register multiple events on the same element
 * @param {string} id - element id
 * @param {[keyof HTMLElementEventMap, EventListenerOrEventListenerObject][]} events - list of name-callback pairs
 */
function B(id, events) {
  var e = document.getElementById(id);
  if (e) {
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      if (event) e.addEventListener(event[0], event[1]);
    }
  } else {
    console.warn(`attempted to add events to element with id ${id}, which doesn't exist.`);
  }
}

/**
 * document.getElementById()
 * @param {string} id - element id
 * @returns {HTMLElement} html element
 */
function C(id) {
  var e = document.getElementById(id);
  if (e) {
    return e;
  } else {
    throw new Error(`attempted to fetch element with id ${id}, which doesn't exist.`);
  }
}
/**
 * @param {HTMLElement[]} e
 * @param {number} op
 * @param {string} cl
 */
function D(e, op, cl) {
  if (op) {
    for (var i = 0; i < e.length; i++) {
      e[i].classList.add(cl);
    }
  } else {
    for (var i = 0; i < e.length; i++) {
      e[i].classList.remove(cl);
    }
  }
}
var animationCounter = 0;
var navOpen = false;

/**
 * @param {boolean} state - new state
 */
function E(state) {
  if (navOpen === state) return;
  var currentAnimation = animationCounter = Math.random();
  var e = [
    C(`ui-nav`),
    C(`ui-breadcrumb`),
    C(`ui-pages`),
    C(`ui-pc`)
  ]
  navOpen = state;
  D(e, 1, `animating`);
  setTimeout(function () {
    if (animationCounter !== currentAnimation) return;
    if (navOpen) {
      D(e, 1, `open`);
    } else {
      D(e, 0, `open`);
    }
    setTimeout(function () {
      if (animationCounter !== currentAnimation) return;
      D(e, 0, `animating`);
    }, 250);
  }, 0);
}

function F() {
  E(!navOpen);
}

B(`nav-toggle`, [
  [`click`, F]
]);
