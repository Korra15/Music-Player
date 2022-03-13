export default {
  // obj being exported - used for configuring the directive
  // uses argument and modifiers
  beforeMount(el, binding) {
    // runs before the ele is inserted into the doc
    // here = to add the icon

    // binding obj = hold the value that gets passed into the directive

    let iconClass = `fa fa-${binding.value} text-2xl`;

    if (binding.arg === 'full') {
      // the arg property will hold the argument value if one is passed in with the directive
      iconClass = binding.value;
    }

    if (binding.modifiers.right) {
      // modifiers are stored in the binding object under the modifiers property
      // modifiers are bool values - we're not able to assign values to them
      iconClass += '  float-right';
    }

    if (binding.modifiers.yellow) {
      iconClass += '  text-yellow-400';
    } else {
      iconClass += ' text-green-400';
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass}"></i>`;

    // class part of the icon should be dynamic - as
    // the value of the class attribute determines which icon will get outputted
  },
};
