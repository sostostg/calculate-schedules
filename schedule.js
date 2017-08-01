function calculateTime(arr, duration) {
    //40 15-min time slots in day
    let test = new Array(40).fill(0);

    for (let i = 0; i < arr.length; i++) {
        for (let value of arr[i]) {

            let start = value[0].split(':');
            let end = value[1].split(':');

            let rangeStart = ((start[0] - 9) * 4) + (start[1] / 15);
            let rangeEnd = ((end[0] - 9) * 4) + (end[1] / 15);

            for (let i = rangeStart; i < rangeEnd; i++) {
                test[i]++;
            }
        }
    }

    let length = duration / 15;
    let start = -1;
    let end = -1;
    let count = 0;

    test.forEach(function (value, index) {
        if (value === 0 && count !== length) {
            if (start === -1)
                start = index;

            count++;

            if (count === length)
                end = index;
        }
        else if (value !== 0 && count !== length) {
            start = -1;
            count = 0;
        }
    });

    if (end - start !== length - 1)
        return null;

    if (count !== length)
        return null;
    else
        return `${((start - (start % 4)) / 4) + 9}:${((start % 4) * 15)}`;

}

module.exports = calculateTime;
