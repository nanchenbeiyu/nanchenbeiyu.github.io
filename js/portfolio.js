/* ============================================================
   作品集页（仅 portfolio.html 加载）
   墨水条滚动到视野内时灌注
   ============================================================ */

const fills = document.querySelectorAll(".ink-fill");

if (!("IntersectionObserver" in window)) {
    fills.forEach(f => { f.style.width = f.getAttribute("data-w"); });
} else {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute("data-w");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    fills.forEach(f => io.observe(f));
}
