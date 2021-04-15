
/**
 * Register event shorthand
 * @param {string} id - element id
 * @param {keyof HTMLElementEventMap} event - event name
 * @param {EventListenerOrEventListenerObject} func - callback function
 */
 function RegisterEvent(id, event, func) {
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
function RegisterEvents(id, events) {
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
function EID(id) {
  var e = document.getElementById(id);
  if (e) {
    return e;
  } else {
    throw new Error(`attempted to fetch element with id ${id}, which doesn't exist.`);
  }
}

var animationCounter = 0;
var navOpen = false;

/**
 * @param {boolean} state - new state
 */
function SetNavbar(state) {
  if (navOpen === state) return;
  var currentAnimation = animationCounter = Math.random();
  var e1 = EID(`ui-nav`);
  var e2 = EID(`ui-breadcrumb`);
  var e3 = EID(`ui-pages`);
  navOpen = state;
  e1.classList.add(`animating`);
  e2.classList.add(`animating`);
  e3.classList.add(`animating`);
  setTimeout(function () {
    if (animationCounter !== currentAnimation) return;
    if (navOpen) {
      e1.classList.add(`open`);
      e2.classList.add(`open`);
      e3.classList.add(`open`);
    } else {
      e1.classList.remove(`open`);
      e2.classList.remove(`open`);
      e3.classList.remove(`open`);
    }
    setTimeout(function () {
      if (animationCounter !== currentAnimation) return;
      e1.classList.remove(`animating`);
      e2.classList.remove(`animating`);
      e3.classList.remove(`animating`);
    }, 250);
  }, 0);
}

function ToggleNavbar() {
  SetNavbar(!navOpen);
}



RegisterEvents(`nav-toggle`, [
  [`click`, ToggleNavbar]
]);
