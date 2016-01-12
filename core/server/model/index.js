
"use strict";

var _ = require('lodash');
var config = require('config');
var Waterline = require('waterline');
var Base = require('./base');

var model = {
    waterline: new Waterline(),
    load: function (){
        _.forEach(['user', 'token', 'setting', 'post', 'media'], (model) => {
            model = _.merge({}, Base, require('./' + model));
            this.waterline.loadCollection(Waterline.Collection.extend(model));
        });
    },
    init: function (){
        this.load();
        return new Promise((resolve, reject) => {
            this.waterline.initialize(config.get('database'), function (err, ontology){
                if (err) {
                    reject(err);
                }
                else{
                    resolve(ontology.collections);
                }
            });
        });
    }
};


module.exports = model;