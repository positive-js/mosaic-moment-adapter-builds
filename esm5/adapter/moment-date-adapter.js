/**
 * @fileoverview added by tsickle
 * Generated from: moment-date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends, __read, __spread } from "tslib";
// tslint:disable:no-magic-numbers
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import * as MessageFormat from 'messageformat';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable:no-duplicate-imports
// @ts-ignore (look at tsconfig)
import { default as _rollupMoment } from 'moment';
import { enUS } from './locales/en-US';
import { ruRU } from './locales/ru-RU';
/** @type {?} */
var moment = _rollupMoment || _moment;
/**
 * Configurable options for {\@see MomentDateAdapter}.
 * @record
 */
export function IMcMomentDateAdapterOptions() { }
if (false) {
    /**
     * Turns the use of utc dates on or off.
     * {\@default false}
     * @type {?}
     */
    IMcMomentDateAdapterOptions.prototype.useUtc;
    /**
     * whether should parse method try guess date format
     * {\@default false}
     * @type {?}
     */
    IMcMomentDateAdapterOptions.prototype.findDateFormat;
}
/**
 * InjectionToken for moment date adapter to configure options.
 * @type {?}
 */
export var MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/**
 * \@docs-private
 * @return {?}
 */
// tslint:disable:naming-convention
export function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
        findDateFormat: false
    };
}
/**
 * Creates an array and fills it with values.
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
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
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return moment().locale(this.locale);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        /** @type {?} */
        var i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            this.formatterConfig = locale === 'en' ? enUS : ruRU;
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.formatterConfig.monthNames.short.formatted,
                    standalone: this.formatterConfig.monthNames.short.standalone
                },
                weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                weekdays: this.formatterConfig.dayOfWeekNames.long
            });
        }
        this.localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDate(2017, 0, i + 1).format('D'); })),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).year();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).month();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).date();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getHours = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).hours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMinutes = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).minutes();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getSeconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).seconds();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getMilliseconds = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).milliseconds();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.valueOf();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).day();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this.localeData.dates;
    };
    /**
     * @param {?} style
     * @return {?}
     */
    MomentDateAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format('YYYY');
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this.localeData.firstDayOfWeek;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).daysInMonth();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.clone().locale(this.locale);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        /** @type {?} */
        var result = this.createMoment({ year: year, month: month, date: date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @param {?} milliseconds
     * @return {?}
     */
    MomentDateAdapter.prototype.createDateTime = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @param {?} seconds
     * @param {?} milliseconds
     * @return {?}
     */
    function (year, month, date, hours, minutes, seconds, milliseconds) {
        /** @type {?} */
        var newDate = this.createDate(year, month, date);
        newDate.hours(hours);
        newDate.minutes(minutes);
        newDate.seconds(seconds);
        newDate.milliseconds(milliseconds);
        return newDate;
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return this.createMoment().locale(this.locale);
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        if (value) {
            if (value && typeof value === 'string') {
                if (this.options && this.options.findDateFormat) {
                    return this.findFormat(value);
                }
                return parseFormat
                    ? this.createMoment(value, parseFormat, this.locale)
                    : this.createMoment(value).locale(this.locale);
            }
            return this.createMoment(value).locale(this.locale);
        }
        return null;
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    MomentDateAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.clone(date).add({ years: years });
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        return this.clone(date).add({ months: months });
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    MomentDateAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this.clone(date).add({ days: days });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).format();
    };
    /** https://www.ietf.org/rfc/rfc3339.txt */
    /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.deserialize = /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
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
    /**
     * @param {?} obj
     * @return {?}
     */
    MomentDateAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return moment.isMoment(obj);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.clone(date).isValid();
    };
    /**
     * @return {?}
     */
    MomentDateAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return moment.invalid();
    };
    /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeDate = /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    function (date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var now = this.momentWithLocale;
        /** @type {?} */
        var totalSeconds = now.diff(date, 'seconds');
        /** @type {?} */
        var totalMinutes = now.diff(date, 'minutes');
        /** @type {?} */
        var isToday = now.isSame(date, 'day');
        /** @type {?} */
        var isYesterday = now.add(-1, 'days').isSame(date, 'day');
        /** @type {?} */
        var templateVariables = __assign(__assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        var variables = this.compileVariables(date, templateVariables);
        /** @type {?} */
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
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeShortDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.relativeLongDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    };
    /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteDate = /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @return {?}
     */
    function (date, params, datetime) {
        if (datetime === void 0) { datetime = false; }
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign(__assign({}, this.formatterConfig.variables), params.variables);
        /** @type {?} */
        var template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteShortDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteShortDateTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteLongDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDateAdapter.prototype.absoluteLongDateTime = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.openedRangeDate = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign(__assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        var params = {};
        if (startDate) {
            /** @type {?} */
            var startDateVariables = this.compileVariables(startDate, variables);
            params = __assign(__assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            /** @type {?} */
            var endDateVariables = this.compileVariables(endDate, variables);
            params = __assign(__assign({}, variables), { END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATE)(params);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.openedRangeDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign(__assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        var params = {};
        if (startDate) {
            /** @type {?} */
            var startDateVariables = this.compileVariables(startDate, variables);
            params = __assign(__assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            /** @type {?} */
            var endDateVariables = this.compileVariables(endDate, variables);
            params = __assign(__assign({}, variables), { END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATETIME)(params);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeDate = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign(__assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        var sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        var params = __assign(__assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    function (startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        var variables = __assign(__assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        var sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        var sameDay = this.isSame('day', startDate, endDate);
        /** @type {?} */
        var startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        var endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        var params = __assign(__assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    };
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeShortDate = /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
    };
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeShortDateTime = /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
    };
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeLongDate = /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
    };
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeLongDateTime = /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.rangeMiddleDateTime = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.closedRange.middle);
    };
    /** Creates a Moment instance while respecting the current UTC settings. */
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    MomentDateAdapter.prototype.createMoment = /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return (this.options && this.options.useUtc) ? moment.utc.apply(moment, __spread(args)) : moment.apply(void 0, __spread(args));
    };
    /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    MomentDateAdapter.prototype.compileVariables = /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    function (date, variables) {
        /** @type {?} */
        var compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (var key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            var value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.isCurrentYear = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    };
    /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDateAdapter.prototype.isSame = /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    };
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    MomentDateAdapter.prototype.configureTranslator = /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        this.messageformat = new MessageFormat(locale);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.isNumeric = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.findFormat = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return null;
        }
        // default test - iso
        /** @type {?} */
        var isoDate = this.createMoment(value, moment.ISO_8601, this.locale);
        if (isoDate.isValid()) {
            return isoDate;
        }
        if (this.isNumeric(value)) {
            // unix time sec
            return this.createMoment(value, 'X', this.locale);
        }
        // long months naming: D MMM YYYY, MMM Do YYYY with short case support
        if (/^\d{1,2}\s\S+\s(\d{2}|\d{4})$/.test(value.trim()) ||
            /^\S+\s\d{1,2}[a-z]{2}\s(\d{2}|\d{4})$/.test(value.trim())) {
            return this.parseWithSpace(value);
        }
        // slash notation: DD/MM/YYYY, MM/DD/YYYY with short case support
        if (/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/.test(value)) {
            return this.parseWithSlash(value);
        }
        // dash notation: DD-MM-YYYY, YYYY-DD-MM with short case support
        if (/(^(\d{1,2}|\d{4})-\d{1,2}-\d{1,2}$)|(^\d{1,2}-\d{1,2}-(\d{2}|\d{4})$)/.test(value)) {
            return this.parseWithDash(value);
        }
        // dot notation: DD.MM.YYYY with short case support
        if (/^\d{1,2}\.\d{1,2}\.(\d{2}|\d{4})$/.test(value)) {
            return this.parseWithDot(value);
        }
        return null;
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.parseWithSpace = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD MMMM YYYY', this.locale);
            case 'en':
                // 16 Feb 2019 vs Feb 16th 2019, covers Feb and February cases
                if (this.isNumeric(value[0])) {
                    return this.createMoment(value, 'D MMMM YYYY', this.locale);
                }
                return this.createMoment(value, 'MMMM Do YYYY', this.locale);
            default:
                throw new Error("Locale " + this.locale + " is not supported");
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.parseWithSlash = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD/MM/YYYY', this.locale);
            // todo do we use generalized locales? en vs en-US; until not we try to guess
            case 'en':
                // US vs UK
                /** @type {?} */
                var parts = value.split('/');
                /** @type {?} */
                var datePartsCount = 3;
                if (parts.length !== datePartsCount) {
                    return null;
                }
                /** @type {?} */
                var firstPart = parts[0].trim();
                /** @type {?} */
                var secondPart = parts[1].trim();
                if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                    return null;
                }
                /** @type {?} */
                var monthsInYears = 12;
                /** @type {?} */
                var canFirstBeMonth = +firstPart <= monthsInYears;
                /** @type {?} */
                var canSecondByMonth = +secondPart <= monthsInYears;
                // first two parts cannot be month
                if (!canFirstBeMonth && !canSecondByMonth) {
                    return null;
                }
                /** @type {?} */
                var canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                if (canDetermineWhereMonth) {
                    // use US format by default
                    return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                }
                return canFirstBeMonth && !canSecondByMonth
                    ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                    : this.createMoment(value, 'DD/MM/YYYY', this.locale);
            default:
                throw new Error("Locale " + this.locale + " is not supported");
        }
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.parseWithDash = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // leading year vs finishing year
        /** @type {?} */
        var parts = value.split('-');
        if (parts[0].length === 0) {
            return null;
        }
        /** @type {?} */
        var maxDayOrMonthCharsCount = 2;
        return parts[0].length <= maxDayOrMonthCharsCount
            ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
            : this.createMoment(value, 'YYYY-MM-DD', this.locale);
    };
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MomentDateAdapter.prototype.parseWithDot = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // covers two cases YYYY and YY (for current year)
        return this.createMoment(value, 'DD.MM.YYYY', this.locale);
    };
    MomentDateAdapter.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_LOCALE,] }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
    ]; };
    return MomentDateAdapter;
}(DateAdapter));
export { MomentDateAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype.messageformat;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype.invalidDateErrorText;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype.formatterConfig;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype.localeData;
    /**
     * @type {?}
     * @private
     */
    MomentDateAdapter.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyLyIsInNvdXJjZXMiOlsibW9tZW50LWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQ0gsV0FBVyxFQUNYLGNBQWMsRUFJakIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEtBQUssYUFBYSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFLL0MsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7OztBQUdsQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBVSxNQUFNLFFBQVEsQ0FBQztBQUcxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDOztJQUlqQyxNQUFNLEdBQUcsYUFBYSxJQUFJLE9BQU87Ozs7O0FBR3ZDLGlEQVdDOzs7Ozs7O0lBTkcsNkNBQWdCOzs7Ozs7SUFLaEIscURBQXdCOzs7Ozs7QUFJNUIsTUFBTSxLQUFPLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUM1RCxnQ0FBZ0MsRUFBRTtJQUM5QixVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsc0NBQXNDO0NBQ2xELENBQUM7Ozs7OztBQUlOLE1BQU0sVUFBVSxzQ0FBc0M7SUFDbEQsT0FBTztRQUNILE1BQU0sRUFBRSxLQUFLO1FBQ2IsY0FBYyxFQUFFLEtBQUs7S0FDeEIsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7O0FBR0QsU0FBUyxLQUFLLENBQUksTUFBYyxFQUFFLGFBQW1DOztRQUMzRCxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUVqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzdCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDO0FBRUQ7SUFDdUMscUNBQW1CO0lBc0J0RCwyQkFDd0MsVUFBa0IsRUFFOUMsT0FBcUM7UUFIakQsWUFLSSxpQkFBTyxTQUtWO1FBUFcsYUFBTyxHQUFQLE9BQU8sQ0FBOEI7UUFyQmhDLDBCQUFvQixHQUFXLGNBQWMsQ0FBQztRQXlCM0QsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFOUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7SUFDMUMsQ0FBQztJQXhCRCxzQkFBWSwrQ0FBZ0I7Ozs7O1FBQTVCO1lBQ0ksT0FBTyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBOzs7OztJQXdCRCxxQ0FBUzs7OztJQUFULFVBQVUsTUFBYztRQUF4QixpQkE4QkM7UUE3QkcsaUJBQU0sU0FBUyxZQUFDLE1BQU0sQ0FBQyxDQUFDOztZQUVwQixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7O1lBRzFDLFVBQVUsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFFL0IsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFckQsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7Z0JBQzNDLFdBQVcsRUFBRTtvQkFDVCxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVM7b0JBQ3ZELFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVTtpQkFDL0Q7Z0JBQ0QsYUFBYSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLEtBQUs7Z0JBQ3hELFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJO2FBQ3JELENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRztZQUNkLGNBQWMsRUFBRSxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUU7WUFDakQsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtZQUNyQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO1lBQzNDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRTs7OztZQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQTNDLENBQTJDLEVBQUM7WUFDcEUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUMzQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1lBQ2pELGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtTQUNuRCxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxzQ0FBVTs7OztJQUFWLFVBQVcsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxzQ0FBVTs7OztJQUFWLFVBQVcsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCwyQ0FBZTs7OztJQUFmLFVBQWdCLElBQVk7UUFDeEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsbUNBQU87Ozs7SUFBUCxVQUFRLElBQVk7UUFDaEIsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCx3Q0FBWTs7OztJQUFaLFVBQWEsSUFBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCx5Q0FBYTs7OztJQUFiLFVBQWMsS0FBa0M7UUFDNUMsK0NBQStDO1FBQy9DLE9BQU8sS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3ZGLENBQUM7Ozs7SUFFRCx3Q0FBWTs7O0lBQVo7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsNkNBQWlCOzs7O0lBQWpCLFVBQWtCLEtBQWtDO1FBQ2hELElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7U0FDMUM7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYLFVBQVksSUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxpQ0FBSzs7OztJQUFMLFVBQU0sSUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7OztJQUVELHNDQUFVOzs7Ozs7SUFBVixVQUFXLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUNoRCwyRkFBMkY7UUFDM0Ysc0VBQXNFO1FBQ3RFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxDQUFDLDJCQUF3QixLQUFLLGdEQUE0QyxDQUFDLENBQUM7U0FDMUY7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLEtBQUssQ0FBQyxvQkFBaUIsSUFBSSx1Q0FBbUMsQ0FBQyxDQUFDO1NBQ3pFOztZQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpFLG1GQUFtRjtRQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLE1BQU0sS0FBSyxDQUFDLG9CQUFpQixJQUFJLGtDQUEyQixLQUFLLFFBQUksQ0FBQyxDQUFDO1NBQzFFO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7Ozs7SUFFRCwwQ0FBYzs7Ozs7Ozs7OztJQUFkLFVBQ0ksSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsWUFBb0I7O1lBRTFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBRWxELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkMsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELGlDQUFLOzs7SUFBTDtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRUQsaUNBQUs7Ozs7O0lBQUwsVUFBTSxLQUFVLEVBQUUsV0FBOEI7UUFDNUMsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtvQkFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztnQkFFRCxPQUFPLFdBQVc7b0JBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3REO1lBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFRCxrQ0FBTTs7Ozs7SUFBTixVQUFPLElBQVksRUFBRSxhQUFxQjtRQUN0QywyQ0FBMkM7UUFDM0MsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDckIsTUFBTSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztTQUNqRTtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7SUFFRCw0Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLElBQVksRUFBRSxLQUFhO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7Ozs7O0lBRUQsNkNBQWlCOzs7OztJQUFqQixVQUFrQixJQUFZLEVBQUUsTUFBYztRQUMxQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7OztJQUVELDJDQUFlOzs7OztJQUFmLFVBQWdCLElBQVksRUFBRSxJQUFZO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxxQ0FBUzs7OztJQUFULFVBQVUsSUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELDJDQUEyQzs7Ozs7O0lBQzNDLHVDQUFXOzs7OztJQUFYLFVBQVksS0FBVTs7WUFDZCxJQUFJO1FBQ1IsSUFBSSxLQUFLLFlBQVksSUFBSSxFQUFFO1lBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsMkRBQTJEO1lBQzNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLGlCQUFNLFdBQVcsWUFBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELDBDQUFjOzs7O0lBQWQsVUFBZSxHQUFRO1FBQ25CLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7OztJQUVELG1DQUFPOzs7O0lBQVAsVUFBUSxJQUFZO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsbUNBQU87OztJQUFQO1FBQ0ksT0FBTyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRUQsd0NBQVk7Ozs7O0lBQVosVUFBYSxJQUFZLEVBQUUsUUFBb0M7UUFDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQUU7O1lBRXpFLEdBQUcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCOztZQUUzQixZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDOztZQUN4QyxZQUFZLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDOztZQUV4QyxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDOztZQUNqQyxXQUFXLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs7WUFFckQsaUJBQWlCLHlCQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUM7O1lBQzlFLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDOztZQUM1RCxXQUFXO1FBRWYsSUFBSSxZQUFZLElBQUksRUFBRSxFQUFFLEVBQUUsY0FBYztZQUNwQyxTQUFTLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztZQUN4QyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUV0QzthQUFNLElBQUksWUFBWSxJQUFJLEVBQUUsRUFBRSxFQUFFLGNBQWM7WUFDM0MsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7WUFDeEMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FFdEM7YUFBTSxJQUFJLE9BQU8sRUFBRSxFQUFFLFFBQVE7WUFDMUIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7U0FFaEM7YUFBTSxJQUFJLFdBQVcsRUFBRSxFQUFFLFlBQVk7WUFDbEMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FFcEM7YUFBTSxFQUFFLG1CQUFtQjtZQUN4QixXQUFXLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1NBQzNDO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVELDZDQUFpQjs7OztJQUFqQixVQUFrQixJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7OztJQUVELDRDQUFnQjs7OztJQUFoQixVQUFpQixJQUFZO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7Ozs7O0lBRUQsd0NBQVk7Ozs7OztJQUFaLFVBQWEsSUFBWSxFQUFFLE1BQWtDLEVBQUUsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQUU7O1lBRXpFLFNBQVMseUJBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQzs7WUFDcEUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7UUFFekQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsSUFBWTtRQUMxQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFFRCxpREFBcUI7Ozs7SUFBckIsVUFBc0IsSUFBWTtRQUM5QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7Ozs7O0lBRUQsNENBQWdCOzs7O0lBQWhCLFVBQWlCLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Ozs7O0lBRUQsZ0RBQW9COzs7O0lBQXBCLFVBQXFCLElBQVk7UUFDN0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDOzs7Ozs7O0lBRUQsMkNBQWU7Ozs7OztJQUFmLFVBQWdCLFNBQXdCLEVBQUUsT0FBc0IsRUFBRSxRQUFpQztRQUMvRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUM5Qzs7WUFFSyxTQUFTLHlCQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUU7O1lBQzFFLE1BQU0sR0FBRyxFQUFFO1FBRWYsSUFBSSxTQUFTLEVBQUU7O2dCQUNMLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1lBRXRFLE1BQU0seUJBQ0MsU0FBUyxLQUNaLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDL0UsVUFBVSxFQUFFLFdBQVcsR0FDMUIsQ0FBQztTQUNMO2FBQU0sSUFBSSxPQUFPLEVBQUU7O2dCQUNWLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBRWxFLE1BQU0seUJBQ0MsU0FBUyxLQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDekUsVUFBVSxFQUFFLFNBQVMsR0FDeEIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7OztJQUVELCtDQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLFNBQXdCLEVBQUUsT0FBc0IsRUFBRSxRQUFpQztRQUNuRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUM5Qzs7WUFFSyxTQUFTLHlCQUFRLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFLLFFBQVEsQ0FBQyxTQUFTLENBQUU7O1lBQzFFLE1BQU0sR0FBRyxFQUFFO1FBRWYsSUFBSSxTQUFTLEVBQUU7O2dCQUNMLGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1lBRXRFLE1BQU0seUJBQ0MsU0FBUyxLQUNaLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDdkYsVUFBVSxFQUFFLFdBQVcsR0FDMUIsQ0FBQztTQUNMO2FBQU0sSUFBSSxPQUFPLEVBQUU7O2dCQUNWLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1lBRWxFLE1BQU0seUJBQ0MsU0FBUyxLQUNaLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDakYsVUFBVSxFQUFFLFNBQVMsR0FDeEIsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7OztJQUVELHFDQUFTOzs7Ozs7SUFBVCxVQUFVLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFFBQWlDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDOztZQUVLLFNBQVMseUJBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBRTs7WUFDeEUsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7O1lBRXBELGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQ3RFLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O1lBRXBDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O1lBRWxDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLEtBQUssS0FBSyxJQUFJLGdCQUFnQixDQUFDLFlBQVksS0FBSyxLQUFLO1FBQzVHLGtCQUFrQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLGdCQUFnQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztZQUV6RCxNQUFNLHlCQUNMLFNBQVMsS0FDWixVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQy9FLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDekUsVUFBVSxFQUFFLFNBQVMsR0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7O0lBRUQseUNBQWE7Ozs7OztJQUFiLFVBQWMsU0FBaUIsRUFBRSxPQUFlLEVBQUUsUUFBaUM7UUFDL0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDOUM7O1lBRUssU0FBUyx5QkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBSyxRQUFRLENBQUMsU0FBUyxDQUFDOztZQUN0RSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQzs7WUFDcEQsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7O1lBRWhELGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQ3RFLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDMUMsa0JBQWtCLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7WUFFaEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7UUFDbEUsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUN4QyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDOztZQUU5QixlQUFlLEdBQ2pCLGtCQUFrQixDQUFDLFlBQVksS0FBSyxLQUFLO1lBQ3pDLGdCQUFnQixDQUFDLFlBQVksS0FBSyxLQUFLO1FBQzNDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLGdCQUFnQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztZQUV6RCxNQUFNLHlCQUFPLFNBQVMsS0FDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUN2RixZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQ2pGLFVBQVUsRUFBRSxTQUFTLEVBQ3JCLFFBQVEsRUFBRSxPQUFPLEdBQUM7UUFFdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7O0lBRUQsMENBQWM7Ozs7O0lBQWQsVUFBZSxTQUF3QixFQUFFLE9BQWdCOztZQUMvQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO1FBRTFELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7O0lBRUQsOENBQWtCOzs7OztJQUFsQixVQUFtQixTQUF3QixFQUFFLE9BQWdCOztZQUNuRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO1FBRTFELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25GO1FBRUQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRyxDQUFDOzs7Ozs7SUFFRCx5Q0FBYTs7Ozs7SUFBYixVQUFjLFNBQXdCLEVBQUUsT0FBZ0I7O1lBQzlDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7UUFFMUQsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUU7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7Ozs7SUFFRCw2Q0FBaUI7Ozs7O0lBQWpCLFVBQWtCLFNBQXdCLEVBQUUsT0FBZ0I7O1lBQ2xELGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7UUFFMUQsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEY7UUFFRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxJQUFJLElBQUksRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pHLENBQUM7Ozs7OztJQUVELCtDQUFtQjs7Ozs7SUFBbkIsVUFBb0IsU0FBaUIsRUFBRSxPQUFlO1FBQ2xELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxRyxDQUFDO0lBRUQsMkVBQTJFOzs7Ozs7O0lBQ25FLHdDQUFZOzs7Ozs7SUFBcEI7UUFBcUIsY0FBYzthQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7WUFBZCx5QkFBYzs7UUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBVixNQUFNLFdBQVEsSUFBSSxHQUFFLENBQUMsQ0FBQyxNQUFNLHdCQUFJLElBQUksRUFBQyxDQUFDO0lBQ3pGLENBQUM7Ozs7Ozs7SUFFTyw0Q0FBZ0I7Ozs7OztJQUF4QixVQUF5QixJQUFZLEVBQUUsU0FBYzs7WUFDM0MsaUJBQWlCLEdBQVEsRUFBRTtRQUVqQyxxQ0FBcUM7UUFDckMsS0FBSyxJQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hDLFNBQVM7YUFDWjs7Z0JBRUssS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFDNUIsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztRQUVELGlCQUFpQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFELE9BQU8saUJBQWlCLENBQUM7SUFDN0IsQ0FBQzs7Ozs7O0lBRU8seUNBQWE7Ozs7O0lBQXJCLFVBQXNCLEtBQWE7UUFDL0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEUsQ0FBQzs7Ozs7Ozs7SUFFTyxrQ0FBTTs7Ozs7OztJQUFkLFVBQWUsSUFBd0IsRUFBRSxTQUFpQixFQUFFLE9BQWU7UUFDdkUsT0FBTyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBRU8sK0NBQW1COzs7OztJQUEzQixVQUE0QixNQUFjO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRU8scUNBQVM7Ozs7O0lBQWpCLFVBQWtCLEtBQVU7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRU8sc0NBQVU7Ozs7O0lBQWxCLFVBQW1CLEtBQWE7UUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7OztZQUdLLE9BQU8sR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkUsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsZ0JBQWdCO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyRDtRQUVELHNFQUFzRTtRQUN0RSxJQUNJLCtCQUErQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsdUNBQXVDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUM1RDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztRQUVELGlFQUFpRTtRQUNqRSxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7UUFFRCxnRUFBZ0U7UUFDaEUsSUFBSSx1RUFBdUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO1FBRUQsbURBQW1EO1FBQ25ELElBQUksbUNBQW1DLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVPLDBDQUFjOzs7OztJQUF0QixVQUF1QixLQUFhO1FBQ2hDLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQixLQUFLLElBQUk7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLEtBQUssSUFBSTtnQkFDTCw4REFBOEQ7Z0JBQzlELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMvRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakU7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFVLElBQUksQ0FBQyxNQUFNLHNCQUFtQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOzs7Ozs7SUFFTywwQ0FBYzs7Ozs7SUFBdEIsVUFBdUIsS0FBYTtRQUNoQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxJQUFJO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCw2RUFBNkU7WUFDN0UsS0FBSyxJQUFJOzs7b0JBRUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztvQkFDeEIsY0FBYyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLEVBQUU7b0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2lCQUNmOztvQkFFSyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTs7b0JBQzNCLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO2dCQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzNELE9BQU8sSUFBSSxDQUFDO2lCQUNmOztvQkFFSyxhQUFhLEdBQUcsRUFBRTs7b0JBRWxCLGVBQWUsR0FBRyxDQUFDLFNBQVMsSUFBSSxhQUFhOztvQkFDN0MsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLElBQUksYUFBYTtnQkFFckQsa0NBQWtDO2dCQUNsQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZDLE9BQU8sSUFBSSxDQUFDO2lCQUNmOztvQkFFSyxzQkFBc0IsR0FBRyxlQUFlLElBQUksZ0JBQWdCO2dCQUVsRSxJQUFJLHNCQUFzQixFQUFFO29CQUN4QiwyQkFBMkI7b0JBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsT0FBTyxlQUFlLElBQUksQ0FBQyxnQkFBZ0I7b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFVLElBQUksQ0FBQyxNQUFNLHNCQUFtQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOzs7Ozs7SUFFTyx5Q0FBYTs7Ozs7SUFBckIsVUFBc0IsS0FBYTs7O1lBRXpCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7O1lBRUssdUJBQXVCLEdBQUcsQ0FBQztRQUVqQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksdUJBQXVCO1lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTyx3Q0FBWTs7Ozs7SUFBcEIsVUFBcUIsS0FBYTtRQUM5QixrREFBa0Q7UUFDbEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7O2dCQXZvQkosVUFBVTs7Ozs2Q0F3QkYsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjO2dEQUNqQyxRQUFRLFlBQUksTUFBTSxTQUFDLDhCQUE4Qjs7SUErbUIxRCx3QkFBQztDQUFBLEFBeG9CRCxDQUN1QyxXQUFXLEdBdW9CakQ7U0F2b0JZLGlCQUFpQjs7Ozs7O0lBRTFCLDBDQUFxQzs7Ozs7SUFFckMsaURBQStEOzs7OztJQUUvRCw0Q0FBMEM7Ozs7O0lBTTFDLHVDQVFFOzs7OztJQUlFLG9DQUM2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGVBZGFwdGVyLFxuICAgIE1DX0RBVEVfTE9DQUxFLFxuICAgIElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQgKiBhcyBNZXNzYWdlRm9ybWF0IGZyb20gJ21lc3NhZ2Vmb3JtYXQnO1xuLy8gRGVwZW5kaW5nIG9uIHdoZXRoZXIgcm9sbHVwIGlzIHVzZWQsIG1vbWVudCBuZWVkcyB0byBiZSBpbXBvcnRlZCBkaWZmZXJlbnRseS5cbi8vIFNpbmNlIE1vbWVudC5qcyBkb2Vzbid0IGhhdmUgYSBkZWZhdWx0IGV4cG9ydCwgd2Ugbm9ybWFsbHkgbmVlZCB0byBpbXBvcnQgdXNpbmcgdGhlIGAqIGFzYFxuLy8gc3ludGF4LiBIb3dldmVyLCByb2xsdXAgY3JlYXRlcyBhIHN5bnRoZXRpYyBkZWZhdWx0IG1vZHVsZSBhbmQgd2UgdGh1cyBuZWVkIHRvIGltcG9ydCBpdCB1c2luZ1xuLy8gdGhlIGBkZWZhdWx0IGFzYCBzeW50YXguXG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuLy8gQHRzLWlnbm9yZSAobG9vayBhdCB0c2NvbmZpZylcbmltcG9ydCB7IGRlZmF1bHQgYXMgX3JvbGx1cE1vbWVudCwgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHVuaXRPZlRpbWUgfSBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBlblVTIH0gZnJvbSAnLi9sb2NhbGVzL2VuLVVTJztcbmltcG9ydCB7IHJ1UlUgfSBmcm9tICcuL2xvY2FsZXMvcnUtUlUnO1xuaW1wb3J0IHsgSUZvcm1hdHRlckNvbmZpZyB9IGZyb20gJy4vbG9jYWxlcy9JRm9ybWF0dGVyQ29uZmlnJztcblxuXG5jb25zdCBtb21lbnQgPSBfcm9sbHVwTW9tZW50IHx8IF9tb21lbnQ7XG5cbi8qKiBDb25maWd1cmFibGUgb3B0aW9ucyBmb3Ige0BzZWUgTW9tZW50RGF0ZUFkYXB0ZXJ9LiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB1c2Ugb2YgdXRjIGRhdGVzIG9uIG9yIG9mZi5cbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgdXNlVXRjOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIHdoZXRoZXIgc2hvdWxkIHBhcnNlIG1ldGhvZCB0cnkgZ3Vlc3MgZGF0ZSBmb3JtYXRcbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgZmluZERhdGVGb3JtYXQ6IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zPihcbiAgICAnTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlVXRjOiBmYWxzZSxcbiAgICAgICAgZmluZERhdGVGb3JtYXQ6IGZhbHNlXG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xuXG4gICAgcHJpdmF0ZSBtZXNzYWdlZm9ybWF0OiBNZXNzYWdlRm9ybWF0O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkRGF0ZUVycm9yVGV4dDogc3RyaW5nID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBwcml2YXRlIGZvcm1hdHRlckNvbmZpZzogSUZvcm1hdHRlckNvbmZpZztcblxuICAgIHByaXZhdGUgZ2V0IG1vbWVudFdpdGhMb2NhbGUoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbGVEYXRhOiB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICAgICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgb3B0aW9ucz86IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRyYW5zbGF0b3IodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlckNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXG4gICAgICAgICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTtcbiAgICB9XG5cbiAgICBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpO1xuICAgIH1cblxuICAgIGdldERhdGUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldEhvdXJzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKCk7XG4gICAgfVxuXG4gICAgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5zZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbGxpc2Vjb25kcygpO1xuICAgIH1cblxuICAgIGdldFRpbWUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudmFsdWVPZigpO1xuICAgIH1cblxuICAgIGdldERheU9mV2VlayhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXkoKTtcbiAgICB9XG5cbiAgICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIC8vIE1vbWVudC5qcyBkb2Vzbid0IHN1cHBvcnQgbmFycm93IG1vbnRoIG5hbWVzXG4gICAgICAgIHJldHVybiBzdHlsZSA9PT0gJ2xvbmcnID8gdGhpcy5sb2NhbGVEYXRhLmxvbmdNb250aHMgOiB0aGlzLmxvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoc3R5bGUgPT09ICdsb25nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5sb25nRGF5c09mV2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3Nob3J0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgICAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZU1vbWVudCh7eWVhciwgbW9udGgsIGRhdGV9KS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlciwgaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogTW9tZW50IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgICAgbmV3RGF0ZS5ob3Vycyhob3Vycyk7XG4gICAgICAgIG5ld0RhdGUubWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgbmV3RGF0ZS5zZWNvbmRzKHNlY29uZHMpO1xuICAgICAgICBuZXdEYXRlLm1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBuZXdEYXRlO1xuICAgIH1cblxuICAgIHRvZGF5KCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maW5kRGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JtYXQoZGF0ZTogTW9tZW50LCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlLmZvcm1hdChkaXNwbGF5Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IHllYXJzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtb250aHMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgZGF5cyB9KTtcbiAgICB9XG5cbiAgICB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuXG4gICAgLyoqIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gTm90ZTogYXNzdW1lcyB0aGF0IGNsb25pbmcgYWxzbyBzZXRzIHRoZSBjb3JyZWN0IGxvY2FsZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoZGF0ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICAgIH1cblxuICAgIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBpbnZhbGlkKCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIHJlbGF0aXZlRGF0ZShkYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCBub3cgPSB0aGlzLm1vbWVudFdpdGhMb2NhbGU7XG5cbiAgICAgICAgY29uc3QgdG90YWxTZWNvbmRzID0gbm93LmRpZmYoZGF0ZSwgJ3NlY29uZHMnKTtcbiAgICAgICAgY29uc3QgdG90YWxNaW51dGVzID0gbm93LmRpZmYoZGF0ZSwgJ21pbnV0ZXMnKTtcblxuICAgICAgICBjb25zdCBpc1RvZGF5ID0gbm93LmlzU2FtZShkYXRlLCAnZGF5Jyk7XG4gICAgICAgIGNvbnN0IGlzWWVzdGVyZGF5ID0gbm93LmFkZCgtMSwgJ2RheXMnKS5pc1NhbWUoZGF0ZSwgJ2RheScpO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGRhdGUsIHRlbXBsYXRlVmFyaWFibGVzKTtcbiAgICAgICAgbGV0IG5ld1RlbXBsYXRlO1xuXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPD0gNTkpIHsgLy8gc2Vjb25kcyBhZ29cbiAgICAgICAgICAgIHZhcmlhYmxlcy5TRUNPTkRTX1BBU1NFRCA9IHRvdGFsU2Vjb25kcztcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuU0VDT05EU19BR087XG5cbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbE1pbnV0ZXMgPD0gNTkpIHsgLy8gbWludXRlcyBhZ29cbiAgICAgICAgICAgIHZhcmlhYmxlcy5NSU5VVEVTX1BBU1NFRCA9IHRvdGFsTWludXRlcztcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuTUlOVVRFU19BR087XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1RvZGF5KSB7IC8vIHRvZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLlRPREFZO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNZZXN0ZXJkYXkpIHsgLy8geWVzdGVyZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLllFU1RFUkRBWTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBiZWZvcmUgeWVzdGVyZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLkJFRk9SRV9ZRVNURVJEQVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUobmV3VGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgcmVsYXRpdmVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aXZlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5yZWxhdGl2ZVRlbXBsYXRlcy5sb25nKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZURhdGUoZGF0ZTogTW9tZW50LCBwYXJhbXM6IElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlLCBkYXRldGltZSA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnBhcmFtcy52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRhdGV0aW1lID8gcGFyYW1zLkRBVEVUSU1FIDogcGFyYW1zLkRBVEU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlKSh0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgdmFyaWFibGVzKSk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0LCB0cnVlKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMubG9uZywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZTogTW9tZW50IHwgbnVsbCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KHN0YXJ0RGF0ZSkgJiYgIW1vbWVudC5pc01vbWVudChlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFKShwYXJhbXMpO1xuICAgIH1cblxuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlOiBNb21lbnQgfCBudWxsLCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQoc3RhcnREYXRlKSAmJiAhbW9tZW50LmlzTW9tZW50KGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPSBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJiBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcyc7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICAgICAgY29uc3Qgc2FtZURheSA9IHRoaXMuaXNTYW1lKCdkYXknLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPVxuICAgICAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiZcbiAgICAgICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gey4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIEVORF9EQVRFVElNRTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEVUSU1FKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIFNBTUVfTU9OVEg6IHNhbWVNb250aCxcbiAgICAgICAgICAgIFNBTUVfREFZOiBzYW1lRGF5fTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURVRJTUUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLnNob3J0KTtcbiAgICB9XG5cbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2UubG9uZyk7XG4gICAgfVxuXG4gICAgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLmxvbmcpO1xuICAgIH1cblxuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5taWRkbGUpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9tZW50KC4uLmFyZ3M6IGFueVtdKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnVzZVV0YykgPyBtb21lbnQudXRjKC4uLmFyZ3MpIDogbW9tZW50KC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGlsZVZhcmlhYmxlcyhkYXRlOiBNb21lbnQsIHZhcmlhYmxlczogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgY29tcGlsZWRWYXJpYWJsZXM6IGFueSA9IHt9O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3ItaW5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAoIXZhcmlhYmxlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICAgICAgICBjb21waWxlZFZhcmlhYmxlc1trZXldID0gZGF0ZS5mb3JtYXQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcGlsZWRWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gdGhpcy5pc0N1cnJlbnRZZWFyKGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBjb21waWxlZFZhcmlhYmxlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQ3VycmVudFllYXIodmFsdWU6IE1vbWVudCk6ICd5ZXMnIHwgJ25vJyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbWVudFdpdGhMb2NhbGUuaXNTYW1lKHZhbHVlLCAneWVhcicpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTYW1lKHVuaXQ6IHVuaXRPZlRpbWUuU3RhcnRPZiwgc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdGFydERhdGUuaXNTYW1lKGVuZERhdGUsIHVuaXQpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlVHJhbnNsYXRvcihsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lc3NhZ2Vmb3JtYXQgPSBuZXcgTWVzc2FnZUZvcm1hdChsb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEZvcm1hdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0ZXN0IC0gaXNvXG4gICAgICAgIGNvbnN0IGlzb0RhdGUgPSAgdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIGlmIChpc29EYXRlLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzb0RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAvLyB1bml4IHRpbWUgc2VjXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdYJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9uZyBtb250aHMgbmFtaW5nOiBEIE1NTSBZWVlZLCBNTU0gRG8gWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvXlxcZHsxLDJ9XFxzXFxTK1xccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKSB8fFxuICAgICAgICAgICAgL15cXFMrXFxzXFxkezEsMn1bYS16XXsyfVxccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsYXNoIG5vdGF0aW9uOiBERC9NTS9ZWVlZLCBNTS9ERC9ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwvXFxkezEsMn1cXC8oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU2xhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzaCBub3RhdGlvbjogREQtTU0tWVlZWSwgWVlZWS1ERC1NTSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoLyheKFxcZHsxLDJ9fFxcZHs0fSktXFxkezEsMn0tXFxkezEsMn0kKXwoXlxcZHsxLDJ9LVxcZHsxLDJ9LShcXGR7Mn18XFxkezR9KSQpLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvdCBub3RhdGlvbjogREQuTU0uWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcLlxcZHsxLDJ9XFwuKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERvdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNwYWNlKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyAxNiBGZWIgMjAxOSB2cyBGZWIgMTZ0aCAyMDE5LCBjb3ZlcnMgRmViIGFuZCBGZWJydWFyeSBjYXNlc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnRCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU1NTSBEbyBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNsYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB0b2RvIGRvIHdlIHVzZSBnZW5lcmFsaXplZCBsb2NhbGVzPyBlbiB2cyBlbi1VUzsgdW50aWwgbm90IHdlIHRyeSB0byBndWVzc1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIFVTIHZzIFVLXG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0c0NvdW50ID0gMztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSBkYXRlUGFydHNDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBhcnQgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUGFydCA9IHBhcnRzWzFdLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyaWMoZmlyc3RQYXJ0KSB8fCAhdGhpcy5pc051bWVyaWMoc2Vjb25kUGFydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhzSW5ZZWFycyA9IDEyO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRmlyc3RCZU1vbnRoID0gK2ZpcnN0UGFydCA8PSBtb250aHNJblllYXJzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhblNlY29uZEJ5TW9udGggPSArc2Vjb25kUGFydCA8PSBtb250aHNJblllYXJzO1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgdHdvIHBhcnRzIGNhbm5vdCBiZSBtb250aFxuICAgICAgICAgICAgICAgIGlmICghY2FuRmlyc3RCZU1vbnRoICYmICFjYW5TZWNvbmRCeU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkRldGVybWluZVdoZXJlTW9udGggPSBjYW5GaXJzdEJlTW9udGggJiYgY2FuU2Vjb25kQnlNb250aDtcblxuICAgICAgICAgICAgICAgIGlmIChjYW5EZXRlcm1pbmVXaGVyZU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBVUyBmb3JtYXQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTS9ERC9ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGxlYWRpbmcgeWVhciB2cyBmaW5pc2hpbmcgeWVhclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG4gICAgICAgIGlmIChwYXJ0c1swXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4RGF5T3JNb250aENoYXJzQ291bnQgPSAyO1xuXG4gICAgICAgIHJldHVybiBwYXJ0c1swXS5sZW5ndGggPD0gbWF4RGF5T3JNb250aENoYXJzQ291bnRcbiAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC1NTS1ZWVlZJywgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnWVlZWS1NTS1ERCcsIHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aERvdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGNvdmVycyB0d28gY2FzZXMgWVlZWSBhbmQgWVkgKGZvciBjdXJyZW50IHllYXIpXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELk1NLllZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxufVxuIl19