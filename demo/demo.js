const templateContent = `
<link rel="stylesheet" href="./demo.css">
<div id="left" contenteditable="true"></div>
<div id="center">
    <button id="run">执行</button>
	<span id="time"></span>
</div>
<div id="right"></div>
`;

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

			this.#shadowRoot.querySelector("#run").addEventListener("click", () => {
				this.#doShowText();
			});
			const left = this.#shadowRoot.querySelector("#left");
			this.#observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					left.textContent = mutation.target.textContent;
					this.#doShowText();
				});
			});
		}

		#doShowText() {
			const left = this.#shadowRoot.querySelector("#left");
			const right = this.#shadowRoot.querySelector("#right");
			const time = this.#shadowRoot.querySelector("#time");
			const start = Date.now();
			console.time("doShowText");
			right.innerHTML = window.showText.showTextBrowser(left.textContent);
			console.timeEnd("doShowText");
			time.textContent = "用时: " + (Date.now() - start) + "ms";
		}

		connectedCallback() {
			this.#observer.observe(this, {
				childList: true
			});
		}
	}
);