const templateContent = `<link rel="stylesheet" href="./xttmsg/xttmsg.css">
<pre id="left"><code id="leftContent" class="language-xtt" contenteditable="true"><slot></slot></code></pre>
<div id="center">
    <button id="run">执行</button>
	<span id="time"></span>
</div>
<div id="right"></div>
`;

const throttle = (fn, delay) => {
	// 节流函数
	const stash = [];
	let isWaiting = false;
	function run() {
		if (stash.length >= 1 && !isWaiting) {
			isWaiting = true;
			fn(stash[0]);
			setTimeout(() => {
				stash.shift();
				isWaiting = false;
				run();
			}, delay);
		}
	}

	return (arg) => {
		if (stash.length < 2) {
			stash.push(arg);
		} else {
			stash[1] = arg;
		}
		run();
	};
};

customElements.define(
	"xtt-msg",
	class xttMsgElement extends HTMLElement {
		static template() {
			const template = document.createElement("template");
			template.innerHTML = templateContent;

			return template.content.cloneNode(true);
		}

		#shadowRoot;
		#observer;

		constructor() {
			super();

			this.#shadowRoot = this.attachShadow({ mode: "open" });
			this.#shadowRoot.appendChild(xttMsgElement.template());

			this.#shadowRoot
				.querySelector("#run")
				.addEventListener("click", () => {
					this.#doShowText();
				});
			const left = this.#shadowRoot.querySelector("#leftContent");

			const doChangeHighlight = throttle(
				this.#changeHighlight.bind(this),
				1000
			);
			left.addEventListener("input", () => {
				doChangeHighlight();
			});

			this.#observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					left.textContent = mutation.target.textContent;
					this.#changeHighlight();
					this.#doShowText();
				});
			});
		}

		#oldRangeList = [];
		#changeHighlight() {
			if (!CSS.highlights) {
				return;
			}
			const left =
				this.#shadowRoot.querySelector("#leftContent").firstChild;

			const rangeList = [];

			for (const match of left.textContent.matchAll(/[\[\]\(\)]|-->>/g)) {
				const range = new Range();
				range.setStart(left, match.index);
				range.setEnd(left, match.index + match[0].length);
				rangeList.push(range);
			}

			let highlight;
			if (CSS.highlights.has("xtt-highlight")) {
				highlight = CSS.highlights.get("xtt-highlight");

				if (this.#oldRangeList.length) {
					this.#oldRangeList.forEach((range) =>
						highlight.delete(range)
					);
				}

				rangeList.forEach((range) => highlight.add(range));
			} else {
				highlight = new Highlight(...rangeList);
			}
			CSS.highlights.set("xtt-highlight", highlight);
			this.#oldRangeList = rangeList;
		}

		async #doShowText() {
			const left = this.#shadowRoot.querySelector("#leftContent");
			const right = this.#shadowRoot.querySelector("#right");
			const time = this.#shadowRoot.querySelector("#time");
			const start = Date.now();
			const text = left.textContent;
			console.time(text);
			right.innerHTML = await window.showText.showTextBrowser(text);
			console.timeEnd(text);
			time.textContent = "用时: " + (Date.now() - start) + "ms";
		}

		connectedCallback() {
			this.#observer.observe(this, {
				childList: true
			});
		}
	}
);
