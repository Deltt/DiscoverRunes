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
	"Auerochse",               // 1
	"Riese, Dämon",                     // 2
	"Ase (heidnischer Gott)",                      // 3
	"Ritt, Fahrt, Wagen",                      // 4
	"Geschwür, Krankheit",                           // 5
	"Gabe",                        // 6
	"Wonne, Freude",                          // 7
	"Hagel",                            // 8
	"Not, Zwang",             // 9
	"Eis",                             // 10
	"Jahr, Ernte",                     // 11
	"Eibe",                 // 12
	"Fruchtbaum",                               // 13
	"Elch, Schutz",                    // 14
	"Sonne",                           // 15
	"Tyr (Göttername)",          // 16
	"Birkenzweig",                   // 17
	"Pferd",                           // 18
	"Mensch, Mann",                            // 19
	"Wasser, Gewässer",                     // 20
	"Ingwaz (Göttername)",// 21
	"Tag",                  // 22
	"Erbbesitz"             // 23
];

const runeMeaningsEN = [
	"Cattle, Wealth",              // 0
	"Aurochs",                     // 1
	"Giant, Demon",                // 2
	"Aesir (pagan god)",           // 3
	"Ride, Journey, Wagon",        // 4
	"Ulcer, Disease",              // 5
	"Gift",                        // 6
	"Delight, Joy",                // 7
	"Hail",                        // 8
	"Distress, Constraint",        // 9
	"Ice",                         // 10
	"Year, Harvest",               // 11
	"Yew",                         // 12
	"Fruit tree",                  // 13
	"Elk, Protection",             // 14
	"Sun",                         // 15
	"Tyr (god's name)",            // 16
	"Birch branch",                // 17
	"Horse",                        // 18
	"Human, Man",                  // 19
	"Water, Body of water",        // 20
	"Ingwaz (god's name)",         // 21
	"Day",                          // 22
	"Inherited property"           // 23
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

	const currentActive = document.querySelector(".page.active");
	if (currentActive && quizPageIds && quizPageIds.has(currentActive.id)) {
		setTimeout(resetAllQuizLevels, 700);
		_origSwitchPage("futhark", false);
		return;
	}

	if (backArray.length > 0) {
		switchPage(backArray[backArray.length - 1], false);
		backArray.pop();
	}
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

	// 1Fade-out current page
	current.style.transition = "opacity 0.4s ease, transform 0.4s ease";
	current.style.opacity = "0";
	current.style.transform = "translateY(-0.5rem)";
	current.style.pointerEvents = "none";

	// Wait for fade-out + pause
	setTimeout(() => {
		// remove current page
		current.classList.remove("active");
		current.style.opacity = "";
		current.style.transform = "";
		current.style.transition = "";
		current.style.pointerEvents = "";

		// Prepare next page slightly above (will move down)
		next.style.opacity = "0";
		next.style.transform = "translateY(-0.5rem)";
		next.style.pointerEvents = "none";

		// add active
		next.classList.add("active");

		// Trigger fade-in
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				next.style.transition = "opacity 0.4s ease, transform 0.4s ease";
				next.style.opacity = "1";
				next.style.transform = "translateY(0)";

				// restore normal state after fade-in
				let onEndFired = false;
				const finishTransition = () => {
					if (onEndFired) return;
					onEndFired = true;
					next.style.transform = "";
					next.style.opacity = "";
					next.style.transition = "";
					next.style.pointerEvents = "";
					isSwitchingPage = false;
					next.removeEventListener("transitionend", onEnd);

					setTimeout(() => {
						const buttons = next.querySelectorAll('.default-button, .origin-button');
						buttons.forEach(btn => {
							btn.classList.add('flare-active');

							// Remove the class after animation completes so it can be re-triggered later
							btn.addEventListener('animationend', () => {
								btn.classList.remove('flare-active');
							}, { once: true });
						});
					}, 500); // 0.5s delay
				};
				const onEnd = (e) => {
					if (e.propertyName !== "opacity") return;
					finishTransition();
				};
				next.addEventListener("transitionend", onEnd);
				// Fallback: guarantee unlock even if transitionend never fires
				setTimeout(finishTransition, 600);
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

function showOverlay() {
	overlay.classList.remove("hidden", "fading-out");
	overlay.classList.add("fading-in");
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			overlay.classList.remove("fading-in");
		});
	});
}

