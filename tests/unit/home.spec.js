import Home from '@/views/Home.vue';
import { shallowMount } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

jest.mock('@/includes/firebase', () => {});
// 2args -
// path to the dependency
// funtion that returns an object

describe('Home.vue', () => {
  test('renders list of songs', () => {
    const songs = [
      {}, {}, {},
    ];

    Home.methods.getSongs = () => false;
    // here changing the getSongs function to a function that returns false
    // overriting it

    const component = shallowMount(Home, {
      // change data in a component by adding the data function to the options object
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          // mocks object allows us to define global variables and fucntion
          $t: (message) => message,
        },
      },
    });

    const items = component.findAllComponents(SongItem);
    // returns an array

    // test assertion
    expect(items).toHaveLength(songs.length);

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]);
      // props function return the components props
      // props function = able to retrieve data in a child component
    });
  });
});
