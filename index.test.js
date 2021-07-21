const utils = require('./index')

function callNTimes(func, n, ...args) {
  let result;
  for (let i = 0; i < n; i++) {
    result = func(...args);
  }
  return result;
}

describe('test helper function: callNTimes', () => {
  let func;
  beforeEach(() => {
    let calls = 0;
    func = () => ++calls;
  })
  test('function is called n times', () => {
    const expected = 5;
    const actual = callNTimes(func, 5);
    expect(actual).toBe(expected);
  })
})

describe('[Exercise 1] trimProperties', () => {
  test('[1] returns an object with the properties trimmed', () => {
    // EXAMPLE
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimProperties(input)
    expect(actual).toEqual(expected)
  })
  test('[2] returns a copy, leaving the original object intact', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' };
    const originalCopy = { ...input };
    utils.trimProperties(input);
    expect(input).toEqual(originalCopy);
  })
})

describe('[Exercise 2] trimPropertiesMutation', () => {
  test('[3] returns an object with the properties trimmed', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' };
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' };
    const actual = utils.trimPropertiesMutation(input);
    expect(actual).toEqual(expected);
  })
  test('[4] the object returned is the exact same one we passed in', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' };
    const actual = utils.trimPropertiesMutation(input);
    expect(actual).toBe(input);
  })
})

describe('[Exercise 3] findLargestInteger', () => {
  test('[5] returns the largest number in an array of objects { integer: 2 }', () => {
    const input = [
      { integer: 5 },
      { integer: 58 },
      { integer: 20 },
      { integer: 9 },
      { integer: -5 },
      { integer: 200 },
      { integer: 10 }
    ]
    const expected = 200;
    const actual = utils.findLargestInteger(input);
    expect(actual).toBe(expected);
  })
})

describe('[Exercise 4] Counter', () => {
  let counter;
  beforeEach(() => {
    counter = new utils.Counter(3) // each test must start with a fresh couter
  })
  test('[6] the FIRST CALL of counter.countDown returns the initial count', () => {
    const expected = 3;
    const actual = counter.countDown();
    expect(actual).toBe(expected);
  })
  test('[7] the SECOND CALL of counter.countDown returns the initial count minus one', () => {
    const expected = 2;
    counter.countDown();
    const actual = counter.countDown();
    expect(actual).toBe(expected);
  })
  test('[8] the count eventually reaches zero but does not go below zero', () => {
    const expected = 0;
    counter.countDown();
    counter.countDown();
    counter.countDown();
    counter.countDown();
    counter.countDown();
    const actual = counter.countDown();
    expect(actual).toBe(expected);
  })
})

describe('[Exercise 5] Seasons', () => {
  let seasons;

  beforeEach(() => {
    seasons = new utils.Seasons(); // each test must start with fresh seasons
  })
  test('[9] the FIRST call of seasons.next returns "summer"', () => {
    const expected = "summer";
    const actual = callNTimes(seasons.next.bind(seasons), 1);
    expect(actual).toBe(expected);
  })
  test('[10] the SECOND call of seasons.next returns "fall"', () => {
    const expected = "fall";
    const actual = callNTimes(seasons.next.bind(seasons), 2);
    expect(actual).toBe(expected);
  })
  test('[11] the THIRD call of seasons.next returns "winter"', () => {
    const expected = "winter";
    const actual = callNTimes(seasons.next.bind(seasons), 3);
    expect(actual).toBe(expected);
  })
  test('[12] the FOURTH call of seasons.next returns "spring"', () => {
    const expected = "spring";
    const actual = callNTimes(seasons.next.bind(seasons), 4);
    expect(actual).toBe(expected);
  })
  test('[13] the FIFTH call of seasons.next returns again "summer"', () => {
    const expected = "summer";
    const actual = callNTimes(seasons.next.bind(seasons), 5);
    expect(actual).toBe(expected);
  })
  test('[14] the 40th call of seasons.next returns "spring"', () => {
    const expected = "spring";
    const actual = callNTimes(seasons.next.bind(seasons), 40);
    expect(actual).toBe(expected);
  })
})

describe('[Exercise 6] Car', () => {
  let focus
  beforeEach(() => {
    focus = new utils.Car('focus', 20, 30) // each test must start with a fresh car
  })
  test('[15] driving the car returns the updated odometer', () => {
    const expected = 15;
    const actual = focus.drive(15);
    expect(actual).toBe(expected);
  })
  test('[16] driving the car uses gas', () => {
    const expected = 19;
    focus.drive(30);
    const actual = focus.tank;
    expect(actual).toBe(expected);
  })
  test('[17] refueling allows to keep driving', () => {
    const driven = focus.drive(100000);
    expect(driven).toBe(600);
    expect(focus.tank).toBe(0);

    focus.refuel(100);
    expect(focus.tank).toBe(20);

    const actual = focus.drive(50);
    expect(actual).toBe(650);
  })
  test('[18] adding fuel to a full tank has no effect', () => {
    const expected = focus.tank;
    focus.refuel(100);
    const actual = focus.tank;
    expect(actual).toBe(expected);
  })
})

describe('[Exercise 7] isEvenNumberAsync', () => {
  test('[19] resolves true if passed an even number', async () => {
    const actual = await utils.isEvenNumberAsync(42);
    expect(actual).toBe(true);
   })
  test('[20] resolves false if passed an odd number', async () => {
    const actual = await utils.isEvenNumberAsync(999);
    expect(actual).toBe(false);
  })
})
