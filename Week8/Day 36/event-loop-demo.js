console.log('1: Start');

setTimeout(() => {
    console.log('2: Inside setTimeout (0ms)');
}, 0);

require('fs').readFile(__filename, () => {
    console.log('3: Inside readFile callback');
});

console.log('4: End');