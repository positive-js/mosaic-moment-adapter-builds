/**
 * @fileoverview added by tsickle
 * Generated from: moment-date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const moment = _rollupMoment || _moment;
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
export const MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
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
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
export class MomentDateAdapter extends DateAdapter {
    /**
     * @param {?} dateLocale
     * @param {?=} options
     */
    constructor(dateLocale, options) {
        super();
        this.options = options;
        this.invalidDateErrorText = 'Invalid date';
        this.setLocale(dateLocale || moment.locale());
        this.configureTranslator(this.locale);
    }
    /**
     * @private
     * @return {?}
     */
    get momentWithLocale() {
        return moment().locale(this.locale);
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        /** @type {?} */
        let momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        /** @type {?} */
        const i18nLocals = ['en', 'ru'];
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
            (i) => this.createDate(2017, 0, i + 1).format('D'))),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    /**
     * @return {?}
     */
    getLocaleData() {
        return this.localeData;
    }
    /**
     * @param {?} localeData
     * @return {?}
     */
    setLocaleData(localeData) {
        this.localeData = localeData;
    }
    /**
     * @param {?} localeData
     * @return {?}
     */
    updateLocaleData(localeData) {
        this.localeData = Object.assign(Object.assign({}, this.localeData), localeData);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return this.clone(date).year();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return this.clone(date).month();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return this.clone(date).date();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHours(date) {
        return this.clone(date).hours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinutes(date) {
        return this.clone(date).minutes();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getSeconds(date) {
        return this.clone(date).seconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMilliseconds(date) {
        return this.clone(date).milliseconds();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getTime(date) {
        return date.valueOf();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    }
    /**
     * @return {?}
     */
    getDateNames() {
        return this.localeData.dates;
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return date.clone().locale(this.locale);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        /** @type {?} */
        const result = this.createMoment({ year, month, date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
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
    createDateTime(year, month, date, hours, minutes, seconds, milliseconds) {
        /** @type {?} */
        const newDate = this.createDate(year, month, date);
        newDate.hours(hours);
        newDate.minutes(minutes);
        newDate.seconds(seconds);
        newDate.milliseconds(milliseconds);
        return newDate;
    }
    /**
     * @return {?}
     */
    today() {
        return this.createMoment().locale(this.locale);
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
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
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.clone(date).add({ years });
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        return this.clone(date).add({ months });
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this.clone(date).add({ days });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return this.clone(date).format();
    }
    /**
     * https://www.ietf.org/rfc/rfc3339.txt
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        /** @type {?} */
        let date;
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
        return super.deserialize(value);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return moment.isMoment(obj);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return this.clone(date).isValid();
    }
    /**
     * @return {?}
     */
    invalid() {
        return moment.invalid();
    }
    /**
     * @param {?} date
     * @param {?} template
     * @return {?}
     */
    relativeDate(date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const now = this.momentWithLocale;
        /** @type {?} */
        const totalSeconds = now.diff(date, 'seconds');
        /** @type {?} */
        const totalMinutes = now.diff(date, 'minutes');
        /** @type {?} */
        const isToday = now.isSame(date, 'day');
        /** @type {?} */
        const isYesterday = now.add(-1, 'days').isSame(date, 'day');
        /** @type {?} */
        const templateVariables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        const variables = this.compileVariables(date, templateVariables);
        /** @type {?} */
        let newTemplate;
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    relativeShortDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    relativeLongDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    }
    /**
     * @param {?} date
     * @param {?} params
     * @param {?=} datetime
     * @param {?=} milliseconds
     * @param {?=} microseconds
     * @return {?}
     */
    absoluteDate(date, params, datetime = false, milliseconds = false, microseconds = false) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = this.compileVariables(date, Object.assign(Object.assign({}, this.formatterConfig.variables), params.variables));
        variables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        variables.SHOW_MICROSECONDS = microseconds ? 'yes' : 'no';
        /** @type {?} */
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(variables);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteShortDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    absoluteShortDateTime(date, options) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    absoluteLongDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    }
    /**
     * @param {?} date
     * @param {?=} options
     * @return {?}
     */
    absoluteLongDateTime(date, options) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    openedRangeDate(startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        let params = {};
        if (startDate) {
            /** @type {?} */
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            /** @type {?} */
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATE)(params);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    openedRangeDateTime(startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        let params = {};
        if (startDate) {
            /** @type {?} */
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            /** @type {?} */
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATETIME)(params);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    rangeDate(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        const sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        /** @type {?} */
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        const params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @param {?} template
     * @return {?}
     */
    rangeDateTime(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        /** @type {?} */
        const sameMonth = this.isSame('month', startDate, endDate);
        /** @type {?} */
        const sameDay = this.isSame('day', startDate, endDate);
        /** @type {?} */
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        /** @type {?} */
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        /** @type {?} */
        const params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    }
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    rangeShortDate(startDate, endDate) {
        /** @type {?} */
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
    }
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    rangeShortDateTime(startDate, endDate) {
        /** @type {?} */
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
    }
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    rangeLongDate(startDate, endDate) {
        /** @type {?} */
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    /**
     * @param {?} startDate
     * @param {?=} endDate
     * @return {?}
     */
    rangeLongDateTime(startDate, endDate) {
        /** @type {?} */
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    rangeMiddleDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.closedRange.middle);
    }
    /**
     * Creates a Moment instance while respecting the current UTC settings.
     * @private
     * @param {...?} args
     * @return {?}
     */
    createMoment(...args) {
        return (this.options && this.options.useUtc) ? moment.utc(...args) : moment(...args);
    }
    /**
     * @private
     * @param {?} date
     * @param {?} variables
     * @return {?}
     */
    compileVariables(date, variables) {
        /** @type {?} */
        const compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (const key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            /** @type {?} */
            const value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isCurrentYear(value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    }
    /**
     * @private
     * @param {?} unit
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    isSame(unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    }
    /**
     * @private
     * @param {?} locale
     * @return {?}
     */
    configureTranslator(locale) {
        this.messageformat = new MessageFormat(locale);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    findFormat(value) {
        if (!value) {
            return null;
        }
        // default test - iso
        /** @type {?} */
        const isoDate = this.createMoment(value, moment.ISO_8601, this.locale);
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
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithSpace(value) {
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
                throw new Error(`Locale ${this.locale} is not supported`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithSlash(value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD/MM/YYYY', this.locale);
            // todo do we use generalized locales? en vs en-US; until not we try to guess
            case 'en':
                // US vs UK
                /** @type {?} */
                const parts = value.split('/');
                /** @type {?} */
                const datePartsCount = 3;
                if (parts.length !== datePartsCount) {
                    return null;
                }
                /** @type {?} */
                const firstPart = parts[0].trim();
                /** @type {?} */
                const secondPart = parts[1].trim();
                if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                    return null;
                }
                /** @type {?} */
                const monthsInYears = 12;
                /** @type {?} */
                const canFirstBeMonth = +firstPart <= monthsInYears;
                /** @type {?} */
                const canSecondByMonth = +secondPart <= monthsInYears;
                // first two parts cannot be month
                if (!canFirstBeMonth && !canSecondByMonth) {
                    return null;
                }
                /** @type {?} */
                const canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                // use US format by default
                if (canDetermineWhereMonth) {
                    return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                }
                return canFirstBeMonth && !canSecondByMonth
                    ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                    : this.createMoment(value, 'DD/MM/YYYY', this.locale);
            default:
                throw new Error(`Locale ${this.locale} is not supported`);
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithDash(value) {
        // leading year vs finishing year
        /** @type {?} */
        const parts = value.split('-');
        if (parts[0].length === 0) {
            return null;
        }
        /** @type {?} */
        const maxDayOrMonthCharsCount = 2;
        return parts[0].length <= maxDayOrMonthCharsCount
            ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
            : this.createMoment(value, 'YYYY-MM-DD', this.locale);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    parseWithDot(value) {
        // covers two cases YYYY and YY (for current year)
        return this.createMoment(value, 'DD.MM.YYYY', this.locale);
    }
}
MomentDateAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MomentDateAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MC_DATE_LOCALE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MC_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljLW1vbWVudC1hZGFwdGVyL2FkYXB0ZXIvIiwic291cmNlcyI6WyJtb21lbnQtZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNILFdBQVcsRUFDWCxjQUFjLEVBS2pCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxLQUFLLGFBQWEsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSy9DLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7QUFHbEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxhQUFhLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFHMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7TUFJakMsTUFBTSxHQUFHLGFBQWEsSUFBSSxPQUFPOzs7OztBQUd2QyxpREFXQzs7Ozs7OztJQU5HLDZDQUFnQjs7Ozs7O0lBS2hCLHFEQUF3Qjs7Ozs7O0FBSTVCLE1BQU0sT0FBTyw4QkFBOEIsR0FBRyxJQUFJLGNBQWMsQ0FDNUQsZ0NBQWdDLEVBQUU7SUFDOUIsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHNDQUFzQztDQUNsRCxDQUFDOzs7Ozs7QUFJTixNQUFNLFVBQVUsc0NBQXNDO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLGNBQWMsRUFBRSxLQUFLO0tBQ3hCLENBQUM7QUFDTixDQUFDOzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7VUFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFN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UUFBUSxZQUFJLE1BQU0sU0FBQyw4QkFBOEI7Ozs7Ozs7SUF0QnRELDBDQUFxQzs7Ozs7SUFFckMsaURBQStEOzs7OztJQUUvRCw0Q0FBMEM7Ozs7O0lBTTFDLHVDQVFFOzs7OztJQUlFLG9DQUEwRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGVBZGFwdGVyLFxuICAgIE1DX0RBVEVfTE9DQUxFLFxuICAgIElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlLFxuICAgIElBYnNvbHV0ZURhdGVUaW1lT3B0aW9uc1xufSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0ICogYXMgTWVzc2FnZUZvcm1hdCBmcm9tICdtZXNzYWdlZm9ybWF0Jztcbi8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHJvbGx1cCBpcyB1c2VkLCBtb21lbnQgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgZGlmZmVyZW50bHkuXG4vLyBTaW5jZSBNb21lbnQuanMgZG9lc24ndCBoYXZlIGEgZGVmYXVsdCBleHBvcnQsIHdlIG5vcm1hbGx5IG5lZWQgdG8gaW1wb3J0IHVzaW5nIHRoZSBgKiBhc2Bcbi8vIHN5bnRheC4gSG93ZXZlciwgcm9sbHVwIGNyZWF0ZXMgYSBzeW50aGV0aWMgZGVmYXVsdCBtb2R1bGUgYW5kIHdlIHRodXMgbmVlZCB0byBpbXBvcnQgaXQgdXNpbmdcbi8vIHRoZSBgZGVmYXVsdCBhc2Agc3ludGF4LlxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tZHVwbGljYXRlLWltcG9ydHNcbi8vIEB0cy1pZ25vcmUgKGxvb2sgYXQgdHNjb25maWcpXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9yb2xsdXBNb21lbnQsIE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgeyB1bml0T2ZUaW1lIH0gZnJvbSAnbW9tZW50JztcblxuaW1wb3J0IHsgZW5VUyB9IGZyb20gJy4vbG9jYWxlcy9lbi1VUyc7XG5pbXBvcnQgeyBydVJVIH0gZnJvbSAnLi9sb2NhbGVzL3J1LVJVJztcbmltcG9ydCB7IElGb3JtYXR0ZXJDb25maWcgfSBmcm9tICcuL2xvY2FsZXMvSUZvcm1hdHRlckNvbmZpZyc7XG5cblxuY29uc3QgbW9tZW50ID0gX3JvbGx1cE1vbWVudCB8fCBfbW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiB3aGV0aGVyIHNob3VsZCBwYXJzZSBtZXRob2QgdHJ5IGd1ZXNzIGRhdGUgZm9ybWF0XG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIGZpbmREYXRlRm9ybWF0OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucz4oXG4gICAgJ01DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2UsXG4gICAgICAgIGZpbmREYXRlRm9ybWF0OiBmYWxzZVxuICAgIH07XG59XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBwcml2YXRlIG1lc3NhZ2Vmb3JtYXQ6IE1lc3NhZ2VGb3JtYXQ7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWREYXRlRXJyb3JUZXh0OiBzdHJpbmcgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIHByaXZhdGUgZm9ybWF0dGVyQ29uZmlnOiBJRm9ybWF0dGVyQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSBnZXQgbW9tZW50V2l0aExvY2FsZSgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2FsZURhdGE6IHtcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcbiAgICAgICAgbG9uZ01vbnRoczogc3RyaW5nW107XG4gICAgICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgZGF0ZXM6IHN0cmluZ1tdO1xuICAgICAgICBsb25nRGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIHNob3J0RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0xPQ0FMRSkgZGF0ZUxvY2FsZTogc3RyaW5nLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUykgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zPzogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJlVHJhbnNsYXRvcih0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIGxldCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcblxuICAgICAgICAvLyBUaGlzIGlzIG91ciBjdXN0b21zIHRyYW5zbGF0aW9uc1xuICAgICAgICBjb25zdCBpMThuTG9jYWxzID0gWydlbicsICdydSddO1xuXG4gICAgICAgIGlmIChpMThuTG9jYWxzLmluZGV4T2YobG9jYWxlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyQ29uZmlnID0gbG9jYWxlID09PSAnZW4nID8gZW5VUyA6IHJ1UlU7XG5cbiAgICAgICAgICAgIG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQudXBkYXRlTG9jYWxlKGxvY2FsZSwge1xuICAgICAgICAgICAgICAgIG1vbnRoc1Nob3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXR0ZXJDb25maWcubW9udGhOYW1lcy5zaG9ydC5mb3JtYXR0ZWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kYWxvbmU6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2Vla2RheXNTaG9ydDogdGhpcy5mb3JtYXR0ZXJDb25maWcuZGF5T2ZXZWVrTmFtZXMuc2hvcnQsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLmRheU9mV2Vla05hbWVzLmxvbmdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgZmlyc3REYXlPZldlZWs6IG1vbWVudExvY2FsZURhdGEuZmlyc3REYXlPZldlZWsoKSxcbiAgICAgICAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICAgICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgICAgICAgZGF0ZXM6IHJhbmdlKDMxLCAoaSkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoJ0QnKSksXG4gICAgICAgICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgICAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldExvY2FsZURhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGE7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlRGF0YShsb2NhbGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IGxvY2FsZURhdGE7XG4gICAgfVxuXG4gICAgdXBkYXRlTG9jYWxlRGF0YShsb2NhbGVEYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHsgLi4udGhpcy5sb2NhbGVEYXRhLCAuLi5sb2NhbGVEYXRhIH07XG4gICAgfVxuXG4gICAgZ2V0WWVhcihkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS55ZWFyKCk7XG4gICAgfVxuXG4gICAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTtcbiAgICB9XG5cbiAgICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTtcbiAgICB9XG5cbiAgICBnZXRIb3VycyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5ob3VycygpO1xuICAgIH1cblxuICAgIGdldE1pbnV0ZXMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWludXRlcygpO1xuICAgIH1cblxuICAgIGdldFNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcygpO1xuICAgIH1cblxuICAgIGdldE1pbGxpc2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taWxsaXNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBnZXRUaW1lKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLnZhbHVlT2YoKTtcbiAgICB9XG5cbiAgICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5KCk7XG4gICAgfVxuXG4gICAgZ2V0TW9udGhOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICAvLyBNb21lbnQuanMgZG9lc24ndCBzdXBwb3J0IG5hcnJvdyBtb250aCBuYW1lc1xuICAgICAgICByZXR1cm4gc3R5bGUgPT09ICdsb25nJyA/IHRoaXMubG9jYWxlRGF0YS5sb25nTW9udGhzIDogdGhpcy5sb2NhbGVEYXRhLnNob3J0TW9udGhzO1xuICAgIH1cblxuICAgIGdldERhdGVOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEuZGF0ZXM7XG4gICAgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgaWYgKHN0eWxlID09PSAnbG9uZycpIHsgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5sb25nRGF5c09mV2VlazsgfVxuXG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3Nob3J0JykgeyByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlazsgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEubmFycm93RGF5c09mV2VlaztcbiAgICB9XG5cbiAgICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoJ1lZWVknKTtcbiAgICB9XG5cbiAgICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cblxuICAgIGdldE51bURheXNJbk1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheXNJbk1vbnRoKCk7XG4gICAgfVxuXG4gICAgY2xvbmUoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXG4gICAgICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZWFjaCBjYXNlIHNvIHdlIGNhbiB0aHJvdyBtb3JlIGRlc2NyaXB0aXZlIGVycm9ycy5cbiAgICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlTW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgIHllYXI6IG51bWJlcixcbiAgICAgICAgbW9udGg6IG51bWJlcixcbiAgICAgICAgZGF0ZTogbnVtYmVyLFxuICAgICAgICBob3VyczogbnVtYmVyLFxuICAgICAgICBtaW51dGVzOiBudW1iZXIsXG4gICAgICAgIHNlY29uZHM6IG51bWJlcixcbiAgICAgICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICApOiBNb21lbnQge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcblxuICAgICAgICBuZXdEYXRlLmhvdXJzKGhvdXJzKTtcbiAgICAgICAgbmV3RGF0ZS5taW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICBuZXdEYXRlLnNlY29uZHMoc2Vjb25kcyk7XG4gICAgICAgIG5ld0RhdGUubWlsbGlzZWNvbmRzKG1pbGxpc2Vjb25kcyk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0RhdGU7XG4gICAgfVxuXG4gICAgdG9kYXkoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nIHwgc3RyaW5nW10pOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpbmREYXRlRm9ybWF0KSB7IHJldHVybiB0aGlzLmZpbmRGb3JtYXQodmFsdWUpOyB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JtYXQoZGF0ZTogTW9tZW50LCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlLmZvcm1hdChkaXNwbGF5Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IHllYXJzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtb250aHMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgZGF5cyB9KTtcbiAgICB9XG5cbiAgICB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuXG4gICAgLyoqIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gTm90ZTogYXNzdW1lcyB0aGF0IGNsb25pbmcgYWxzbyBzZXRzIHRoZSBjb3JyZWN0IGxvY2FsZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KGRhdGUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIH1cblxuICAgIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgaW52YWxpZCgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcbiAgICB9XG5cbiAgICByZWxhdGl2ZURhdGUoZGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgY29uc3Qgbm93ID0gdGhpcy5tb21lbnRXaXRoTG9jYWxlO1xuXG4gICAgICAgIGNvbnN0IHRvdGFsU2Vjb25kcyA9IG5vdy5kaWZmKGRhdGUsICdzZWNvbmRzJyk7XG4gICAgICAgIGNvbnN0IHRvdGFsTWludXRlcyA9IG5vdy5kaWZmKGRhdGUsICdtaW51dGVzJyk7XG5cbiAgICAgICAgY29uc3QgaXNUb2RheSA9IG5vdy5pc1NhbWUoZGF0ZSwgJ2RheScpO1xuICAgICAgICBjb25zdCBpc1llc3RlcmRheSA9IG5vdy5hZGQoLTEsICdkYXlzJykuaXNTYW1lKGRhdGUsICdkYXknKTtcblxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVZhcmlhYmxlcyA9IHsuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlc307XG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhkYXRlLCB0ZW1wbGF0ZVZhcmlhYmxlcyk7XG4gICAgICAgIGxldCBuZXdUZW1wbGF0ZTtcblxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDw9IDU5KSB7IC8vIHNlY29uZHMgYWdvXG4gICAgICAgICAgICB2YXJpYWJsZXMuU0VDT05EU19QQVNTRUQgPSB0b3RhbFNlY29uZHM7XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLlNFQ09ORFNfQUdPO1xuXG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxNaW51dGVzIDw9IDU5KSB7IC8vIG1pbnV0ZXMgYWdvXG4gICAgICAgICAgICB2YXJpYWJsZXMuTUlOVVRFU19QQVNTRUQgPSB0b3RhbE1pbnV0ZXM7XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLk1JTlVURVNfQUdPO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNUb2RheSkgeyAvLyB0b2RheVxuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5UT0RBWTtcblxuICAgICAgICB9IGVsc2UgaWYgKGlzWWVzdGVyZGF5KSB7IC8vIHllc3RlcmRheVxuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5ZRVNURVJEQVk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gYmVmb3JlIHllc3RlcmRheVxuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5CRUZPUkVfWUVTVEVSREFZO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKG5ld1RlbXBsYXRlKSh2YXJpYWJsZXMpO1xuICAgIH1cblxuICAgIHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aXZlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5yZWxhdGl2ZVRlbXBsYXRlcy5zaG9ydCk7XG4gICAgfVxuXG4gICAgcmVsYXRpdmVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcucmVsYXRpdmVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVEYXRlKFxuICAgICAgICBkYXRlOiBNb21lbnQsXG4gICAgICAgIHBhcmFtczogSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUsXG4gICAgICAgIGRhdGV0aW1lID0gZmFsc2UsXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IGZhbHNlLFxuICAgICAgICBtaWNyb3NlY29uZHMgPSBmYWxzZVxuICAgICk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgeyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnBhcmFtcy52YXJpYWJsZXMgfSk7XG5cbiAgICAgICAgdmFyaWFibGVzLlNIT1dfTUlMTElTRUNPTkRTID0gbWlsbGlzZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuICAgICAgICB2YXJpYWJsZXMuU0hPV19NSUNST1NFQ09ORFMgPSBtaWNyb3NlY29uZHMgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBkYXRldGltZSA/IHBhcmFtcy5EQVRFVElNRSA6IHBhcmFtcy5EQVRFO1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIGFic29sdXRlU2hvcnREYXRlVGltZShkYXRlOiBNb21lbnQsIG9wdGlvbnM/OiBJQWJzb2x1dGVEYXRlVGltZU9wdGlvbnMpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoXG4gICAgICAgICAgICBkYXRlLFxuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWljcm9zZWNvbmRzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMubG9uZyk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPzogSUFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWlsbGlzZWNvbmRzLFxuICAgICAgICAgICAgb3B0aW9ucz8ubWljcm9zZWNvbmRzXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZTogTW9tZW50IHwgbnVsbCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KHN0YXJ0RGF0ZSkgJiYgIW1vbWVudC5pc01vbWVudChlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFKShwYXJhbXMpO1xuICAgIH1cblxuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlOiBNb21lbnQgfCBudWxsLCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQoc3RhcnREYXRlKSAmJiAhbW9tZW50LmlzTW9tZW50KGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPSBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJiBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcyc7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICAgICAgY29uc3Qgc2FtZURheSA9IHRoaXMuaXNTYW1lKCdkYXknLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPSBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJiBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcyc7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHsuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURVRJTUUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGgsXG4gICAgICAgICAgICBTQU1FX0RBWTogc2FtZURheX07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEVUSU1FKShwYXJhbXMpO1xuICAgIH1cblxuICAgIHJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5zaG9ydCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLnNob3J0KTtcbiAgICB9XG5cbiAgICByYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5zaG9ydCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5zaG9ydCk7XG4gICAgfVxuXG4gICAgcmFuZ2VMb25nRGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2UubG9uZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLmxvbmcpO1xuICAgIH1cblxuICAgIHJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2UubG9uZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICByYW5nZU1pZGRsZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2UubWlkZGxlKTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlcyBhIE1vbWVudCBpbnN0YW5jZSB3aGlsZSByZXNwZWN0aW5nIHRoZSBjdXJyZW50IFVUQyBzZXR0aW5ncy4gKi9cbiAgICBwcml2YXRlIGNyZWF0ZU1vbWVudCguLi5hcmdzOiBhbnlbXSk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy51c2VVdGMpID8gbW9tZW50LnV0YyguLi5hcmdzKSA6IG1vbWVudCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbXBpbGVWYXJpYWJsZXMoZGF0ZTogTW9tZW50LCB2YXJpYWJsZXM6IGFueSk6IGFueSB7XG4gICAgICAgIGNvbnN0IGNvbXBpbGVkVmFyaWFibGVzOiBhbnkgPSB7fTtcblxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZm9yLWluXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhcmlhYmxlcykge1xuICAgICAgICAgICAgaWYgKCF2YXJpYWJsZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhcmlhYmxlc1trZXldO1xuICAgICAgICAgICAgY29tcGlsZWRWYXJpYWJsZXNba2V5XSA9IGRhdGUuZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBpbGVkVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IHRoaXMuaXNDdXJyZW50WWVhcihkYXRlKTtcblxuICAgICAgICByZXR1cm4gY29tcGlsZWRWYXJpYWJsZXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc0N1cnJlbnRZZWFyKHZhbHVlOiBNb21lbnQpOiAneWVzJyB8ICdubycge1xuICAgICAgICByZXR1cm4gdGhpcy5tb21lbnRXaXRoTG9jYWxlLmlzU2FtZSh2YWx1ZSwgJ3llYXInKSA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzU2FtZSh1bml0OiB1bml0T2ZUaW1lLlN0YXJ0T2YsIHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc3RhcnREYXRlLmlzU2FtZShlbmREYXRlLCB1bml0KSA/ICd5ZXMnIDogJ25vJztcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbmZpZ3VyZVRyYW5zbGF0b3IobG9jYWxlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlZm9ybWF0ID0gbmV3IE1lc3NhZ2VGb3JtYXQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRGb3JtYXQodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0ZXN0IC0gaXNvXG4gICAgICAgIGNvbnN0IGlzb0RhdGUgPSAgdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIGlmIChpc29EYXRlLmlzVmFsaWQoKSkgeyByZXR1cm4gaXNvRGF0ZTsgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHVuaXggdGltZSBzZWNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1gnLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb25nIG1vbnRocyBuYW1pbmc6IEQgTU1NIFlZWVksIE1NTSBEbyBZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC9eXFxkezEsMn1cXHNcXFMrXFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpIHx8XG4gICAgICAgICAgICAvXlxcUytcXHNcXGR7MSwyfVthLXpdezJ9XFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU3BhY2UodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xhc2ggbm90YXRpb246IEREL01NL1lZWVksIE1NL0REL1lZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC9eXFxkezEsMn1cXC9cXGR7MSwyfVxcLyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhTbGFzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkYXNoIG5vdGF0aW9uOiBERC1NTS1ZWVlZLCBZWVlZLURELU1NIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvKF4oXFxkezEsMn18XFxkezR9KS1cXGR7MSwyfS1cXGR7MSwyfSQpfCheXFxkezEsMn0tXFxkezEsMn0tKFxcZHsyfXxcXGR7NH0pJCkvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG90IG5vdGF0aW9uOiBERC5NTS5ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwuXFxkezEsMn1cXC4oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoRG90KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU3BhY2UodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQgTU1NTSBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIDE2IEZlYiAyMDE5IHZzIEZlYiAxNnRoIDIwMTksIGNvdmVycyBGZWIgYW5kIEZlYnJ1YXJ5IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHZhbHVlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdEIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTU1NIERvIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU2xhc2godmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIC8vIHRvZG8gZG8gd2UgdXNlIGdlbmVyYWxpemVkIGxvY2FsZXM/IGVuIHZzIGVuLVVTOyB1bnRpbCBub3Qgd2UgdHJ5IHRvIGd1ZXNzXG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgLy8gVVMgdnMgVUtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzQ291bnQgPSAzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IGRhdGVQYXJ0c0NvdW50KSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBhcnQgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUGFydCA9IHBhcnRzWzFdLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyaWMoZmlyc3RQYXJ0KSB8fCAhdGhpcy5pc051bWVyaWMoc2Vjb25kUGFydCkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoc0luWWVhcnMgPSAxMjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkZpcnN0QmVNb250aCA9ICtmaXJzdFBhcnQgPD0gbW9udGhzSW5ZZWFycztcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5TZWNvbmRCeU1vbnRoID0gK3NlY29uZFBhcnQgPD0gbW9udGhzSW5ZZWFycztcblxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHR3byBwYXJ0cyBjYW5ub3QgYmUgbW9udGhcbiAgICAgICAgICAgICAgICBpZiAoIWNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRGV0ZXJtaW5lV2hlcmVNb250aCA9IGNhbkZpcnN0QmVNb250aCAmJiBjYW5TZWNvbmRCeU1vbnRoO1xuXG4gICAgICAgICAgICAgICAgLy8gdXNlIFVTIGZvcm1hdCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgaWYgKGNhbkRldGVybWluZVdoZXJlTW9udGgpIHsgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKTsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGUgJHt0aGlzLmxvY2FsZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gbGVhZGluZyB5ZWFyIHZzIGZpbmlzaGluZyB5ZWFyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgaWYgKHBhcnRzWzBdLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IG1heERheU9yTW9udGhDaGFyc0NvdW50ID0gMjtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0ubGVuZ3RoIDw9IG1heERheU9yTW9udGhDaGFyc0NvdW50XG4gICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQtTU0tWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1lZWVktTU0tREQnLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEb3QodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICAvLyBjb3ZlcnMgdHdvIGNhc2VzIFlZWVkgYW5kIFlZIChmb3IgY3VycmVudCB5ZWFyKVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC5NTS5ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cbn1cbiJdfQ==