/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __extends, __assign, __param, __metadata } from 'tslib';
import { Inject, Injectable, InjectionToken, Optional, NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import * as MessageFormat from 'messageformat';
import * as _rollupMoment from 'moment';
import _rollupMoment__default, {  } from 'moment';

var enUS = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'MMMM\u00A0D',
        SHORT_DATE: 'MMM\u00A0D',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2013\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ],
        short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
    },
    dayOfWeekNames: {
        long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}s ago',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}min ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}second} other{#{NBSP}seconds}} ago',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}minute} other{#{NBSP}minutes}} ago',
            TODAY: '{TIME}',
            YESTERDAY: 'Yesterday, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
            END_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}}\n                                        other{{SHORT_DATE}, {YEAR}}\n                                }}\n                        }",
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {SHORT_DATE}}\n                                        other{{TIME}, {SHORT_DATE}, {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        middle: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE}, {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {DATE}}\n                                        other{{TIME}, {DATE}, {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        long: {
            START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            END_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE}, {YEAR}}\n                                }}\n                        }",
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, from{NBSP}{TIME}}\n                                        other{{DATE}, {YEAR}, from{NBSP}{TIME}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{to{NBSP}{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE}, {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME} {END_DATETIME}}\n                                other{From {START_DATETIME} to{NBSP}{END_DATETIME}}\n                        }"
        }
    }
};

var ruRU = {
    variables: {
        SECONDS: 's',
        MINUTES: 'm',
        TIME: 'HH:mm',
        DAY: 'D',
        MONTH: 'MMM',
        YEAR: 'YYYY',
        DATE: 'D\u00A0MMMM',
        SHORT_DATE: 'D\u00A0MMM',
        DASH: '\u2013',
        LONG_DASH: '\u202F\u2014\u2009',
        NBSP: '\u00A0'
    },
    monthNames: {
        long: [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ],
        short: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'],
        narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']
    },
    dayOfWeekNames: {
        long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
    },
    relativeTemplates: {
        short: {
            SECONDS_AGO: '{SECONDS_PASSED}{NBSP}с назад',
            MINUTES_AGO: '{MINUTES_PASSED}{NBSP}мин назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
        },
        long: {
            // tslint:disable-next-line:max-line-length
            SECONDS_AGO: '{SECONDS_PASSED, plural, =1{#{NBSP}секунду} =2{#{NBSP}секунды} other{#{NBSP}секунд}} назад',
            MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}минуту} =2{#{NBSP}минуты} other{#{NBSP}минут}} назад',
            TODAY: '{TIME}',
            YESTERDAY: 'Вчера, {TIME}',
            BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
        }
    },
    absoluteTemplates: {
        short: {
            DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}, {TIME}}}'
        },
        long: {
            DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATETIME: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}, {TIME}}}'
        }
    },
    rangeTemplates: {
        short: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}}\n                                        other{{SHORT_DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {SHORT_DATE}}\n                                        other{{TIME}, {SHORT_DATE} {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{SHORT_DATE}, {TIME}}\n                                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        middle: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{TIME}, {DATE}}\n                                        other{{TIME}, {DATE} {YEAR}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                        }"
        },
        long: {
            START_DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{DAY}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}}\n                                        other{{DATE} {YEAR}}\n                                }}\n                        }",
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: "{\n                            SAME_MONTH,\n                            select,\n                                yes{{START_DATE}{DASH}{END_DATE}}\n                                other{{START_DATE}{LONG_DASH}{END_DATE}}\n                        }",
            START_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, \u0441{NBSP}{TIME}}\n                                        other{{DATE} {YEAR}, \u0441{NBSP}{TIME}}\n                                }}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            END_DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{\u043F\u043E{NBSP}{TIME}}\n                                other{{\n                                    CURRENT_YEAR,\n                                    select,\n                                        yes{{DATE}, {TIME}}\n                                        other{{DATE} {YEAR}, {TIME}}\n                                }}\n                        }",
            DATETIME: "{\n                            SAME_DAY,\n                            select,\n                                yes{{START_DATETIME} {END_DATETIME}}\n                                other{\u0421{NBSP}{START_DATETIME} \u043F\u043E{NBSP}{END_DATETIME}}\n                        }"
        }
    }
};

