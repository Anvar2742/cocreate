"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slugify = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
exports.default = slugify;
//# sourceMappingURL=slugify.js.map