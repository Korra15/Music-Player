export default {
  // using the object syntx instead of using the modifiers and arguments
  beforeMount(el, binding) {
    // runs before the ele is inserted into the doc
    // here = to add the icon

    // binding obj = hold the value that gets passed into the directive

    let iconClass = `fa fa-${binding.value.icon} text-2xl`;

    if (binding.value.right) {
      // modifiers are stored in the binding object under the modifiers property
      // modifiers are bool values - we're not able to assign values to them
      iconClass += '  float-right';
    }

    if (binding.value.black) {
      iconClass += '  text-black-400';
    } else {
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;
  },
};
