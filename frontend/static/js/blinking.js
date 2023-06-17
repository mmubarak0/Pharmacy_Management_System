let text =
	"ThinkingWhatIsRopoPharma?";
let typingSpeed = 200;
let blinkSpeed = 500;
let delay = 3;
// First Start animating the cursor alone
blinkFor(0, delay, blinkSpeed);
blinkFor(delay, text.length * typingSpeed / 1000, typingSpeed);
blinkFor(text.length * typingSpeed / 1000 + delay, delay, blinkSpeed);

// Second Write the text
textBlinkFor(3, typingSpeed, text);

/**
 * Animate the cursor for a given period
 * @param {int} sec number of seconds
 * @param {int} speed blinking speed in milliseconds
 */
function blinkFor(delay, sec, speed) {
	function cursorAnimte(sec, speed) {
		let cursor = true;
		let node = document.getElementById("cursor");
		let cursorBlink = () => {
			if (cursor) {
				node.style.opacity = 0;
				cursor = false;
			} else {
				node.style.opacity = 1;
				cursor = true;
			}
		};
		let curAnimate = setInterval(cursorBlink, speed);
		setTimeout(clearInterval, sec * 1000, curAnimate);
	}
    setTimeout(cursorAnimte, delay * 1000, sec, speed);
}

/**
 *
 * @param {int} delay delay Time in seconds
 * @param {int} speed Typing speed in millisecons
 * @param {string} text Text to animate
 */
function textBlinkFor(delay, speed, text) {
	function blockAnimate(speed, text) {
		let node = document.getElementById("text");
		let n = 0;
		let textBlink = (text) => {
            if (text[n] === text[n].toUpperCase()) {
                node.innerHTML += `<span class="in-between-letters">${text[n++]}</span>`;
            } else {
                node.innerHTML += text[n++];
            }
		};
		let blinkingTimer = setInterval(textBlink, speed, text);
		setTimeout(clearInterval, text.length * speed, blinkingTimer);
	}
	setTimeout(blockAnimate, delay * 1000, speed, text);
}
