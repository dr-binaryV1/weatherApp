'use strict';
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(0, 4)];
rule.hour = 17;
rule.minute = 0;

module.exports = schedule;
module.exports.rule = rule;