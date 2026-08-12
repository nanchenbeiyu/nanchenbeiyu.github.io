/* ============================================================
   扉页 · 邀请仪式
   1. 画像从夜色中浮现，由大变小
   2. 「你好，我是 nilo，欢迎来到我的个人网页」一笔一划写出
   3. 三扇门依次亮起
   点击任意处可跳过仪式
   ============================================================ */
(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        var line1 = document.getElementById("line1");
        var line2 = document.getElementById("line2");
        var gate = document.getElementById("gate");
        var hint = document.getElementById("hint");
        if (!line1 || !line2 || !gate) return;

        var done = false;
        var timer = null;

        function openGate() {
            if (done) return;
            done = true;
            gate.classList.add("open");
            if (hint) hint.classList.add("show");
        }

        if (window.fairytale && window.fairytale.reducedMotion) {
            document.body.classList.add("instant");
            openGate();
            return;
        }

        /* 画像落定（约 2.65s）之后，笔尖落纸 */
        var t1 = window.fairytale.drawText(line1, "你好，我是 nilo，", {
            baseDelay: 2.75,
            charGap: 0.3,
            drawDur: 1.05,
            fontSize: "clamp(30px, 5.8vw, 64px)"
        });

        /* 第二行稍稍抢拍，像连笔 */
        var t2 = window.fairytale.drawText(line2, "欢迎来到我的个人网页", {
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
    });
})();
