export const CircularReferenceReplacer = () => {
    const cache = new Map();

    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            let currentCount = cache.get(value);
            if (currentCount > 1) {
                return;
            } else if (currentCount) {
                cache.set(value, 2);
            } else {
                cache.set(value, 1);
            }
        }
        return value;
    };
};
