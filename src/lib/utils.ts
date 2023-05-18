
export const getRandomId = (): string => {
    // should use a library like uuid instead but this will suffice for now
    if (self.crypto) {
        return crypto.randomUUID();
    }
    else {
        return Math.floor(Math.random() * 10000000).toString();
    }

};