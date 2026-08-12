/* ============================================================
   共享入口：所有页面加载
   装饰层 → 星空 → 进场浮现 → 标题书写
   （ES module 自带 defer，执行时 DOM 已就绪）
   ============================================================ */

import { mountDecor } from "./modules/decor.js";
import { buildSky } from "./modules/sky.js";
import { initRise } from "./modules/rise.js";
import { initDrawnTitles } from "./modules/drawText.js";

mountDecor();
buildSky();
initRise();
initDrawnTitles();