function hideOverlay() {
	overlay.classList.add("fading-out");
	overlay.addEventListener("transitionend", () => {
		overlay.classList.add("hidden");
		overlay.classList.remove("fading-out");
	}, { once: true });
}

document.querySelectorAll(".futhark-overview-grid-tile").forEach(btn => {
	btn.addEventListener("click", () => {
		const runeIndex = Number(btn.dataset.rune_index);
		const runeLetter = futharkLetters[runeIndex];

		rune.textContent = runeLetter.toLowerCase();
		latinLetter.textContent = runeLetter.toLowerCase();
		meaning.textContent = runeMeaningsDE[runeIndex];
		showOverlay();
	});
});

document.getElementById("futhark-overview-overlay-closebox").addEventListener("click", () => {
	hideOverlay();
});

// Multi-Level Quiz System
const possibleFillers = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "z"
];

// Quiz level definitions
const quizLevels = [
	{ word: ["k", "a", "m", "m"], topId: "quiz-top", bottomId: "quiz-bottom", nextBtnId: "quiz1-next-btn", checkBtnId: "quiz1-check-btn" },
	{ word: ["f", "i", "b", "e", "l"], topId: "quiz2-top", bottomId: "quiz2-bottom", nextBtnId: "quiz2-next-btn", checkBtnId: "quiz2-check-btn" },
	{ word: ["p", "f", "e", "i", "l"], topId: "quiz3-top", bottomId: "quiz3-bottom", nextBtnId: "quiz3-next-btn", checkBtnId: "quiz3-check-btn" },
];

// Solved state per level
const quizSolved = [false, false, false];

// Store per-level state objects
const quizStates = [];

