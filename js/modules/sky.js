/* ============================================================
   夜空：星星 / 浮尘 / 流星
   ============================================================ */

import { reducedMotion } from "./utils.js";

export function buildSky() {
    const sky = document.querySelector(".sky");
    if (!sky || reducedMotion) return;

    /* 星星（圆点 + 少量十字星） */
    for (let i = 0; i < 46; i++) {
        const el = document.createElement("span");
        const cross = Math.random() < 0.18;
        el.className = "star" + (cross ? " cross" : "");
        const size = cross ? 8 + Math.random() * 8 : 1 + Math.random() * 2.2;
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

    /* 缓缓上升的浮尘 */
    for (let i = 0; i < 14; i++) {
        const el = document.createElement("span");
        el.className = "mote";
        const m = 1.4 + Math.random() * 2.4;
        el.style.width = m.toFixed(1) + "px";
        el.style.height = el.style.width;
        el.style.left = (Math.random() * 96).toFixed(1) + "%";
        el.style.top = (55 + Math.random() * 45).toFixed(1) + "%";
        el.style.setProperty("--dur", (13 + Math.random() * 14).toFixed(2) + "s");
        el.style.setProperty("--delay", (Math.random() * 16).toFixed(2) + "s");
        sky.appendChild(el);
    }

    /* 偶尔划过一颗流星 */
    (function shoot() {
        const s = document.createElement("span");
        s.className = "shooting-star fly";
        s.style.top = (4 + Math.random() * 30).toFixed(1) + "%";
        s.style.left = (45 + Math.random() * 50).toFixed(1) + "%";
        sky.appendChild(s);
        setTimeout(() => s.remove(), 1800);
        setTimeout(shoot, 7000 + Math.random() * 9000);
    });
}
