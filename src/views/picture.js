const _ = require('lodash');
const Marionette = require('backbone.marionette');
const template = require('../templates/picture.hbs');
const config = require('../config');

const moment = require('moment');

var PictureView = Marionette.View.extend({
  template: template,
  initialize() {
    console.log(this.model);
  },
  onAttach() {
    this.$('#apod-modal').modal('show');
  },
  serializeData() {
    var model = this.model;
    return _.extend(model.toJSON());
  }
});

module.exports = PictureView;
