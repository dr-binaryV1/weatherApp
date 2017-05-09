'use strict';
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 4)];
rule.hour = 23;
rule.minute = 15;

module.exports = schedule;
module.exports.rule = rule;