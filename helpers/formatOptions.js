'use strict'

module.exports = (options) => {

  let optionsArray = options.split(";");
  let formattedOptions = [];

  optionsArray.forEach(function(option) {
    formattedOptions.push({type: "option", option: option.trim(), count: option.count || 0});
  });

  return formattedOptions

}
