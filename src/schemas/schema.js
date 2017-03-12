const config = require('../config');
const Backbone = require('backbone');

var Picture = Backbone.Model.extend({
  urlRoot: function() {
    return config.baseUrl + "?api_key=" + config.apiKey;
  }
});

var Pictures = Backbone.Model.extend({
  url: function() {
    return config.baseUrl + "?api_key=" + config.apiKey;
  }
});

module.exports = {
  Picture: Picture,
  Pictures: Pictures
};
