export function addMacroTask(cb) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cb();
            resolve();
          }, 0);
    });
}