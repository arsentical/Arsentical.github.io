
/**
 * Register event shorthand
 * @param {string} id - element id
 * @param {keyof HTMLElementEventMap} event - event name
 * @param {EventListenerOrEventListenerObject} func - callback function
 */
 function RegisterEvent(id, event, func) {
  const e = document.getElementById(id);
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
  const e = document.getElementById(id);
  if (e) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
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
  const e = document.getElementById(id);
  if (e) {
    return e;
  } else {
    throw new Error(`attempted to fetch element with id ${id}, which doesn't exist.`);
  }
}

/**
 * async delay
 * @param {number} ms - milliseconds to wait
 * @returns {Promise<void>}
 */
function Delay(ms) {
  return new Promise(y => setTimeout(y, ms));
}


let animationCounter = 0;
let open = false;

/**
 * @param {boolean} state - new state
 */
export async function SetNavbar(state) {
  if (open === state) return;
  let currentAnimation = animationCounter = Math.random();
  const e1 = EID(`ui-nav`);
  const e2 = EID(`ui-breadcrumb`);
  const e3 = EID(`ui-pages`);
  open = state;
  e1.classList.add(`animating`);
  e2.classList.add(`animating`);
  e3.classList.add(`animating`);
  await Delay(0);
  if (animationCounter !== currentAnimation) return;
  if (open) {
    e1.classList.add(`open`);
    e2.classList.add(`open`);
    e3.classList.add(`open`);
  } else {
    e1.classList.remove(`open`);
    e2.classList.remove(`open`);
    e3.classList.remove(`open`);
  }
  await Delay(250);
  if (animationCounter !== currentAnimation) return;
  e1.classList.remove(`animating`);
  e2.classList.remove(`animating`);
  e3.classList.remove(`animating`);
}

export async function OpenNavbar() {
  await SetNavbar(true);
}

export async function CloseNavbar() {
  await SetNavbar(false);
}

export async function ToggleNavbar() {
  await SetNavbar(!open);
}



RegisterEvents(`nav-toggle`, [
  [`click`, ToggleNavbar]
]);