function buildQuiz(levelIndex) {
	const level = quizLevels[levelIndex];
	const word = level.word;
	const topContainer = document.getElementById(level.topId);
	const bottomContainer = document.getElementById(level.bottomId);

	// Clone buttons immediately to strip any previously attached listeners
	const _checkBtn = document.getElementById(level.checkBtnId);
	const checkBtn = _checkBtn.cloneNode(true);
	_checkBtn.parentNode.replaceChild(checkBtn, _checkBtn);

	const _nextBtn = document.getElementById(level.nextBtnId);
	const nextBtn = _nextBtn.cloneNode(true);
	_nextBtn.parentNode.replaceChild(nextBtn, _nextBtn);

	topContainer.innerHTML = "";
	bottomContainer.innerHTML = "";

	const topElements = [];
	const bottomElements = [];
	const slotSource = [];
	let currentSlot = 0;
	let locked = false;

	// Build top slots
	word.forEach((letter, i) => {
		const wrapper = document.createElement("div");
		wrapper.style.display = "flex";
		wrapper.style.flexDirection = "column";
		wrapper.style.alignItems = "center";
		wrapper.style.gap = "0.25rem";

		const div = document.createElement("div");
		topElements.push(div);
		slotSource.push(null);
		div.classList.add("quiz-top-tile");
		div.dataset.property = letter;
		div.dataset.slotIndex = i;
		div.textContent = "";

		// Hint ghost letter
		const hint = document.createElement("span");
		hint.classList.add("quiz-slot-hint");
		hint.textContent = letter;
		div.appendChild(hint);

		const typed = document.createElement("span");
		typed.classList.add("quiz-slot-typed");
		div.appendChild(typed);

		const bar = document.createElement("div");
		bar.classList.add("quiz-slot-bar");

		const dot = document.createElement("div");
		dot.classList.add("quiz-cursor-dot");
		dot.dataset.slotIndex = i;

		wrapper.appendChild(div);
		wrapper.appendChild(bar);
		wrapper.appendChild(dot);
		topContainer.appendChild(wrapper);
	});

	// Build bottom tiles
	const letters = [...word];
	while (letters.length < 8) {
		const randomLetter = possibleFillers[Math.floor(Math.random() * possibleFillers.length)];
		letters.push(randomLetter);
	}
	letters.sort(() => Math.random() - 0.5);

	letters.forEach((letter, idx) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("futhark-overview-grid-tile-wrapper");
		const div = document.createElement("div");
		bottomElements.push(div);
		div.classList.add("futhark-overview-grid-tile");
		const p = document.createElement("p");
		p.classList.add("futhark-overview-grid-letter");
		div.dataset.property = letter;
		div.dataset.bottomIndex = idx;
		p.textContent = letter;
		div.appendChild(p);
		wrapper.appendChild(div);
		bottomContainer.appendChild(wrapper);
	});

	function updateCursorLocal() {
		topContainer.querySelectorAll(".quiz-cursor-dot").forEach(dot => {
			const idx = parseInt(dot.dataset.slotIndex);
			dot.classList.toggle("quiz-cursor-dot-active", idx === currentSlot);
		});
	}

	function findFirstEmpty() {
		for (let i = 0; i < topElements.length; i++) {
			if (slotSource[i] === null) return i;
		}
		return topElements.length;
	}

	function showNextButton() {
		nextBtn.style.opacity = "0";
		nextBtn.classList.remove("hidden");
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				nextBtn.style.transition = "opacity 0.6s ease";
				nextBtn.style.opacity = "1";
			});
		});
	}

	function checkAnswer() {
		locked = true;
		const filled = topElements.map(el => el.querySelector(".quiz-slot-typed").textContent);
		const allCorrect = filled.every((letter, i) => letter === word[i]);

		if (allCorrect) {
			topElements.forEach(el => el.classList.add("correct-glow"));
			quizSolved[levelIndex] = true;
			setTimeout(showNextButton, 400);
		} else {
			const wrongEls = [];
			topElements.forEach((el, i) => {
				if (el.querySelector(".quiz-slot-typed").textContent === word[i]) {
					el.classList.add("correct-glow");
				} else {
					el.classList.add("wrong-glow");
					wrongEls.push(el);
				}
			});

			setTimeout(() => {
				wrongEls.forEach(el => {
					el.style.transition = "opacity 0.35s ease";
					el.style.opacity = "0";
				});

				setTimeout(() => {
					wrongEls.forEach(el => {
						// Kill transition first so clearing opacity doesn't animate
						el.style.transition = "none";
						el.style.opacity = "";
						el.classList.remove("wrong-glow");
						el.querySelector(".quiz-slot-typed").textContent = "";
						el.classList.remove("quiz-slot-filled");

						const i = parseInt(el.dataset.slotIndex);
						if (slotSource[i] !== null) {
							const bottomEl = bottomElements[slotSource[i]];
							if (bottomEl) bottomEl.classList.remove("futhark-overview-grid-tile-disabled");
							slotSource[i] = null;
						}
					});
					// Force a reflow so the transition:none takes effect before we restore it
					wrongEls[0] && wrongEls[0].offsetHeight;
					wrongEls.forEach(el => { el.style.transition = ""; });

					currentSlot = findFirstEmpty();
					updateCursorLocal();
					locked = false;
					checkBtn.disabled = true;
					bottomElements.forEach((bEl, bIdx) => {
						if (!slotSource.includes(bIdx)) bEl.classList.remove("futhark-overview-grid-tile-disabled");
					});
				}, 400);
			}, 2600);
		}
	}

	// Top slot click
	topElements.forEach((el, i) => {
		el.addEventListener("click", () => {
			if (locked) return;
			if (el.classList.contains("correct-glow")) return;

			if (slotSource[i] !== null) {
				const bottomEl = bottomElements[slotSource[i]];
				if (bottomEl) bottomEl.classList.remove("futhark-overview-grid-tile-disabled");
				slotSource[i] = null;
				el.querySelector(".quiz-slot-typed").textContent = "";
				el.classList.remove("quiz-slot-filled", "wrong-glow", "correct-glow");
				checkBtn.disabled = true;
				bottomElements.forEach((bEl, bIdx) => {
					if (!slotSource.includes(bIdx)) bEl.classList.remove("futhark-overview-grid-tile-disabled");
				});
				currentSlot = i;
				updateCursorLocal();
			} else {
				currentSlot = i;
				updateCursorLocal();
			}
		});
	});

	// Bottom tile click
	bottomElements.forEach((div, bottomIdx) => {
		div.addEventListener("click", () => {
			if (locked) return;
			if (div.classList.contains("futhark-overview-grid-tile-disabled")) return;
			if (currentSlot >= topElements.length) return;

			const letter = div.dataset.property;
			div.classList.add("futhark-overview-grid-tile-disabled");

			const topEl = topElements[currentSlot];
			topEl.querySelector(".quiz-slot-typed").textContent = letter;
			topEl.classList.add("quiz-slot-filled");
			slotSource[currentSlot] = bottomIdx;

			const totalSlots = topElements.length;
			const allFilled = slotSource.every(s => s !== null);
			checkBtn.disabled = !allFilled;
			if (allFilled) {
				currentSlot = -1;
				updateCursorLocal();
				bottomElements.forEach(el => el.classList.add("futhark-overview-grid-tile-disabled"));
			} else {
				let next = -1;
				for (let offset = 1; offset <= totalSlots; offset++) {
					const candidate = (currentSlot + offset) % totalSlots;
					if (slotSource[candidate] === null) { next = candidate; break; }
				}
				currentSlot = next;
				updateCursorLocal();
			}
		});
	});

	// Wire check button
	checkBtn.addEventListener("click", () => {
		if (checkBtn.disabled || locked) return;
		checkBtn.disabled = true;
		setTimeout(checkAnswer, 150);
	});

	// Wire next button
	nextBtn.addEventListener("click", () => {
		const targetId = nextBtn.dataset.next;
		switchPage(targetId, true);
	});

	// Restore solved state if level was already solved
	function restoreSolved() {
		if (!quizSolved[levelIndex]) return;
		locked = true;
		// Re-populate slotSource with best-effort matching from bottomElements
		topElements.forEach((el, i) => {
			el.querySelector(".quiz-slot-typed").textContent = word[i];
			el.classList.add("quiz-slot-filled", "correct-glow");
		});
		currentSlot = -1;
		updateCursorLocal();
		nextBtn.style.transition = "";
		nextBtn.style.opacity = "1";
		nextBtn.classList.remove("hidden");
	}

	updateCursorLocal();

	return { restoreSolved };
}

