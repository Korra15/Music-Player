import About from '@/views/About.vue';
import { shallowMount } from '@vue/test-utils';
// 1st = convert components options object into a constructor function
// 2nd = then create an instance out of the constructor function

// describe funtion allows us to group one or more tests together
// test suite
// 2 args - str describing the test suite
// 2nd arg = callback funtion containig the tests

describe('About.vue', () => {
  test('renders inner text', () => {
    // document is empty from jest point of view
    // as music application has not been initialized

    // thus we need to mount the component
    // vue test utilities lib = provides a method to convert a component
    // to an instance that can be mounted
    // const wrapper = mount(About, {
    //   shallow: true,
    // });

    const wrapper = shallowMount(About);

    // mouht fun - returns a wrapper - that represents a component
    // this object contains methods and properties for interacting with the component

    // component assertions - tests - (we expect the test to contain the str about)
    // text method returns the inner text of a component
    expect(wrapper.text()).toContain('about');
  });
});

// shallowMount limits the components to one level
