//蒙版项
class _maskItem extends HTMLElement {
    constructor() {
        super();
        // 影子DOM
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
        <style>
            .MASK-CONTAINER{
                display: flex;
                align-items: center;
                
                .value{
                    height: 20px;
                    font-size: 13px;
                }
                
                .label{
                    font-size: 15px;
                }
            }
        </style>
        <div class="MASK-CONTAINER">
            <p class="label"></p>
            <input class="value" value=""/>
         </div>
        `
    }

    static get observedAttributes() {
        return ["label", "value"];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "label") {
            this.shadowRoot.querySelector(".label").textContent = newVal;
        }
        if (attrName === "value") {
            this.shadowRoot.querySelector(".value").value = newVal;
        }
    }
}

window.customElements.define("mask-item", _maskItem)