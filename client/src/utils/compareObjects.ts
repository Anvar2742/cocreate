export default function compareObjects(
    objA: any,
    objB: any,
    fields: any = null
): boolean {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (!fields) {
        if (keysA.length !== keysB.length) {
            return false;
        }

        for (const key of keysA) {
            if (!objB.hasOwnProperty(key)) {
                return false;
            }

            if (
                typeof objA[key] === "string" &&
                typeof objA[key] === "string"
            ) {
                if (objA[key].trim() !== objB[key].trim()) {
                    return false;
                }
            } else {
                if (objA[key] !== objB[key]) {
                    return false;
                }
            }
        }
    }

    for (const key of fields) {
        if (!objB.hasOwnProperty(key)) {
            return false;
        }

        if (typeof objA[key] === "string" && typeof objA[key] === "string") {
            if (objA[key].trim() !== objB[key].trim()) {
                return false;
            }
        } else {
            if (objA[key] !== objB[key]) {
                return false;
            }
        }
    }

    return true;
}
