const futharkLetters = [
	"f",  // 0
	"u",  // 1
	"x",  // 2
	"a",  // 3
	"r",  // 4
	"k",  // 5
	"g",  // 6
	"w",  // 7
	"h",  // 8
	"n",  // 9
	"i",  // 10
	"j",  // 11
	"c",  // 12
	"p",  // 13
	"z",  // 14
	"s",  // 15
	"t",  // 16
	"b",  // 17
	"e",  // 18
	"m",  // 19
	"l",  // 20
	"q",  // 21
	"d",  // 22
	"o"   // 23
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
document.getElementById("back-button").addEventListener("click", () => {
	if (isSwitchingPage) return;
	switchPage(lastPage);
});

document.getElementById("home-button").addEventListener("click", () => {
	if (isSwitchingPage) return;
	switchPage("start");
});


function switchPage(targetId) {
	overlay.classList.add("hidden");
	const current = document.querySelector(".page.active");
	const next = document.getElementById(targetId);

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
document.querySelectorAll(".advance-button").forEach(btn => {
	btn.addEventListener("click", () => {
		const targetId = btn.dataset.next;
		switchPage(targetId);
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
let currentTopElement = 0;

const possibleFillers = [
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	"n", "o", "p", "q", "r", "s", "t", "u", "w", "x", "z"
];

quizWord1.forEach(letter => {
	const div = document.createElement("div");
	quizTopElements.push(div);
	div.classList.add("quiz-top-tile");
	div.dataset.property = letter;
	div.textContent = "_";
	quizTop.appendChild(div);
});

const letters = [...quizWord1];

while (letters.length < 8) {
	const randomLetter =
		possibleFillers[Math.floor(Math.random() * possibleFillers.length)];
	letters.push(randomLetter);
}

letters.sort(() => Math.random() - 0.5);

letters.forEach(letter => {
	const div = document.createElement("div");
	quizBottomElements.push(div);
	div.classList.add("futhark-overview-grid-tile");
	const p = document.createElement("p");
	p.classList.add("futhark-overview-grid-letter");

	div.dataset.property = letter;
	//div.textContent = letter;
	p.textContent = letter;

	quizBottom.appendChild(div);
	div.appendChild(p);
});

function resetTop() {
	currentTopElement = 0;
	quizTopElements.forEach(el => {
		el.textContent = "_";
		el.classList.remove("correct-glow");
	});

	quizBottomElements.forEach(el => {
		el.classList.remove("futhark-overview-grid-tile-disabled");
	});
}

function checkAnswer() {
	const filled = quizTopElements.map(el => el.textContent);
	const correct = filled.every((letter, i) => letter === quizWord1[i]);

	if (correct) {
		quizTopElements.forEach(el => {
			el.classList.add("correct-glow");
		});
	} else {
		let finished = 0;

		quizTopElements.forEach(el => {
			el.classList.add("wrong-glow");

			const onTransitionEnd = (e) => {
				if (e.propertyName !== "box-shadow") return;

				el.removeEventListener("transitionend", onTransitionEnd);
				finished++;

				if (finished === quizTopElements.length) {
					// ⏳ extra pause AFTER glow finishes
					setTimeout(() => {
						quizTopElements.forEach(el => {
							el.classList.remove("wrong-glow");
						});
						resetTop();
					}, 1000); // ← at least 1 second
				}
			};

			el.addEventListener("transitionend", onTransitionEnd);
		});
	}
}

quizBottomElements.forEach(div => {
	div.addEventListener("click", () => {
		// Prevent overflow
		if (currentTopElement >= quizTopElements.length) return;
		if (div.classList.contains("futhark-overview-grid-tile-disabled")) return;

		const letter = div.dataset.property;
		div.classList.add("futhark-overview-grid-tile-disabled");

		// Fill top slot
		const topEl = quizTopElements[currentTopElement];
		topEl.textContent = letter;

		currentTopElement++;

		// If filled all slots → check
		if (currentTopElement === quizTopElements.length) {
			checkAnswer();
		}
	});
});

// Wheel
const wheelLetter = "g";
let selectedLetter = "a";

document.querySelectorAll(".wheel-fixed").forEach(btn => {
    // Set the letter content
    btn.textContent = wheelLetter;
    
    // Get the font name from data-font="..."
    const fontName = btn.dataset.font;
    
    // Apply it to the style object
    if (fontName) {
        btn.style.fontFamily = fontName;
    }
});

const stepRem = 4;      
const entryOffset = -3.25; 
const parent = document.getElementById("wheel-main");
const entries = Array.from(document.querySelectorAll(".wheel-main-entry"));
const totalHeight = entries.length * stepRem; 

let basePositions = entries.map((_, i) => entryOffset + i * stepRem);
let currentIndices = entries.map((_, i) => i); 

// Initialize
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

// 🛠️ The "Single Source of Truth" Update Function
function updatePositions(offset, isSnapping = false) {
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
        
        // 1️⃣ Check if this element needs to "teleport" during the snap
        // If the distance between current visual pos and target is huge, it's a wrap.
        const currentTransformY = parseFloat(el.style.transform.split(',')[1]) || 0;
        const distance = Math.abs(loopedPos - currentTransformY);

        if (distance > totalHeight / 2) {
            // Disable transition so it jumps instantly "backstage"
            el.style.transition = "none";
        } else {
            // Normal slide for elements staying on screen
            el.style.transition = "transform 0.2s cubic-bezier(.2, .7, .3, 1)";
        }
    });

    // 2️⃣ Trigger the update (the browser applies the styles above)
    updatePositions(snappedDragOffset, true);

    // 3️⃣ Commit positions
    basePositions = basePositions.map(pos => getLoopedPos(pos + snappedDragOffset));
    dragOffsetRem = 0;

    console.log("Selected:", selectedLetter);
}

parent.addEventListener("pointerup", snap);
parent.addEventListener("pointercancel", snap);
parent.addEventListener("pointerleave", snap);