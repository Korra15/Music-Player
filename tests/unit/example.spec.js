// runs indendently from our applicatio
// jest defines global functions for us

// not inporting - running our code through jest
// test() alias = it()
test('sanity test', () => {
  expect(true).toBe(true);
  // global function - expect - returns an obj with funtions called jest matchers
  // returns obj with methods we can use to perform a test on the value passed in
  // toBe matcher can be used to compare primitive values
});
// 2 args -
// the string that helps us identify the test and the report
// funtion that runs when we test our application