// Build all quiz levels on page load
quizLevels.forEach((_, i) => {
	quizStates.push(buildQuiz(i));
});

// Reset all quiz levels
function resetAllQuizLevels() {
	quizSolved.fill(false);
	quizStates.length = 0;
	// Re-hide all next buttons
	["quiz1-next-btn", "quiz2-next-btn", "quiz3-next-btn"].forEach(id => {
		const btn = document.getElementById(id);
		if (btn) {
			btn.classList.add("hidden");
			btn.style.opacity = "";
			btn.style.transition = "";
		}
	});
	["quiz1-check-btn", "quiz2-check-btn", "quiz3-check-btn"].forEach(id => {
		const btn = document.getElementById(id);
		if (btn) btn.disabled = true;
	});
	quizLevels.forEach((_, i) => {
		quizStates.push(buildQuiz(i));
	});
}

// Patch switchPage to handle quiz page transitions
const _origSwitchPage = switchPage;
const quizPageIds = new Set(["quiz", "quiz2", "quiz3"]);
const levelMap = { "quiz": 0, "quiz2": 1, "quiz3": 2 };

switchPage = function (targetId, addToBack) {
	const currentActive = document.querySelector(".page.active");
	const leavingQuiz = currentActive && quizPageIds.has(currentActive.id);
	const enteringQuiz = quizPageIds.has(targetId);

	if (leavingQuiz || enteringQuiz) addToBack = false;

	if (enteringQuiz) {
		const targetLevel = levelMap[targetId];
		if (targetLevel !== undefined) {
			setTimeout(() => quizStates[targetLevel].restoreSolved(), 650);
		}
	}

	_origSwitchPage(targetId, addToBack);
};