var moment = _rollupMoment__default || _rollupMoment;
/** InjectionToken for moment date adapter to configure options. */
var MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable:naming-convention
function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false
    };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var MomentDateAdapter = /** @class */ (function (_super) {
    __extends(MomentDateAdapter, _super);
    function MomentDateAdapter(dateLocale, options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.invalidDateErrorText = 'Invalid date';
        _this.setLocale(dateLocale || moment.locale());
        _this.configureTranslator(_this.locale);
        return _this;
    }
    Object.defineProperty(MomentDateAdapter.prototype, "momentWithLocale", {
        get: function () {
            return moment().locale(this.locale);
        },
        enumerable: true,
        configurable: true
    });
    MomentDateAdapter.prototype.setLocale = function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        var momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        var i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            this.formatterConfig = locale === 'en' ? enUS : ruRU;
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.formatterConfig.monthNames.short,
                    standalone: this.formatterConfig.monthNames.short
                },
                weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                weekdays: this.formatterConfig.dayOfWeekNames.long
            });
        }
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, function (i) { return _this.createDate(2017, 0, i + 1).format('D'); }),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    MomentDateAdapter.prototype.getYear = function (date) {
        return this.clone(date).year();
    };
    MomentDateAdapter.prototype.getMonth = function (date) {
        return this.clone(date).month();
    };
    MomentDateAdapter.prototype.getDate = function (date) {
        return this.clone(date).date();
    };
    MomentDateAdapter.prototype.getDayOfWeek = function (date) {
        return this.clone(date).day();
    };
    MomentDateAdapter.prototype.getMonthNames = function (style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    };
    MomentDateAdapter.prototype.getDateNames = function () {
        return this.localeData.dates;
    };
    MomentDateAdapter.prototype.getDayOfWeekNames = function (style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    };
    MomentDateAdapter.prototype.getYearName = function (date) {
        return this.clone(date).format('YYYY');
    };
    MomentDateAdapter.prototype.getFirstDayOfWeek = function () {
        return this.localeData.firstDayOfWeek;
    };
    MomentDateAdapter.prototype.getNumDaysInMonth = function (date) {
        return this.clone(date).daysInMonth();
    };
    MomentDateAdapter.prototype.clone = function (date) {
        return date.clone().locale(this.locale);
    };
    MomentDateAdapter.prototype.createDate = function (year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        var result = this.createMoment({ year: year, month: month, date: date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    MomentDateAdapter.prototype.today = function () {
        return this.createMoment().locale(this.locale);
    };
    MomentDateAdapter.prototype.parse = function (value, parseFormat) {
        // tslint:disable:triple-equals
        if (value && typeof value == 'string') {
            return this.createMoment(value, parseFormat, this.locale);
        }
        return value ? this.createMoment(value).locale(this.locale) : null;
    };
    MomentDateAdapter.prototype.format = function (date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    MomentDateAdapter.prototype.addCalendarYears = function (date, years) {
        return this.clone(date).add({ years: years });
    };
    MomentDateAdapter.prototype.addCalendarMonths = function (date, months) {
        return this.clone(date).add({ months: months });
    };
    MomentDateAdapter.prototype.addCalendarDays = function (date, days) {
        return this.clone(date).add({ days: days });
    };
    MomentDateAdapter.prototype.toIso8601 = function (date) {
        return this.clone(date).format();
    };
    /** https://www.ietf.org/rfc/rfc3339.txt */
    MomentDateAdapter.prototype.deserialize = function (value) {
        var date;
        if (value instanceof Date) {
            date = this.createMoment(value).locale(this.locale);
        }
        else if (this.isDateInstance(value)) {
            // Note: assumes that cloning also sets the correct locale.
            return this.clone(value);
        }
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }
            date = this.createMoment(value, moment.ISO_8601).locale(this.locale);
        }
        if (date && this.isValid(date)) {
            return this.createMoment(date).locale(this.locale);
        }
        return _super.prototype.deserialize.call(this, value);
    };
    MomentDateAdapter.prototype.isDateInstance = function (obj) {
        return moment.isMoment(obj);
    };
    MomentDateAdapter.prototype.isValid = function (date) {
        return this.clone(date).isValid();
    };
    MomentDateAdapter.prototype.invalid = function () {
        return moment.invalid();
    };
    MomentDateAdapter.prototype.relativeDate = function (date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        var now = this.momentWithLocale;
        var totalSeconds = now.diff(date, 'seconds');
        var totalMinutes = now.diff(date, 'minutes');
        var isToday = now.isSame(date, 'day');
        var isYesterday = now.add(-1, 'days').isSame(date, 'day');
        var templateVariables = __assign({}, this.formatterConfig.variables, template.variables);
        var variables = this.compileVariables(date, templateVariables);
        var newTemplate;
        if (totalSeconds <= 59) { // seconds ago
            variables.SECONDS_PASSED = totalSeconds;
            newTemplate = template.SECONDS_AGO;
        }
        else if (totalMinutes <= 59) { // minutes ago
            variables.MINUTES_PASSED = totalMinutes;
            newTemplate = template.MINUTES_AGO;
        }
        else if (isToday) { // today
            newTemplate = template.TODAY;
        }
        else if (isYesterday) { // yesterday
            newTemplate = template.YESTERDAY;
        }
        else { // before yesterday
            newTemplate = template.BEFORE_YESTERDAY;
        }
        return this.messageformat.compile(newTemplate)(variables);
    };
    MomentDateAdapter.prototype.relativeShortDate = function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    };
    MomentDateAdapter.prototype.relativeLongDate = function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    };
    MomentDateAdapter.prototype.absoluteDate = function (date, params, datetime) {
        if (datetime === void 0) { datetime = false; }
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        var variables = __assign({}, this.formatterConfig.variables, params.variables);
        var template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    };
    MomentDateAdapter.prototype.absoluteShortDate = function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    };
    MomentDateAdapter.prototype.absoluteShortDateTime = function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
    };
    MomentDateAdapter.prototype.absoluteLongDate = function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    };
    MomentDateAdapter.prototype.absoluteLongDateTime = function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
    };
    MomentDateAdapter.prototype.rangeDate = function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        var variables = __assign({}, this.formatterConfig.variables, template.variables);
        var sameMonth = this.isSame('month', startDate, endDate);
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        var params = __assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    };
    MomentDateAdapter.prototype.rangeDateTime = function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        var variables = __assign({}, this.formatterConfig.variables, template.variables);
        var sameMonth = this.isSame('month', startDate, endDate);
        var sameDay = this.isSame('day', startDate, endDate);
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        var params = __assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    };
    MomentDateAdapter.prototype.rangeShortDate = function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    };
    MomentDateAdapter.prototype.rangeShortDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    };
    MomentDateAdapter.prototype.rangeLongDate = function (startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    };
    MomentDateAdapter.prototype.rangeLongDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    };
    MomentDateAdapter.prototype.rangeMiddleDateTime = function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.middle);
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    MomentDateAdapter.prototype.createMoment = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (this.options && this.options.useUtc) ? moment.utc.apply(moment, args) : moment.apply(void 0, args);
    };
    MomentDateAdapter.prototype.compileVariables = function (date, variables) {
        var compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            var value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    };
    MomentDateAdapter.prototype.isCurrentYear = function (value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    };
    MomentDateAdapter.prototype.isSame = function (unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    };
    MomentDateAdapter.prototype.configureTranslator = function (locale) {
        this.messageformat = new MessageFormat(locale);
    };
    MomentDateAdapter = __decorate([
        Injectable(),
        __param(0, Optional()), __param(0, Inject(MC_DATE_LOCALE)),
        __param(1, Optional()), __param(1, Inject(MC_MOMENT_DATE_ADAPTER_OPTIONS)),
        __metadata("design:paramtypes", [String, Object])
    ], MomentDateAdapter);
    return MomentDateAdapter;
}(DateAdapter));

var MC_MOMENT_DATE_FORMATS = {
    parse: {
        dateInput: 'L'
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

var MomentDateModule = /** @class */ (function () {
    function MomentDateModule() {
    }
    MomentDateModule = __decorate([
        NgModule({
            providers: [
                {
                    provide: DateAdapter,
                    useClass: MomentDateAdapter,
                    deps: [MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                }
            ]
        })
    ], MomentDateModule);
    return MomentDateModule;
}());
var ɵ0 = MC_MOMENT_DATE_FORMATS;
var McMomentDateModule = /** @class */ (function () {
    function McMomentDateModule() {
    }
    McMomentDateModule = __decorate([
        NgModule({
            imports: [MomentDateModule],
            providers: [{
                    provide: MC_DATE_FORMATS, useValue: ɵ0
                }]
        })
    ], McMomentDateModule);
    return McMomentDateModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { MomentDateModule, McMomentDateModule, ɵ0, MC_MOMENT_DATE_ADAPTER_OPTIONS, MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MomentDateAdapter, MC_MOMENT_DATE_FORMATS };
//# sourceMappingURL=mosaic-moment-adapter.es5.js.map
