const Backbone = require('backbone');
const moment = require('moment');
const config = require('../config');

var date = moment(new Date()).format('DD/MM/YYYY');

var Picture = Backbone.Model.extend({

});

var Pictures = Backbone.Collection.extend({
  model: Picture,
  url: function () {
    return config.api.url;
  },
  parse(response) {
    return response.data;
  }
});

module.exports = {
  Pictures: Pictures
}
