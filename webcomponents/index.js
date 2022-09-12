class SampleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static observedAttributes = ["color"];

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div id="wrapper">
        <div>
          <input id="height" type="number" value="10" />行 <button id="change-height">高さを変える</button>
        </div>
        <div>
          <input id="title" value="デフォルト" /> <button id="change-title">タイトルを変更する</button>
        </div>
        <div>
          <input id="message" value="デフォルトメッセージ" /> <button id="send-message">Monolithにメッセージを送る</button>
        </div>
        <div id="text"></div>
      </div>
    `;
    this.wrapperEl = this.shadowRoot.getElementById("wrapper");
    this.wrapperEl.style.backgroundColor = this.getAttribute("color") ?? "#fff";
    this.heightInputEl = this.shadowRoot.getElementById("height");
    this.titleInputEl = this.shadowRoot.getElementById("title");
    this.messageInputEl = this.shadowRoot.getElementById("message");
    this.textEl = this.shadowRoot.getElementById("text");
    this.shadowRoot.getElementById("change-height").addEventListener("click", this.onChangeHeightClick)
    this.shadowRoot.getElementById("change-title").addEventListener("click", this.onChangeTitleClick)
    this.shadowRoot.getElementById("send-message").addEventListener("click", this.onSendMessageClick)
  }

  onChangeHeightClick = () => {
    this.textEl.innerText = Array(parseInt(this.heightInputEl.value, 10)).fill(null).map(_ => "これはテキストです").join("\n");
  }

  onChangeTitleClick = () => {
    document.title = this.titleInputEl.value;
  }

  onSendMessageClick = () => {
    const event = new CustomEvent("custom-message", { detail: this.messageInputEl.value });
    this.dispatchEvent(event);
  }
}

customElements.define("sample-component", SampleComponent);
