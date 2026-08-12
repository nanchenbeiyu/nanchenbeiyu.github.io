/* ============================================================
   黑白童话风 · 共享魔法
   星空 / 浮尘 / 流星 / 进场浮现 / 一笔一划写字引擎
   ============================================================ */
(function () {
    "use strict";

    var SVG_NS = "http://www.w3.org/2000/svg";
    var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- 星空与浮尘 ---------- */
    function buildSky() {
        var sky = document.querySelector(".sky");
        if (!sky || reducedMotion) return;

        var i, el;
        for (i = 0; i < 46; i++) {
            el = document.createElement("span");
            var cross = Math.random() < 0.18;
            el.className = "star" + (cross ? " cross" : "");
            var size = cross ? 8 + Math.random() * 8 : 1 + Math.random() * 2.2;
            if (cross) {
                el.style.setProperty("--size", size.toFixed(0) + "px");
            } else {
                el.style.width = size.toFixed(1) + "px";
                el.style.height = el.style.width;
            }
            el.style.top = (Math.random() * 92).toFixed(1) + "%";
            el.style.left = (Math.random() * 96).toFixed(1) + "%";
            el.style.setProperty("--dur", (2.6 + Math.random() * 4.5).toFixed(2) + "s");
            el.style.setProperty("--delay", (Math.random() * 6).toFixed(2) + "s");
            sky.appendChild(el);
        }

        for (i = 0; i < 14; i++) {
            el = document.createElement("span");
            el.className = "mote";
            var m = 1.4 + Math.random() * 2.4;
            el.style.width = m.toFixed(1) + "px";
            el.style.height = el.style.width;
            el.style.left = (Math.random() * 96).toFixed(1) + "%";
            el.style.top = (55 + Math.random() * 45).toFixed(1) + "%";
            el.style.setProperty("--dur", (13 + Math.random() * 14).toFixed(2) + "s");
            el.style.setProperty("--delay", (Math.random() * 16).toFixed(2) + "s");
            sky.appendChild(el);
        }

        /* 偶尔划过一颗流星 */
        function shoot() {
            var s = document.createElement("span");
            s.className = "shooting-star fly";
            s.style.top = (4 + Math.random() * 30).toFixed(1) + "%";
            s.style.left = (45 + Math.random() * 50).toFixed(1) + "%";
            sky.appendChild(s);
            setTimeout(function () { s.remove(); }, 1800);
            setTimeout(shoot, 7000 + Math.random() * 9000);
        }
        setTimeout(shoot, 3500);
    }

    /* ---------- 进场浮现 ---------- */
    function buildRise() {
        var items = document.querySelectorAll(".rise");
        if (!items.length) return;
        if (!("IntersectionObserver" in window) || reducedMotion) {
            items.forEach(function (el) { el.classList.add("in"); });
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        items.forEach(function (el) { io.observe(el); });
    }

    /* ============================================================
       一笔一划写字引擎
       把一段文字拆成单个 SVG <text>，先描边、再填墨，
       像苹果开机的「你好」那样被写出来。
       返回总耗时（秒），便于安排后续登场。
       ============================================================ */
    function drawText(container, text, options) {
        options = options || {};
        var baseDelay = options.baseDelay || 0;
        var charGap = options.charGap != null ? options.charGap : 0.3;
        var drawDur = options.drawDur != null ? options.drawDur : 1.0;
        var fontSize = options.fontSize || "clamp(30px, 5.6vw, 62px)";

        container.textContent = "";

        var svg = document.createElementNS(SVG_NS, "svg");
        svg.setAttribute("class", "draw-line");
        svg.setAttribute("width", "100%");
        container.appendChild(svg);

        var chars = Array.from(text);
        var texts = chars.map(function (ch) {
            var t = document.createElementNS(SVG_NS, "text");
            t.setAttribute("class", "draw-char");
            t.style.fontSize = fontSize;
            t.textContent = ch === " " ? " " : ch;
            svg.appendChild(t);
            return t;
        });

        var total = baseDelay + chars.length * charGap + drawDur;

        function layout() {
            var width = container.clientWidth || svg.clientWidth || 320;
            /* 量出每个字的宽度，横向排开并整体居中 */
            var widths = texts.map(function (t) {
                try { return t.getComputedTextLength(); }
                catch (e) { return 30; }
            });
            var totalW = widths.reduce(function (a, b) { return a + b; }, 0);
            /* 字号解析成像素，用于行高 */
            var fs = parseFloat(window.getComputedStyle(texts[0]).fontSize) || 48;
            if (totalW > width) {
                var shrink = width / totalW;
                fs = Math.max(18, fs * shrink * 0.96);
                texts.forEach(function (t) { t.style.fontSize = fs + "px"; });
                widths = texts.map(function (t) {
                    try { return t.getComputedTextLength(); }
                    catch (e) { return fs * 0.6; }
                });
                totalW = widths.reduce(function (a, b) { return a + b; }, 0);
            }
            svg.setAttribute("height", Math.ceil(fs * 1.55));
            var x = (width - totalW) / 2;
            texts.forEach(function (t, idx) {
                var ch = chars[idx];
                var punct = /[，。！？、；：,.!?;:]/.test(ch);
                var dur = punct ? drawDur * 0.45 : drawDur;
                var gap = punct ? charGap * 0.55 : charGap;
                t.setAttribute("x", x);
                t.setAttribute("y", fs * 1.12);
                t.style.setProperty("--d", baseDelay.toFixed(2) + "s");
                t.style.setProperty("--draw-dur", dur.toFixed(2) + "s");
                x += widths[idx];
                baseDelay += gap;
            });
            texts.forEach(function (t) { t.classList.add("play"); });
        }

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () {
                requestAnimationFrame(layout);
            });
        } else {
            requestAnimationFrame(layout);
        }
        return total;
    }

    /* 页面标题自动书写：<h1 class="page-title" data-draw="标题文字"> */
    function buildDrawnTitles() {
        var nodes = document.querySelectorAll("[data-draw]");
        nodes.forEach(function (el) {
            drawText(el, el.getAttribute("data-draw"), {
                baseDelay: 0.45,
                fontSize: "clamp(30px, 5.2vw, 56px)"
            });
        });
    }

    window.fairytale = { drawText: drawText, reducedMotion: reducedMotion };

    document.addEventListener("DOMContentLoaded", function () {
        buildSky();
        buildRise();
        buildDrawnTitles();
    });
})();
