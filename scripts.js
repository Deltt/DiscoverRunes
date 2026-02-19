const futharkLetters = [
	"f", "u", "x", "a", "r", "k", "g", "w", "h", "n", "i", "j",
	"c", "p", "z", "s", "t", "b", "e", "m", "l", "q", "d", "o"
];

const phoLetters = [
	"f", "u", "x", "a", "r", "k", "g", "w", "h", "n", "i", "j",
	"c", "p", "z", "s", "t", "b", "e", "m", "l", "q", "d", "o"
];

const greLetters = [
	"f", "u", "x", "a", "r", "k", "g", "w", "h", "n", "i", "j",
	"c", "p", "z", "s", "t", "b", "e", "m", "l", "q", "d", "o"
];

const itaLetters = [
	"f", "u", "x", "a", "r", "k", "g", "w", "h", "n", "i", "j",
	"c", "p", "z", "s", "t", "b", "e", "m", "l", "q", "d", "o"
];

const venLetters = [
	"f", "u", "x", "a", "r", "k", "g", "w", "h", "n", "i", "j",
	"c", "p", "z", "s", "t", "b", "e", "m", "l", "q", "d", "o"
];

const runeMeaningsDE = [
	"Vieh, Wohlstand",                 // 0
	"Auerochse, Stärke",               // 1
	"Riese, Thor",                     // 2
	"Gott, Odin",                      // 3
	"Reise, Rad",                      // 4
	"Feuer",                           // 5
	"Geschenk",                        // 6
	"Freude",                          // 7
	"Wind",                            // 8
	"Bedürfnis, brauchen",             // 9
	"Eis",                             // 10
	"Jahr, Ernte",                     // 11
	"Baum des Lebens",                 // 12
	"?",                               // 13
	"Elch, Schutz",                    // 14
	"Sonne",                           // 15
	"Tiwaz (ein Gott), Sieg",          // 16
	"Birke, Geburt",                   // 17
	"Pferd",                           // 18
	"Mann",                            // 19
	"Wasser, See",                     // 20
	"Ingwaz (ein Gott), Fruchtbarkeit",// 21
	"Tag, Dämmerung",                  // 22
	"Abstammung, Eigentum"             // 23
];

const runeMeaningsEN = [
	"cattle, wealth",                  // 0
	"aurochs, strength",               // 1
	"giant, thor",                     // 2
	"god, odin",                       // 3
	"journey, wheel",                  // 4
	"ulcer, fire",                     // 5
	"gift",                            // 6
	"joy",                             // 7
	"hail, air",                       // 8
	"need, necessity",                 // 9
	"ice",                             // 10
	"year, harvest",                   // 11
	"yew tree, tree of life",          // 12
	"?",                               // 13
	"elk, protection",                 // 14
	"sun",                             // 15
	"Tiwaz (a god), victory",          // 16
	"birch, birth",                    // 17
	"horse",                           // 18
	"man",                             // 19
	"water, lake",                     // 20
	"Ingwaz (a god), fertility",       // 21
	"day, dawn",                       // 22
	"heritage, property"               // 23
];



// Show a page by id
function showPage(id) {
	document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
	const page = document.getElementById(id);
	if (page) page.classList.add('active');
}

// Initially show the start page
showPage("start");

// document.querySelectorAll('.advance_button').forEach(btn => {
//   btn.addEventListener('click', () => {
//     const targetId = btn.dataset.next;
//     document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
//     document.getElementById(targetId).classList.add('active');
//   });
// });

let isSwitchingPage = false;
let lastPage = "start";
let currentPage = "start";
const backArray = [];
document.getElementById("back-button").addEventListener("click", () => {
	if (isSwitchingPage) return;
	console.log(backArray.length);

	if (backArray.length > 0) {
		switchPage(backArray[backArray.length - 1], false);
		backArray.pop();
	}
	//switchPage(lastPage);
});

document.getElementById("home-button").addEventListener("click", () => {
	if (isSwitchingPage) return;
	switchPage("start", true);
});


