/* ============================================================
   扉页 · 邀请仪式（仅 index.html 加载）
   1. 画像从夜色中浮现，由大变小
   2. 「你好，我是 nilo，欢迎来到我的个人网页」一笔一划写出
   3. 三扇门依次亮起
   点击任意处可跳过仪式
   （ES module 自带 defer，执行时 DOM 已就绪）
   ============================================================ */

import { drawText } from "./modules/drawText.js";
import { reducedMotion } from "./modules/utils.js";

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const gate = document.getElementById("gate");
const hint = document.getElementById("hint");

if (line1 && line2 && gate) {
    let done = false;
    let timer = null;

    const openGate = () => {
        if (done) return;
        done = true;
        gate.classList.add("open");
        if (hint) hint.classList.add("show");
    };

    if (reducedMotion) {
        document.body.classList.add("instant");
        openGate();
    } else {
        /* 画像落定（约 2.65s）之后，笔尖落纸 */
        const t1 = drawText(line1, "你好，我是 nilo，", {
            baseDelay: 2.75,
            charGap: 0.3,
            drawDur: 1.05,
            fontSize: "clamp(30px, 5.8vw, 64px)"
        });

        /* 第二行稍稍抢拍，像连笔 */
        const t2 = drawText(line2, "欢迎来到我的个人网页", {
            baseDelay: Math.max(t1 - 0.5, 3.2),
            charGap: 0.3,
            drawDur: 1.05,
            fontSize: "clamp(30px, 5.8vw, 64px)"
        });

        timer = setTimeout(openGate, (t2 + 0.5) * 1000);

        /* 跳过仪式 */
        document.addEventListener("click", function skip() {
            if (done) return;
            if (timer) clearTimeout(timer);
            document.body.classList.add("instant");
            openGate();
            document.removeEventListener("click", skip);
        });
    }
}
