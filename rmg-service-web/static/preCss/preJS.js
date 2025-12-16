export default class preJS {
  // 基础元素列表
  #element_array = [
    "div",
    "span",
    "section",
    "article",
    "aside",
    "p",
    "input",
    "textarea",
    "button",
    "select",
    "option",
    "optgroup",
    "label",
    "form",
    "table",
    "tr",
    "td",
    "th",
    "thead",
    "tbody",
    "tfoot",
    "ul",
    "ol",
    "li",
    "nav",
    "header",
    "footer",
    "main",
    "aside",
    "video",
    "audio",
    "img",
    "figure",
    "figcaption",
    "a",
    "iframe",
  ];
  // 事件列表
  #event_array = [
    "click",
    "mouseenter",
    "mouseleave",
    "change",
    "hover",
    "focus",
    "blur",
    "input",
    "mouseup",
    "mousedown",
    "mousemove",
    "keydown",
    "keyup",
  ];

  // CSS样式转换
  #_parse_style_class(_classList, _element_now) {
    _classList.forEach((item, index) => {
      if (item.indexOf("[") != -1) {
        const _data = item
          .slice(item.indexOf("-") + 1, item.length)
          .replace("[", "")
          .replace("]", "");
        switch (item.charAt(0)) {
          case "m":
            switch (item.charAt(1)) {
              case "-":
                _element_now.style.margin = _data;
                break;
              case "t":
                _element_now.style.marginTop = _data;
                break;
              case "l":
                _element_now.style.marginLeft = _data;
                break;
              case "r":
                _element_now.style.marginRight = _data;
                break;
              case "b":
                _element_now.style.marginBottom = _data;
                break;
            }
            break;
          case "p":
            switch (item.charAt(1)) {
              case "-":
                _element_now.style.padding = _data;
                break;
              case "t":
                _element_now.style.paddingTop = _data;
                break;
              case "l":
                _element_now.style.paddingLeft = _data;
                break;
              case "r":
                _element_now.style.paddingRight = _data;
                break;
              case "b":
                _element_now.style.paddingBottom = _data;
                break;
            }
            break;
          case "w":
            _element_now.style.width = _data;
            break;
          case "h":
            _element_now.style.height = _data;
            break;
          case "b":
            if (item.charAt(1) == "g") {
              _element_now.style.background = _data;
            } else {
              _element_now.style.borderWidth = _data;
            }
            break;
          case "t":
            if (_data.indexOf("px") != -1) {
              _element_now.style.fontSize = _data;
            } else {
              _element_now.style.color = _data;
            }
            break;
          case "f":
            _element_now.style.font = _data;
            break;
          case "r":
            if (item.charAt(1) == "i") {
              _element_now.style.right = _data;
            } else {
              _element_now.style.borderRadius = _data;
            }
            break;
        }
      }
    });
  }
  // 事件转换
  // #_parse_event(_element_now) {
  //   this.#event_array.forEach((_events) => {
  //     if (_element_now.hasAttribute("@" + _events)) {
  //       if (_element_now.hasAttribute("@focus")) {
  //         _element_now.setAttribute(
  //           "onfocus",
  //           _element_now.getAttribute("@" + _events) + "()"
  //         );
  //         _element_now.removeAttribute("@" + _events);
  //       } else if (_element_now.hasAttribute("@blur")) {
  //         _element_now.setAttribute(
  //           "onblur",
  //           _element_now.getAttribute("@" + _events) + "()"
  //         );
  //         _element_now.removeAttribute("@" + _events);
  //       } else {
  //         _element_now.setAttribute(
  //           "on" + _events,
  //           _element_now.getAttribute("@" + _events) + "()"
  //         );
  //         _element_now.removeAttribute("@" + _events);
  //       }
  //     }
  //   });
  // }

  // 翻译注册元素
  #_register_parse_element(array) {
    const PREJS = new preJS();
    // 添加自定义元素
    this.#element_array.concat(array);
    // 转换属性
    this.#element_array.forEach((_a, _index_a) => {
      document.querySelectorAll(_a).forEach((_b, _index_b) => {
        PREJS.#_parse_style_class(_b.classList, _b);
        // PREJS.#_parse_event(_b);
      });
    });
  }

  // 初始化加载
  static render(__array) {
    new preJS().#_register_parse_element(__array);
  }
}