function switchPage(targetId, addToBack) {
	overlay.classList.add("hidden");
	const current = document.querySelector(".page.active");
	const next = document.getElementById(targetId);

	if (addToBack) {
		backArray.push(current.id);
		if (backArray.length > 20) {
			backArray.shift();
		}
	}

	isSwitchingPage = true;
	lastPage = current.id;
	currentPage = targetId;

	if (!current || !next) return;

	// 1️⃣ Fade-out current page
	current.style.transition = "opacity 0.4s ease, transform 0.4s ease";
	current.style.opacity = "0";
	current.style.transform = "translateY(-0.5rem)";
	current.style.pointerEvents = "none";

	// 2️⃣ Wait for fade-out + pause
	setTimeout(() => {
		// remove current page
		current.classList.remove("active");
		current.style.opacity = "";
		current.style.transform = "";
		current.style.transition = "";
		current.style.pointerEvents = "";

		// 3️⃣ Prepare next page slightly above (will move down)
		next.style.opacity = "0";
		next.style.transform = "translateY(-0.5rem)";
		next.style.pointerEvents = "none";

		// add active
		next.classList.add("active");

		// 4️⃣ Trigger fade-in
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				next.style.transition = "opacity 0.4s ease, transform 0.4s ease";
				next.style.opacity = "1";
				next.style.transform = "translateY(0)";

				// restore normal state after fade-in
				const onEnd = () => {
					next.style.transform = "";
					next.style.opacity = "";
					next.style.transition = "";
					next.style.pointerEvents = "";

					isSwitchingPage = false;
					next.removeEventListener("transitionend", onEnd);
				};
				next.addEventListener("transitionend", onEnd);
			});
		});
	}, 600); // 0.4 fade-out + 0.2 pause
}


// Attach to buttons
document.querySelectorAll(".interaction-change-page").forEach(btn => {
	btn.addEventListener("click", () => {
		const targetId = btn.dataset.next;
		switchPage(targetId, true);
	});
});

// Futhark Overview Elements
const overlay = document.getElementById("futhark-overview-overlay");
const rune = document.getElementById("futhark-overview-overlay-rune");
const latinLetter = document.getElementById("overlay-latin-letter");
const meaning = document.getElementById("overlay-meaning");

document.querySelectorAll(".futhark-overview-grid-tile").forEach(btn => {
	btn.addEventListener("click", () => {
		const runeIndex = Number(btn.dataset.rune_index);
		const runeLetter = futharkLetters[runeIndex];

		rune.textContent = runeLetter;
		latinLetter.textContent = runeLetter.toUpperCase();
		meaning.textContent = runeMeaningsDE[runeIndex];
		overlay.classList.remove("hidden");
	});
});

document.getElementById("futhark-overview-overlay-closebox").addEventListener("click", () => {
	overlay.classList.add("hidden");
});

// Quiz
const quizWord1 = ["k", "a", "m", "m"];
const quizTop = document.getElementById("quiz-top");
const quizBottom = document.getElementById("quiz-bottom");
const quizTopElements = [];
const quizBottomElements = [];
// Track which bottom tile is placed in each top slot (by index into quizBottomElements)
const quizSlotSource = []; // quizSlotSource[slotIndex] = bottomTileIndex or null
let currentTopElement = 0; // the "cursor" slot index
let quizLocked = false; // prevent interaction during animation

const possibleFillers = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "z"
];

// Build top slots
quizWord1.forEach((letter, i) => {
	const wrapper = document.createElement("div");
	wrapper.style.display = "flex";
	wrapper.style.flexDirection = "column";
	wrapper.style.alignItems = "center";
	wrapper.style.gap = "0.25rem";

	const div = document.createElement("div");
	quizTopElements.push(div);
	quizSlotSource.push(null);
	div.classList.add("quiz-top-tile");
	div.dataset.property = letter;
	div.dataset.slotIndex = i;
	div.textContent = "";

	// Underline bar (always visible)
	const bar = document.createElement("div");
	bar.classList.add("quiz-slot-bar");

	// Cursor dot (sits below the bar)
	const dot = document.createElement("div");
	dot.classList.add("quiz-cursor-dot");
	dot.dataset.slotIndex = i;

	wrapper.appendChild(div);
	wrapper.appendChild(bar);
	wrapper.appendChild(dot);
	quizTop.appendChild(wrapper);
});

updateCursor();

// Build bottom tiles
const letters = [...quizWord1];

while (letters.length < 8) {
	const randomLetter =
		possibleFillers[Math.floor(Math.random() * possibleFillers.length)];
	letters.push(randomLetter);
}

letters.sort(() => Math.random() - 0.5);

