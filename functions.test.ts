const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    test('Shuffler returns an array', () => {
        expect(typeof(shuffleArray([1,2,3,4]))).toBe('array');
    })
    
    test('Shuffler returns same length array as ', () => {
        expect(shuffleArray([1,2,3,4]).length).toBe(4);
    })
})