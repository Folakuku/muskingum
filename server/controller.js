const {
    calculateMuskingumCoefficients,
    calculateK,
    calculateStorage,
    calculateOutflow,
} = require("./helpers");

function performCalculations(time, inflow, outflow, x) {
    const deltaTime = time[1] - time[0];
    const { storage, weightedFlux } = calculateStorage(
        inflow,
        outflow,
        x,
        deltaTime
    );
    // console.log(`Storage: ${storage}`);
    // console.log(`weightedFlux: ${weightedFlux}`);

    let { k } = calculateK(storage, weightedFlux);
    k = 59.873;

    const { C0, C1, C2 } = calculateMuskingumCoefficients(k, x, deltaTime);

    const { outflows, C0I2, C1I1, C2O1 } = calculateOutflow(inflow, C0, C1, C2);
    return {
        storage,
        weightedFlux,
        outflows,
        C0I2,
        C1I1,
        C2O1,
    };
}

module.exports = { performCalculations };