letters.forEach((letter, idx) => {
	const div = document.createElement("div");
	quizBottomElements.push(div);
	div.classList.add("futhark-overview-grid-tile");
	const p = document.createElement("p");
	p.classList.add("futhark-overview-grid-letter");

	div.dataset.property = letter;
	div.dataset.bottomIndex = idx;
	p.textContent = letter;

	quizBottom.appendChild(div);
	div.appendChild(p);
});

function updateCursor() {
	document.querySelectorAll(".quiz-cursor-dot").forEach(dot => {
		const idx = parseInt(dot.dataset.slotIndex);
		dot.classList.toggle("quiz-cursor-dot-active", idx === currentTopElement);
	});
}

function findFirstEmpty() {
	for (let i = 0; i < quizTopElements.length; i++) {
		if (quizSlotSource[i] === null) return i;
	}
	return quizTopElements.length; // all filled
}

function resetTop(keepCorrect = false) {
	quizLocked = false;
	quizTopElements.forEach((el, i) => {
		if (keepCorrect && el.textContent === quizWord1[i]) return; // leave correct alone
		// Re-enable the bottom tile that was placed here
		if (quizSlotSource[i] !== null) {
			const bottomEl = quizBottomElements[quizSlotSource[i]];
			if (bottomEl) bottomEl.classList.remove("futhark-overview-grid-tile-disabled");
			quizSlotSource[i] = null;
		}
		el.textContent = "";
		el.classList.remove("correct-glow", "wrong-glow");
	});

	// Move cursor to first empty slot
	currentTopElement = findFirstEmpty();
	if (currentTopElement >= quizTopElements.length) currentTopElement = 0;
	updateCursor();
}

function checkAnswer() {
	quizLocked = true;
	const filled = quizTopElements.map(el => el.textContent);
	const allCorrect = filled.every((letter, i) => letter === quizWord1[i]);

	if (allCorrect) {
		quizTopElements.forEach(el => el.classList.add("correct-glow"));
		// Stay locked, puzzle complete
	} else {
		// Mark each slot correct or wrong
		const wrongEls = [];
		quizTopElements.forEach((el, i) => {
			if (el.textContent === quizWord1[i]) {
				el.classList.add("correct-glow");
			} else {
				el.classList.add("wrong-glow");
				wrongEls.push(el);
			}
		});

		// Pause so glow is visible, then fade opacity only (no transform)
		setTimeout(() => {
			wrongEls.forEach(el => {
				el.style.transition = "opacity 0.35s ease";
				el.style.opacity = "0";
			});

			// After fade: hide instantly, clear state, restore
			setTimeout(() => {
				wrongEls.forEach(el => {
					el.style.transition = "none";
					el.style.opacity = "0";
					el.style.visibility = "hidden";

					el.classList.remove("wrong-glow");
					el.textContent = "";

					const i = parseInt(el.dataset.slotIndex);
					if (quizSlotSource[i] !== null) {
						const bottomEl = quizBottomElements[quizSlotSource[i]];
						if (bottomEl) bottomEl.classList.remove("futhark-overview-grid-tile-disabled");
						quizSlotSource[i] = null;
					}
				});

				currentTopElement = findFirstEmpty();
				updateCursor();
				quizLocked = false;

				// Restore: first clear opacity while hidden, then make visible, then re-enable transitions
				wrongEls.forEach(el => {
					el.style.opacity = "";
				});
				requestAnimationFrame(() => {
					wrongEls.forEach(el => {
						el.style.visibility = "";
					});
					requestAnimationFrame(() => {
						wrongEls.forEach(el => {
							el.style.transition = "";
						});
					});
				});
			}, 400);
		}, 800);
	}
}

// Top slot click: tap filled slot to delete, tap empty slot to move cursor
quizTopElements.forEach((el, i) => {
	el.addEventListener("click", () => {
		if (quizLocked) return;
		if (el.classList.contains("correct-glow")) return; // can't delete correct

		if (quizSlotSource[i] !== null) {
			// Delete this slot
			const bottomEl = quizBottomElements[quizSlotSource[i]];
			if (bottomEl) bottomEl.classList.remove("futhark-overview-grid-tile-disabled");
			quizSlotSource[i] = null;
			el.textContent = "";
			el.classList.remove("wrong-glow", "correct-glow");
			currentTopElement = i;
			updateCursor();
		} else {
			// Move cursor here
			currentTopElement = i;
			updateCursor();
		}
	});
});

