/**
 * @fileoverview added by tsickle
 * Generated from: moment-date-adapter.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @return {?}
     */
    absoluteDate(date, params, datetime = false) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        /** @type {?} */
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), params.variables);
        /** @type {?} */
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
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
     * @return {?}
     */
    absoluteShortDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
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
     * @return {?}
     */
    absoluteLongDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
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
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' &&
            endDateVariables.CURRENT_YEAR === 'yes';
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
                if (canDetermineWhereMonth) {
                    // use US format by default
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwdHNlY3VyaXR5L21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyLyIsInNvdXJjZXMiOlsibW9tZW50LWRhdGUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUlqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sS0FBSyxhQUFhLE1BQU0sZUFBZSxDQUFDOzs7OztBQUsvQyxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7O0FBR2xDLE9BQU8sRUFBRSxPQUFPLElBQUksYUFBYSxFQUFVLE1BQU0sUUFBUSxDQUFDO0FBRzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O01BSWpDLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTzs7Ozs7QUFHdkMsaURBV0M7Ozs7Ozs7SUFORyw2Q0FBZ0I7Ozs7OztJQUtoQixxREFBd0I7Ozs7OztBQUk1QixNQUFNLE9BQU8sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQzVELGdDQUFnQyxFQUFFO0lBQzlCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxzQ0FBc0M7Q0FDbEQsQ0FBQzs7Ozs7O0FBSU4sTUFBTSxVQUFVLHNDQUFzQztJQUNsRCxPQUFPO1FBQ0gsTUFBTSxFQUFFLEtBQUs7UUFDYixjQUFjLEVBQUUsS0FBSztLQUN4QixDQUFDO0FBQ04sQ0FBQzs7Ozs7Ozs7QUFHRCxTQUFTLEtBQUssQ0FBSSxNQUFjLEVBQUUsYUFBbUM7O1VBQzNELFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBRWpDLEtB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LENBQUM7WUFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWE7UUFDOUIsa0RBQWtEO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUF2b0JKLFVBQVU7Ozs7eUNBd0JGLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs0Q0FDakMsUUFBUSxZQUFJLE1BQU0sU0FBQyw4QkFBOEI7Ozs7Ozs7SUF0QnRELDBDQUFxQzs7Ozs7SUFFckMsaURBQStEOzs7OztJQUUvRCw0Q0FBMEM7Ozs7O0lBTTFDLHVDQVFFOzs7OztJQUlFLG9DQUM2QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW1hZ2ljLW51bWJlcnNcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERhdGVBZGFwdGVyLFxuICAgIE1DX0RBVEVfTE9DQUxFLFxuICAgIElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlLFxuICAgIElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlXG59IGZyb20gJ0BwdHNlY3VyaXR5L2Nkay9kYXRldGltZSc7XG5pbXBvcnQgKiBhcyBNZXNzYWdlRm9ybWF0IGZyb20gJ21lc3NhZ2Vmb3JtYXQnO1xuLy8gRGVwZW5kaW5nIG9uIHdoZXRoZXIgcm9sbHVwIGlzIHVzZWQsIG1vbWVudCBuZWVkcyB0byBiZSBpbXBvcnRlZCBkaWZmZXJlbnRseS5cbi8vIFNpbmNlIE1vbWVudC5qcyBkb2Vzbid0IGhhdmUgYSBkZWZhdWx0IGV4cG9ydCwgd2Ugbm9ybWFsbHkgbmVlZCB0byBpbXBvcnQgdXNpbmcgdGhlIGAqIGFzYFxuLy8gc3ludGF4LiBIb3dldmVyLCByb2xsdXAgY3JlYXRlcyBhIHN5bnRoZXRpYyBkZWZhdWx0IG1vZHVsZSBhbmQgd2UgdGh1cyBuZWVkIHRvIGltcG9ydCBpdCB1c2luZ1xuLy8gdGhlIGBkZWZhdWx0IGFzYCBzeW50YXguXG5pbXBvcnQgKiBhcyBfbW9tZW50IGZyb20gJ21vbWVudCc7XG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1kdXBsaWNhdGUtaW1wb3J0c1xuLy8gQHRzLWlnbm9yZSAobG9vayBhdCB0c2NvbmZpZylcbmltcG9ydCB7IGRlZmF1bHQgYXMgX3JvbGx1cE1vbWVudCwgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHVuaXRPZlRpbWUgfSBmcm9tICdtb21lbnQnO1xuXG5pbXBvcnQgeyBlblVTIH0gZnJvbSAnLi9sb2NhbGVzL2VuLVVTJztcbmltcG9ydCB7IHJ1UlUgfSBmcm9tICcuL2xvY2FsZXMvcnUtUlUnO1xuaW1wb3J0IHsgSUZvcm1hdHRlckNvbmZpZyB9IGZyb20gJy4vbG9jYWxlcy9JRm9ybWF0dGVyQ29uZmlnJztcblxuXG5jb25zdCBtb21lbnQgPSBfcm9sbHVwTW9tZW50IHx8IF9tb21lbnQ7XG5cbi8qKiBDb25maWd1cmFibGUgb3B0aW9ucyBmb3Ige0BzZWUgTW9tZW50RGF0ZUFkYXB0ZXJ9LiAqL1xuZXhwb3J0IGludGVyZmFjZSBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIC8qKlxuICAgICAqIFR1cm5zIHRoZSB1c2Ugb2YgdXRjIGRhdGVzIG9uIG9yIG9mZi5cbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgdXNlVXRjOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIHdoZXRoZXIgc2hvdWxkIHBhcnNlIG1ldGhvZCB0cnkgZ3Vlc3MgZGF0ZSBmb3JtYXRcbiAgICAgKiB7QGRlZmF1bHQgZmFsc2V9XG4gICAgICovXG4gICAgZmluZERhdGVGb3JtYXQ6IGJvb2xlYW47XG59XG5cbi8qKiBJbmplY3Rpb25Ub2tlbiBmb3IgbW9tZW50IGRhdGUgYWRhcHRlciB0byBjb25maWd1cmUgb3B0aW9ucy4gKi9cbmV4cG9ydCBjb25zdCBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48SU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zPihcbiAgICAnTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TJywge1xuICAgICAgICBwcm92aWRlZEluOiAncm9vdCcsXG4gICAgICAgIGZhY3Rvcnk6IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZXG4gICAgfSk7XG5cbi8qKiBAZG9jcy1wcml2YXRlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGZ1bmN0aW9uIE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OU19GQUNUT1JZKCk6IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlVXRjOiBmYWxzZSxcbiAgICAgICAgZmluZERhdGVGb3JtYXQ6IGZhbHNlXG4gICAgfTtcbn1cblxuLyoqIENyZWF0ZXMgYW4gYXJyYXkgYW5kIGZpbGxzIGl0IHdpdGggdmFsdWVzLiAqL1xuZnVuY3Rpb24gcmFuZ2U8VD4obGVuZ3RoOiBudW1iZXIsIHZhbHVlRnVuY3Rpb246IChpbmRleDogbnVtYmVyKSA9PiBUKTogVFtdIHtcbiAgICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlc0FycmF5W2ldID0gdmFsdWVGdW5jdGlvbihpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzQXJyYXk7XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb21lbnREYXRlQWRhcHRlciBleHRlbmRzIERhdGVBZGFwdGVyPE1vbWVudD4ge1xuXG4gICAgcHJpdmF0ZSBtZXNzYWdlZm9ybWF0OiBNZXNzYWdlRm9ybWF0O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkRGF0ZUVycm9yVGV4dDogc3RyaW5nID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBwcml2YXRlIGZvcm1hdHRlckNvbmZpZzogSUZvcm1hdHRlckNvbmZpZztcblxuICAgIHByaXZhdGUgZ2V0IG1vbWVudFdpdGhMb2NhbGUoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbGVEYXRhOiB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICAgICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMpXG4gICAgICAgIHByaXZhdGUgb3B0aW9ucz86IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRyYW5zbGF0b3IodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlckNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXG4gICAgICAgICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTtcbiAgICB9XG5cbiAgICBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpO1xuICAgIH1cblxuICAgIGdldERhdGUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF0ZSgpO1xuICAgIH1cblxuICAgIGdldEhvdXJzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKCk7XG4gICAgfVxuXG4gICAgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7XG4gICAgfVxuXG4gICAgZ2V0U2Vjb25kcyhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5zZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbGxpc2Vjb25kcygpO1xuICAgIH1cblxuICAgIGdldFRpbWUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUudmFsdWVPZigpO1xuICAgIH1cblxuICAgIGdldERheU9mV2VlayhkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXkoKTtcbiAgICB9XG5cbiAgICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIC8vIE1vbWVudC5qcyBkb2Vzbid0IHN1cHBvcnQgbmFycm93IG1vbnRoIG5hbWVzXG4gICAgICAgIHJldHVybiBzdHlsZSA9PT0gJ2xvbmcnID8gdGhpcy5sb2NhbGVEYXRhLmxvbmdNb250aHMgOiB0aGlzLmxvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoc3R5bGUgPT09ICdsb25nJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5sb25nRGF5c09mV2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ3Nob3J0Jykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgICAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZU1vbWVudCh7eWVhciwgbW9udGgsIGRhdGV9KS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlciwgaG91cnM6IG51bWJlciwgbWludXRlczogbnVtYmVyLCBzZWNvbmRzOiBudW1iZXIsIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogTW9tZW50IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgICAgbmV3RGF0ZS5ob3Vycyhob3Vycyk7XG4gICAgICAgIG5ld0RhdGUubWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgbmV3RGF0ZS5zZWNvbmRzKHNlY29uZHMpO1xuICAgICAgICBuZXdEYXRlLm1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBuZXdEYXRlO1xuICAgIH1cblxuICAgIHRvZGF5KCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maW5kRGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JtYXQoZGF0ZTogTW9tZW50LCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlLmZvcm1hdChkaXNwbGF5Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IHllYXJzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtb250aHMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgZGF5cyB9KTtcbiAgICB9XG5cbiAgICB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuXG4gICAgLyoqIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gTm90ZTogYXNzdW1lcyB0aGF0IGNsb25pbmcgYWxzbyBzZXRzIHRoZSBjb3JyZWN0IGxvY2FsZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGUgJiYgdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoZGF0ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBlci5kZXNlcmlhbGl6ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaXNEYXRlSW5zdGFuY2Uob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pc01vbWVudChvYmopO1xuICAgIH1cblxuICAgIGlzVmFsaWQoZGF0ZTogTW9tZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmlzVmFsaWQoKTtcbiAgICB9XG5cbiAgICBpbnZhbGlkKCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaW52YWxpZCgpO1xuICAgIH1cblxuICAgIHJlbGF0aXZlRGF0ZShkYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc0RhdGVJbnN0YW5jZShkYXRlKSkgeyB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7IH1cblxuICAgICAgICBjb25zdCBub3cgPSB0aGlzLm1vbWVudFdpdGhMb2NhbGU7XG5cbiAgICAgICAgY29uc3QgdG90YWxTZWNvbmRzID0gbm93LmRpZmYoZGF0ZSwgJ3NlY29uZHMnKTtcbiAgICAgICAgY29uc3QgdG90YWxNaW51dGVzID0gbm93LmRpZmYoZGF0ZSwgJ21pbnV0ZXMnKTtcblxuICAgICAgICBjb25zdCBpc1RvZGF5ID0gbm93LmlzU2FtZShkYXRlLCAnZGF5Jyk7XG4gICAgICAgIGNvbnN0IGlzWWVzdGVyZGF5ID0gbm93LmFkZCgtMSwgJ2RheXMnKS5pc1NhbWUoZGF0ZSwgJ2RheScpO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlVmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGRhdGUsIHRlbXBsYXRlVmFyaWFibGVzKTtcbiAgICAgICAgbGV0IG5ld1RlbXBsYXRlO1xuXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPD0gNTkpIHsgLy8gc2Vjb25kcyBhZ29cbiAgICAgICAgICAgIHZhcmlhYmxlcy5TRUNPTkRTX1BBU1NFRCA9IHRvdGFsU2Vjb25kcztcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuU0VDT05EU19BR087XG5cbiAgICAgICAgfSBlbHNlIGlmICh0b3RhbE1pbnV0ZXMgPD0gNTkpIHsgLy8gbWludXRlcyBhZ29cbiAgICAgICAgICAgIHZhcmlhYmxlcy5NSU5VVEVTX1BBU1NFRCA9IHRvdGFsTWludXRlcztcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuTUlOVVRFU19BR087XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1RvZGF5KSB7IC8vIHRvZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLlRPREFZO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNZZXN0ZXJkYXkpIHsgLy8geWVzdGVyZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLllFU1RFUkRBWTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBiZWZvcmUgeWVzdGVyZGF5XG4gICAgICAgICAgICBuZXdUZW1wbGF0ZSA9IHRlbXBsYXRlLkJFRk9SRV9ZRVNURVJEQVk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUobmV3VGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgcmVsYXRpdmVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbGF0aXZlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5yZWxhdGl2ZVRlbXBsYXRlcy5sb25nKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZURhdGUoZGF0ZTogTW9tZW50LCBwYXJhbXM6IElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlLCBkYXRldGltZSA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnBhcmFtcy52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGRhdGV0aW1lID8gcGFyYW1zLkRBVEVUSU1FIDogcGFyYW1zLkRBVEU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlKSh0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgdmFyaWFibGVzKSk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0LCB0cnVlKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZUxvbmdEYXRlVGltZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMubG9uZywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgb3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZTogTW9tZW50IHwgbnVsbCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KHN0YXJ0RGF0ZSkgJiYgIW1vbWVudC5pc01vbWVudChlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFKShwYXJhbXMpO1xuICAgIH1cblxuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlOiBNb21lbnQgfCBudWxsLCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQoc3RhcnREYXRlKSAmJiAhbW9tZW50LmlzTW9tZW50KGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5RW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPSBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJiBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcyc7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBFTkRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzfTtcbiAgICAgICAgY29uc3Qgc2FtZU1vbnRoID0gdGhpcy5pc1NhbWUoJ21vbnRoJywgc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICAgICAgY29uc3Qgc2FtZURheSA9IHRoaXMuaXNTYW1lKCdkYXknLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBib3RoQ3VycmVudFllYXIgPVxuICAgICAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiZcbiAgICAgICAgICAgIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gey4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgIFNUQVJUX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFVElNRSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIEVORF9EQVRFVElNRTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEVUSU1FKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIFNBTUVfTU9OVEg6IHNhbWVNb250aCxcbiAgICAgICAgICAgIFNBTUVfREFZOiBzYW1lRGF5fTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURVRJTUUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLnNob3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLnNob3J0KTtcbiAgICB9XG5cbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2UubG9uZyk7XG4gICAgfVxuXG4gICAgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCByYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5sb25nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlIHx8IG51bGwsIHJhbmdlVGVtcGxhdGVzLm9wZW5lZFJhbmdlLmxvbmcpO1xuICAgIH1cblxuICAgIHJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcy5jbG9zZWRSYW5nZS5taWRkbGUpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9tZW50KC4uLmFyZ3M6IGFueVtdKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnVzZVV0YykgPyBtb21lbnQudXRjKC4uLmFyZ3MpIDogbW9tZW50KC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29tcGlsZVZhcmlhYmxlcyhkYXRlOiBNb21lbnQsIHZhcmlhYmxlczogYW55KTogYW55IHtcbiAgICAgICAgY29uc3QgY29tcGlsZWRWYXJpYWJsZXM6IGFueSA9IHt9O1xuXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1mb3ItaW5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFyaWFibGVzKSB7XG4gICAgICAgICAgICBpZiAoIXZhcmlhYmxlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFyaWFibGVzW2tleV07XG4gICAgICAgICAgICBjb21waWxlZFZhcmlhYmxlc1trZXldID0gZGF0ZS5mb3JtYXQodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29tcGlsZWRWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gdGhpcy5pc0N1cnJlbnRZZWFyKGRhdGUpO1xuXG4gICAgICAgIHJldHVybiBjb21waWxlZFZhcmlhYmxlcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzQ3VycmVudFllYXIodmFsdWU6IE1vbWVudCk6ICd5ZXMnIHwgJ25vJyB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vbWVudFdpdGhMb2NhbGUuaXNTYW1lKHZhbHVlLCAneWVhcicpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNTYW1lKHVuaXQ6IHVuaXRPZlRpbWUuU3RhcnRPZiwgc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdGFydERhdGUuaXNTYW1lKGVuZERhdGUsIHVuaXQpID8gJ3llcycgOiAnbm8nO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29uZmlndXJlVHJhbnNsYXRvcihsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lc3NhZ2Vmb3JtYXQgPSBuZXcgTWVzc2FnZUZvcm1hdChsb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEZvcm1hdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0ZXN0IC0gaXNvXG4gICAgICAgIGNvbnN0IGlzb0RhdGUgPSAgdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIGlmIChpc29EYXRlLmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzb0RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAvLyB1bml4IHRpbWUgc2VjXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdYJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9uZyBtb250aHMgbmFtaW5nOiBEIE1NTSBZWVlZLCBNTU0gRG8gWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvXlxcZHsxLDJ9XFxzXFxTK1xccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKSB8fFxuICAgICAgICAgICAgL15cXFMrXFxzXFxkezEsMn1bYS16XXsyfVxccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsYXNoIG5vdGF0aW9uOiBERC9NTS9ZWVlZLCBNTS9ERC9ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwvXFxkezEsMn1cXC8oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU2xhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzaCBub3RhdGlvbjogREQtTU0tWVlZWSwgWVlZWS1ERC1NTSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoLyheKFxcZHsxLDJ9fFxcZHs0fSktXFxkezEsMn0tXFxkezEsMn0kKXwoXlxcZHsxLDJ9LVxcZHsxLDJ9LShcXGR7Mn18XFxkezR9KSQpLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvdCBub3RhdGlvbjogREQuTU0uWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcLlxcZHsxLDJ9XFwuKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERvdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNwYWNlKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyAxNiBGZWIgMjAxOSB2cyBGZWIgMTZ0aCAyMDE5LCBjb3ZlcnMgRmViIGFuZCBGZWJydWFyeSBjYXNlc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnRCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU1NTSBEbyBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNsYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB0b2RvIGRvIHdlIHVzZSBnZW5lcmFsaXplZCBsb2NhbGVzPyBlbiB2cyBlbi1VUzsgdW50aWwgbm90IHdlIHRyeSB0byBndWVzc1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIFVTIHZzIFVLXG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0c0NvdW50ID0gMztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSBkYXRlUGFydHNDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBhcnQgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUGFydCA9IHBhcnRzWzFdLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyaWMoZmlyc3RQYXJ0KSB8fCAhdGhpcy5pc051bWVyaWMoc2Vjb25kUGFydCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhzSW5ZZWFycyA9IDEyO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRmlyc3RCZU1vbnRoID0gK2ZpcnN0UGFydCA8PSBtb250aHNJblllYXJzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhblNlY29uZEJ5TW9udGggPSArc2Vjb25kUGFydCA8PSBtb250aHNJblllYXJzO1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgdHdvIHBhcnRzIGNhbm5vdCBiZSBtb250aFxuICAgICAgICAgICAgICAgIGlmICghY2FuRmlyc3RCZU1vbnRoICYmICFjYW5TZWNvbmRCeU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkRldGVybWluZVdoZXJlTW9udGggPSBjYW5GaXJzdEJlTW9udGggJiYgY2FuU2Vjb25kQnlNb250aDtcblxuICAgICAgICAgICAgICAgIGlmIChjYW5EZXRlcm1pbmVXaGVyZU1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVzZSBVUyBmb3JtYXQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTS9ERC9ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGxlYWRpbmcgeWVhciB2cyBmaW5pc2hpbmcgeWVhclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG4gICAgICAgIGlmIChwYXJ0c1swXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4RGF5T3JNb250aENoYXJzQ291bnQgPSAyO1xuXG4gICAgICAgIHJldHVybiBwYXJ0c1swXS5sZW5ndGggPD0gbWF4RGF5T3JNb250aENoYXJzQ291bnRcbiAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC1NTS1ZWVlZJywgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnWVlZWS1NTS1ERCcsIHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aERvdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGNvdmVycyB0d28gY2FzZXMgWVlZWSBhbmQgWVkgKGZvciBjdXJyZW50IHllYXIpXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELk1NLllZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxufVxuIl19