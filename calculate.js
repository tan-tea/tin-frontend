
const args = process.argv.slice(2);

function calcuteServiceFee(km) {
    const subtotal = 6500 + (km * 1600) + 10000;
    const total = (subtotal * 0.10) + subtotal;
    return total
}

const result = calcuteServiceFee(...args);
const formated = Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
}).format(result);

console.log(`Total service fee: ${formated}`);