quizBottomElements.forEach((div, bottomIdx) => {
	div.addEventListener("click", () => {
		if (quizLocked) return;
		if (div.classList.contains("futhark-overview-grid-tile-disabled")) return;
		if (currentTopElement >= quizTopElements.length) return;

		const letter = div.dataset.property;
		div.classList.add("futhark-overview-grid-tile-disabled");

		const topEl = quizTopElements[currentTopElement];
		topEl.textContent = letter;
		quizSlotSource[currentTopElement] = bottomIdx;

		// Find next empty slot (search forward wrapping around)
		const totalSlots = quizTopElements.length;
		const allFilled = quizSlotSource.every(s => s !== null);
		if (allFilled) {
			currentTopElement = -1;
			updateCursor();
			setTimeout(checkAnswer, 150);
		} else {
			let next = -1;
			for (let offset = 1; offset <= totalSlots; offset++) {
				const candidate = (currentTopElement + offset) % totalSlots;
				if (quizSlotSource[candidate] === null) { next = candidate; break; }
			}
			currentTopElement = next;
			updateCursor();
		}
	});
});

// Wheel
const wheelLetter = "r";
let selectedLetter = "a";
let selectedLetterElement;
const wheelCheckButton = document.getElementById("wheel-check-button");
let freezeWheel = false;

wheelCheckButton.addEventListener("click", () => {
	if (selectedLetter == wheelLetter) {
		freezeWheel = true;
		selectedLetterElement.style.transition = "";
		applyGlow(selectedLetterElement, {
			className: "correct-glow"
		});
	}
	else {
		selectedLetterElement.style.transition = "";
		applyGlow(selectedLetterElement, {
			className: "wrong-glow",
			duration: 300
		});
	}
});

// Initialize reference wheels with arrays
const referenceWheels = [
	{ element: document.querySelectorAll(".wheel-fixed")[0], letters: phoLetters, entries: [] },
	{ element: document.querySelectorAll(".wheel-fixed")[1], letters: greLetters, entries: [] },
	{ element: document.querySelectorAll(".wheel-fixed")[2], letters: itaLetters, entries: [] },
	{ element: document.querySelectorAll(".wheel-fixed")[3], letters: venLetters, entries: [] }
];

const stepRem = 4;
const entryOffset = -3.35; // For main wheel
const referenceEntryOffset = -2.0; // For reference wheels - adjust this value

// Initialize reference wheels - FIXED to wheelLetter
referenceWheels.forEach(wheel => {
	const container = wheel.element;
	container.innerHTML = ""; // Clear existing content
	container.style.position = "relative";
	container.style.overflow = "hidden";
	
	const letters = wheel.letters;
	const totalLetters = letters.length;
	const wheelLetterIndex = letters.indexOf(wheelLetter);
	
	if (wheelLetterIndex === -1) return;
	
	// Create 5 entries for each reference wheel
	for (let i = 0; i < 5; i++) {
		const entry = document.createElement("div");
		entry.className = "wheel-fixed-entry";
		entry.style.position = "absolute";
		entry.style.left = "50%";
		entry.style.width = "100%";
		entry.style.height = "2.5rem";
		entry.style.paddingTop = "0.5rem";
		entry.style.display = "flex";
		entry.style.justifyContent = "center";
		entry.style.alignItems = "center";
		entry.style.fontSize = "2.5rem";
		entry.style.transform = `translate(-50%, ${referenceEntryOffset + i * stepRem}rem)`; // Use referenceEntryOffset
		
		const fontName = container.dataset.font;
		if (fontName) {
			entry.style.fontFamily = fontName;
		}
		
		// Calculate which letter to show: -2, -1, 0 (center = wheelLetter), +1, +2
		const offset = i - 2;
		const letterIndex = (wheelLetterIndex + offset + totalLetters) % totalLetters;
		entry.textContent = letters[letterIndex];
		
		container.appendChild(entry);
		wheel.entries.push(entry);
	}
});

// Main wheel setup
const parent = document.getElementById("wheel-main");
const entries = Array.from(document.querySelectorAll(".wheel-main-entry"));
const totalHeight = entries.length * stepRem;

let basePositions = entries.map((_, i) => entryOffset + i * stepRem);
let currentIndices = entries.map((_, i) => i);

