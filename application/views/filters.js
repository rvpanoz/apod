/*global define */

define([
    'marionette',
    'templates',
    'underscore',
    'moment',
    'models/Picture',
    'bootstrapDTpicker'
], function (Marionette, templates, _, moment, Picture) {
    'use strict';
    return Marionette.ItemView.extend({
        template: templates.pages.filtersTpl,
        ui: {
            cdate: '#apod-date',
            topdate: '.top-date'
        },
        events: {
            'click #apod-get': 'getPicture',
            'click a.btn-next': 'onNextDay',
            'click a.btn-prev': 'onPrevDay'
        },
        initialize: function () {
            _.bindAll(this, 'onSuccess');
            this.picture = new Picture();
            this.picture.fetch({
                data: {
                    api_key: app.api_key,
                    date: moment(new Date()).format('YYYY-MM-DD')
                },
                success: this.onSuccess
            });
        },
        onNextDay: function (evt) {
            evt.preventDefault();
            var currentDate = this.ui.cdate.val();
            var _date = moment(currentDate).add(1, 'day').format('YYYY-MM-DD');
            this.ui.cdate.val(_date);
            this.ui.topdate.text(moment(currentDate).add(1, 'day').format('dddd MMMM YYYY'));

            this.picture.fetch({
                data: {
                    api_key: app.api_key,
                    date: _date
                },
                success: this.onSuccess
            });

        },
        onPrevDay: function (evt) {
            evt.preventDefault();
            var currentDate = this.ui.cdate.val();
            var _date = moment(currentDate).add(-1, 'day').format('YYYY-MM-DD');
            this.ui.cdate.val(_date);
            this.ui.topdate.text(moment(currentDate).add(-1, 'day').format('dddd MMMM YYYY'));
            
            this.picture.fetch({
                data: {
                    api_key: app.api_key,
                    date: _date
                },
                success: this.onSuccess
            });
        },
        getPicture: function (evt) {
            evt.preventDefault();
            var _date = this.ui.cdate.val();
            if (!_date || _date == '') {
                _date = moment(new Date()).format('YYYY-MM-DD')
                this.ui.cdate.val(_date);
            }
            this.picture.fetch({
                data: {
                    api_key: app.api_key,
                    date: moment(new Date(_date)).format('YYYY-MM-DD')
                },
                success: this.onSuccess
            });
        },
        onSuccess: function (model) {
            this.triggerMethod('picture:fetched', model);
            return false;
        },
        onRender: function () {
            this.ui.cdate.datetimepicker({
                format: 'YYYY-MM-DD',
                defaultDate: moment(new Date()).format('YYYY-MM-DD')
            });
        },
        onShow: function () {
            this.ui.cdate.val(moment(new Date()).format('YYYY-MM-DD'));
        }
    });
});