// Wheel
const wheelLetter = "r";
let selectedLetter = "a";
let selectedLetterElement;
const wheelCheckButton = document.getElementById("wheel-check-button");
let freezeWheel = false;

wheelCheckButton && wheelCheckButton.addEventListener("click", () => {
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
			duration: 3000
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
const referenceEntryOffset = -1.0; // For reference wheels - adjust this value

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
const centerIndex = 3;
entries.forEach((el, i) => {
	el.style.position = "absolute";
	el.style.left = "50%";
	el.textContent = futharkLetters[currentIndices[i]];
	el.style.transform = `translate(-50%, ${basePositions[i]}rem)`;
	el.dataset.prevPos = basePositions[i];
	if (i === centerIndex) {
		selectedLetter = el.textContent;
		selectedLetterElement = el;
	}
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
	e.preventDefault();
	isDragging = true;
	startY = e.clientY;
	entries.forEach(el => el.style.transition = "none");
	parent.setPointerCapture(e.pointerId);
});

parent.addEventListener("pointermove", e => {
	if (!isDragging) return;
	e.preventDefault();
	const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
	dragOffsetRem += (e.clientY - startY) / remSize;
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

// ── Voting Page
const voteData = JSON.parse(localStorage.getItem("voteData")) || { lat: 0, nor: 0, pho: 0, gre: 0 };
let hasVoted = false;

function castVote(id) {
	if (hasVoted) return;
	hasVoted = true;
	voteData[id]++;

	// Save votes and user state
	localStorage.setItem("voteData", JSON.stringify(voteData));
	localStorage.setItem("hasVoted", "true");
	localStorage.setItem("votedFor", id);

	const total = Object.values(voteData).reduce((s, v) => s + v, 0);

	document.querySelectorAll(".vote-bar").forEach(bar => {
		const barId = bar.dataset.id;
		const pct = Math.round((voteData[barId] / total) * 100);
		bar.querySelector(".vote-fill").style.width = pct + "%";
		bar.querySelector(".vote-pct").textContent = pct + "%";
		if (barId !== id) bar.style.opacity = "0.5";
		bar.style.cursor = "default";
	});

	document.getElementById("vote-weiter").classList.add("visible");
}

function resetVote() {
	// Only resets visuals and vote flag
	hasVoted = false;
	document.querySelectorAll(".vote-bar").forEach(bar => {
		bar.querySelector(".vote-fill").style.width = "0%";
		bar.querySelector(".vote-pct").textContent = "";
		bar.style.opacity = "";
		bar.style.cursor = "";
	});
	document.getElementById("vote-weiter").classList.remove("visible");
}


//Tile Animation
(function () {
	const COOLDOWN_MS = 2000;
	const FLARE_DURATION_MS = 1800;
	let running = false;  // guard against double-start

	function fireRandomFlare() {
		const page = document.getElementById('futhark');
		if (!page || !page.classList.contains('active')) {
			running = false;
			return;
		}

		const tiles = Array.from(
			document.querySelectorAll(
				'#futhark .futhark-overview-grid-tile-wrapper:not(:has(.futhark-overview-grid-tile-disabled))'
			)
		);
		if (!tiles.length) return;

		const tile = tiles[Math.floor(Math.random() * tiles.length)];
		tile.classList.add('flare-active');

		setTimeout(() => {
			tile.classList.remove('flare-active');
		}, FLARE_DURATION_MS);

		setTimeout(fireRandomFlare, FLARE_DURATION_MS + COOLDOWN_MS);
	}

	function startOnce() {
		if (running) return;
		running = true;
		setTimeout(fireRandomFlare, 2500);
	}

	const page = document.getElementById('futhark');
	setInterval(() => {
		const isActive = page && page.classList.contains('active');
		if (isActive) {
			startOnce();
		} else {
			running = false;
		}
	}, 500);
})();

// Counter-skew button text: wrap direct text nodes in a span
document.querySelectorAll('.default-button, .origin-button').forEach(btn => {
	btn.childNodes.forEach(node => {
		if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
			const span = document.createElement('span');
			span.className = 'button-text';
			span.textContent = node.textContent;
			btn.replaceChild(span, node);
		}
	});
});