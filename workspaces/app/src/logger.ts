type Action = "click" | "touchend" | "scroll" | "start"

const getTime = (date: Date) => {
  return `${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}:${date.getSeconds().toString().padStart(2,"0")}`
}

const formatter = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${getTime(date)}`
}

function assertHTMLElement(value: any): asserts value is HTMLElement {
  if (value.nodeType === undefined) {
    throw Error("error assertHTMLElement")
  }
}
function isMobile(navigator: Navigator) {
  // iPhone, iPad, iPod, Android, Windows Phone 等の文字列が含まれるかチェック
  return /iPhone|iPad|iPod|Android|windows phone/i.test(window.navigator.userAgent);
}


function isDesktop(avigator: Navigator) {
  return !isMobile(avigator);
}

export class UserActionObserver {
  targetURL: string;
  constructor(targetURL: string) {
    this.targetURL = targetURL;
  }
  logger(action: Action, element?: HTMLElement) {
    const nowDate = new Date();
    const location = window.location;
    const outerWidth = window.outerWidth;
    const outerHeight = window.outerHeight;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const loggerBody = {
      device: isMobile(window.navigator) ? "mobile": "desktop", 
      action,
      yyyymmdd: nowDate.getTime(),
      currentLocation: location.href,
      outerHeight,
      outerWidth,
      scrollY,
      scrollX,
      targetSelector: element ? getSelector(element): "null"};

    fetch(this.targetURL, {
      method: "POST",
      body: JSON.stringify(loggerBody)
    })
  }
  observe() {
    this.logger("start")
    window.addEventListener("click",(event) => {
      const target = event?.target
      try {
        assertHTMLElement(target)
        this.logger("click", target)
      } catch {
        console.log("error observe assertHTMLElement")
      }
    })
    window.addEventListener("touchend",(event) => {
      const target = event?.target
      try {
        assertHTMLElement(target)
        this.logger("touchend", target)
      } catch {
        console.log("error observe assertHTMLElement")
      }
    })
    
  }
}

function getSelector(element: HTMLElement): string {
  // HTML ドキュメントルートまで到達したら終了
  if (!element || element.nodeType !== 1) return '';

  // タグ名を取得(小文字に統一)
  const tagName = element.tagName.toLowerCase();

  // id があれば付加
  const id = element.id ? `#${element.id}` : '';

  // class 名があれば付加
  // classListを配列にしてドットで繋げる
  const className = element.classList.length
    ? '.' + [...element.classList].join('.')
    : '';

  // 親要素があれば、親要素のセレクターを再帰的に取得
  const parent = element.parentElement;
  if (!parent || parent.tagName.toLowerCase() === 'html') {
    // ルートに近い階層はそのまま返す
    return tagName + id + className;
  } else {
    // 親要素のセレクターに対して、今の要素をつなげる
    return getSelector(parent) + ' > ' + tagName + id + className;
  }
}