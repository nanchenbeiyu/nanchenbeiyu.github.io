/* ============================================================
   装饰层：月亮 / 藤蔓 / 山脚剪影 / 胶片颗粒
   所有页面共用，由 JS 统一注入，HTML 不再重复书写
   ============================================================ */

const VINE_SVG = `
    <path d="M6 8 C 50 18, 38 66, 84 78 C 122 88, 118 128, 158 140 C 184 148, 196 168, 208 196"/>
    <ellipse class="leaf" cx="44" cy="30" rx="7" ry="3.2" transform="rotate(28 44 30)"/>
    <ellipse class="leaf" cx="66" cy="66" rx="7" ry="3.2" transform="rotate(62 66 66)"/>
    <ellipse class="leaf" cx="106" cy="92" rx="7" ry="3.2" transform="rotate(18 106 92)"/>
    <ellipse class="leaf" cx="140" cy="126" rx="7" ry="3.2" transform="rotate(48 140 126)"/>
    <ellipse class="leaf" cx="182" cy="162" rx="7" ry="3.2" transform="rotate(38 182 162)"/>
    <circle cx="84" cy="78" r="2"/>
    <circle cx="158" cy="140" r="2"/>
`;

const PINE = `
    <path d="M0 0 L14 -26 L28 0 Z"/>
    <path d="M3 -16 L14 -40 L25 -16 Z"/>
    <path d="M7 -32 L14 -52 L21 -32 Z"/>
    <path d="M12 0 L12 8 L16 8 L16 0 Z"/>
`;

const HILLS_SVG = `
    <g fill="#101015" stroke="rgba(245,242,234,0.22)" stroke-width="1.5">
        <ellipse cx="260" cy="300" rx="380" ry="150"/>
        <ellipse cx="900" cy="335" rx="490" ry="165"/>
        <ellipse cx="1380" cy="285" rx="360" ry="135"/>
    </g>
    <g fill="#0c0c0e" stroke="rgba(245,242,234,0.4)" stroke-width="1.2" stroke-linejoin="round">
        <g transform="translate(196,151)">${PINE}</g>
        <g transform="translate(258,150) scale(0.72)">${PINE}</g>
        <g transform="translate(320,153) scale(0.5)">${PINE}</g>
    </g>
    <g transform="translate(1332,150)" fill="#0c0c0e" stroke="rgba(245,242,234,0.55)" stroke-width="1.2" stroke-linejoin="round">
        <ellipse cx="0" cy="-14" rx="10" ry="14"/>
        <circle cx="0" cy="-32" r="8"/>
        <path d="M-6 -37 L-9 -46 L-1 -40 Z"/>
        <path d="M6 -37 L9 -46 L1 -40 Z"/>
        <path d="M9 -6 Q 21 -8 18 -24" fill="none" stroke-linecap="round"/>
    </g>
`;

/** 把装饰元素插到 <body> 最前面（fixed 定位，不挤占布局） */
export function mountDecor() {
    const frag = document.createDocumentFragment();

    const sky = document.createElement("div");
    sky.className = "sky";
    sky.setAttribute("aria-hidden", "true");
    frag.appendChild(sky);

    const moon = document.createElement("div");
    moon.className = "moon";
    moon.setAttribute("aria-hidden", "true");
    frag.appendChild(moon);

    for (const cls of ["vine-tl", "vine-br"]) {
        const vine = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        vine.setAttribute("class", `vine ${cls}`);
        vine.setAttribute("viewBox", "0 0 220 220");
        vine.setAttribute("aria-hidden", "true");
        vine.innerHTML = VINE_SVG;
        frag.appendChild(vine);
    }

    const hills = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    hills.setAttribute("class", "hills");
    hills.setAttribute("viewBox", "0 0 1440 220");
    hills.setAttribute("preserveAspectRatio", "xMidYMax slice");
    hills.setAttribute("aria-hidden", "true");
    hills.innerHTML = HILLS_SVG;
    frag.appendChild(hills);

    const grain = document.createElement("div");
    grain.className = "grain";
    grain.setAttribute("aria-hidden", "true");
    frag.appendChild(grain);

    document.body.prepend(frag);
}
