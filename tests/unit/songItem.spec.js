import SongItem from '@/components/SongItem.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
// RouterLinkStub object = a fake component that mimics the behaviour of the router-link component

describe('SongItem.vue', () => {
  test('render song.displayName', () => {
    const song = {
      displayName: 'test',
    };

    const wrapper = shallowMount(SongItem, {
      // 2nd optional arg = options object
      // this bj allows us to pass in data to the component
      propsData: {
        // we can add in props for the component
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub, // stubbing - creating a fake component
        },
      },
    });

    const compositionAuthor = wrapper.find('.text-gray-500');

    expect(compositionAuthor.text()).toBe(song.displayName);
    // toBe function - exact match comparision and not a partial one
    // find function = query selector function - returns another wrapper object
    // text function - retrieves the inner text of the element
  });

  test('render song.docID in id attribute', () => {
    // testing attribute only perform when the attribute is dynamic
    // do not test static attribute
    const song = {
      docId: 'abc',
    };

    // recommended for every test to have its own instance of the component
    const wrapper = shallowMount(SongItem, {
      propsData: {
        song,
      },
      global: {
        components: {
          'router-link': RouterLinkStub,
        },
      },
    });

    expect(wrapper.attributes().id).toBe(`song-id-${song.docId}`);
    // attributes function - returnes an object of attributes in the component
    // returnes the attributes values as a string
    // attributes function used will retrieve the attributes on the root ele of the seletion
    // not the attributes that are in the child elements
    // wrapper == represents the component

    // expect(wrapper.classes()).toContain(`song-id-${song.docId}`);
    // classes fun = return array of classes
    // converts the classes into an array
  });
});
// describe function to group the test suite
