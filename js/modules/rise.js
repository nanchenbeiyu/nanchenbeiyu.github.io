/* ============================================================
   进场浮现：.rise 元素滚入视野时添加 .in
   ============================================================ */

import { reducedMotion } from "./utils.js";

export function initRise() {
    const items = document.querySelectorAll(".rise");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reducedMotion) {
        items.forEach(el => el.classList.add("in"));
        return;
    }

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));
}