// Initialize entries
entries.forEach((el, i) => {
	el.style.position = "absolute";
	el.style.left = "50%";
	el.textContent = futharkLetters[currentIndices[i]];
	el.style.transform = `translate(-50%, ${basePositions[i]}rem)`;
	el.dataset.prevPos = basePositions[i];
});

let isDragging = false;
let startY = 0;
let dragOffsetRem = 0;

const getLoopedPos = (pos) => ((pos - entryOffset) % totalHeight + totalHeight) % totalHeight + entryOffset;

function updatePositions(offset, isSnapping = false) {
	if (freezeWheel) return;
	const centerSlotPos = entryOffset + (3 * stepRem);

	entries.forEach((el, i) => {
		const rawPos = basePositions[i] + offset;
		const loopedPos = getLoopedPos(rawPos);

		const prev = parseFloat(el.dataset.prevPos);
		const diff = loopedPos - prev;

		// Wrap Detection
		if (diff < -totalHeight / 2) {
			currentIndices[i] = (currentIndices[i] + entries.length) % futharkLetters.length;
			el.textContent = futharkLetters[currentIndices[i]];
		} else if (diff > totalHeight / 2) {
			currentIndices[i] = (currentIndices[i] - entries.length + futharkLetters.length) % futharkLetters.length;
			el.textContent = futharkLetters[currentIndices[i]];
		}

		el.style.transform = `translate(-50%, ${loopedPos}rem)`;
		el.dataset.prevPos = loopedPos;

		if (isSnapping && Math.abs(loopedPos - centerSlotPos) < 0.1) {
			selectedLetter = el.textContent;
			selectedLetterElement = el;
		}
	});
}

parent.addEventListener("pointerdown", e => {
	isDragging = true;
	startY = e.clientY;
	entries.forEach(el => el.style.transition = "none");
	parent.setPointerCapture(e.pointerId);
});

parent.addEventListener("pointermove", e => {
	if (!isDragging) return;
	dragOffsetRem += (e.clientY - startY) / 16;
	startY = e.clientY;
	updatePositions(dragOffsetRem);
});

function snap() {
	if (!isDragging) return;
	isDragging = false;

	const snappedDragOffset = Math.round(dragOffsetRem / stepRem) * stepRem;

	entries.forEach((el, i) => {
		const rawPos = basePositions[i] + snappedDragOffset;
		const loopedPos = getLoopedPos(rawPos);
		const currentTransformY = parseFloat(el.style.transform.split(',')[1]) || 0;
		const distance = Math.abs(loopedPos - currentTransformY);

		if (distance > totalHeight / 2) {
			el.style.transition = "none";
		} else {
			el.style.transition = "transform 0.2s cubic-bezier(.2, .7, .3, 1)";
		}
	});

	updatePositions(snappedDragOffset, true);

	basePositions = basePositions.map(pos => getLoopedPos(pos + snappedDragOffset));
	dragOffsetRem = 0;

	console.log("Selected:", selectedLetter);
}

parent.addEventListener("pointerup", snap);
parent.addEventListener("pointercancel", snap);
parent.addEventListener("pointerleave", snap);

// Functional stuff

/**
 * Applies a glow class to one or more elements.
 *
 * @param {Element|Element[]} elements - Single element or array
 * @param {Object} options
 * @param {string} options.className - CSS class to apply (e.g. "correct-glow")
 * @param {number} [options.duration] - Auto-remove after ms (optional)
 * @param {boolean} [options.waitForTransition=false] - Wait for transitionend
 * @param {string} [options.transitionProperty="box-shadow"] - Property to wait for
 * @param {Function} [options.onComplete] - Callback after done
 */
function applyGlow(elements, {
	className,
	duration,
	waitForTransition = false,
	transitionProperty = "box-shadow",
	onComplete
}) {
	const els = Array.isArray(elements) ? elements : [elements];

	let finished = 0;
	const total = els.length;

	const done = () => {
		finished++;
		if (finished === total && onComplete) {
			onComplete();
		}
	};

	els.forEach(el => {
		el.classList.add(className);

		if (waitForTransition) {
			const onEnd = (e) => {
				if (e.propertyName !== transitionProperty) return;
				el.removeEventListener("transitionend", onEnd);
				done();
			};
			el.addEventListener("transitionend", onEnd);
		} else {
			done();
		}
	});

	if (duration != null) {
		setTimeout(() => {
			els.forEach(el => el.classList.remove(className));
		}, duration);
	}
}