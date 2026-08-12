/* ============================================================
   一笔一划写字引擎
   把一段文字拆成单个 SVG <text>，先描边、再填墨，
   像苹果开机的「你好」那样被写出来。
   ============================================================ */

const SVG_NS = "http://www.w3.org/2000/svg";
const PUNCT_RE = /[，。！？、；：,.!?;:]/;

/**
 * @param {HTMLElement} container  写入容器（内容会被清空）
 * @param {string} text            要书写的文字
 * @param {object} [options]
 * @param {number} [options.baseDelay=0]    首字延迟（秒）
 * @param {number} [options.charGap=0.3]    字与字的间隔（秒）
 * @param {number} [options.drawDur=1.0]    单字描边时长（秒）
 * @param {string} [options.fontSize]       CSS 字号（支持 clamp）
 * @returns {number} 全部写完所需总秒数，便于安排后续登场
 */
export function drawText(container, text, options = {}) {
    const {
        baseDelay: baseDelayOpt = 0,
        charGap = 0.3,
        drawDur = 1.0,
        fontSize = "clamp(30px, 5.6vw, 62px)"
    } = options;

    container.textContent = "";

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "draw-line");
    svg.setAttribute("width", "100%");
    container.appendChild(svg);

    const chars = Array.from(text);
    const texts = chars.map(ch => {
        const t = document.createElementNS(SVG_NS, "text");
        t.setAttribute("class", "draw-char");
        t.style.fontSize = fontSize;
        t.textContent = ch === " " ? " " : ch;
        svg.appendChild(t);
        return t;
    });

    const total = baseDelayOpt + chars.length * charGap + drawDur;

    function layout() {
        const width = container.clientWidth || svg.clientWidth || 320;

        /* 量出每个字的宽度，横向排开并整体居中 */
        let widths = texts.map(measure);
        let totalW = widths.reduce((a, b) => a + b, 0);
        let fs = parseFloat(window.getComputedStyle(texts[0]).fontSize) || 48;

        /* 一行放不下时整体缩字号 */
        if (totalW > width) {
            fs = Math.max(18, fs * (width / totalW) * 0.96);
            texts.forEach(t => { t.style.fontSize = fs + "px"; });
            widths = texts.map(measure);
            totalW = widths.reduce((a, b) => a + b, 0);
        }

        svg.setAttribute("height", Math.ceil(fs * 1.55));

        let x = (width - totalW) / 2;
        let delay = baseDelayOpt;
        texts.forEach((t, idx) => {
            const punct = PUNCT_RE.test(chars[idx]);
            t.setAttribute("x", x);
            t.setAttribute("y", fs * 1.12);
            t.style.setProperty("--d", delay.toFixed(2) + "s");
            t.style.setProperty("--draw-dur", (punct ? drawDur * 0.45 : drawDur).toFixed(2) + "s");
            x += widths[idx];
            delay += punct ? charGap * 0.55 : charGap;
        });

        texts.forEach(t => t.classList.add("play"));
    }

    function measure(t) {
        try { return t.getComputedTextLength(); }
        catch { return 30; }
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => requestAnimationFrame(layout));
    } else {
        requestAnimationFrame(layout);
    }

    return total;
}

/** 页面标题自动书写：<h1 data-draw="标题文字"> */
export function initDrawnTitles() {
    document.querySelectorAll("[data-draw]").forEach(el => {
        drawText(el, el.getAttribute("data-draw"), {
            baseDelay: 0.45,
            fontSize: "clamp(30px, 5.2vw, 56px)"
        });
    });
}
