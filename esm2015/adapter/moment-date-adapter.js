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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9jaXJjbGVjaS9tb3NhaWMvcGFja2FnZXMvbW9zYWljLW1vbWVudC1hZGFwdGVyL2FkYXB0ZXIvIiwic291cmNlcyI6WyJtb21lbnQtZGF0ZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNILFdBQVcsRUFDWCxjQUFjLEVBSWpCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxLQUFLLGFBQWEsTUFBTSxlQUFlLENBQUM7Ozs7O0FBSy9DLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDOzs7QUFHbEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxhQUFhLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFHMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7TUFJakMsTUFBTSxHQUFHLGFBQWEsSUFBSSxPQUFPOzs7OztBQUd2QyxpREFXQzs7Ozs7OztJQU5HLDZDQUFnQjs7Ozs7O0lBS2hCLHFEQUF3Qjs7Ozs7O0FBSTVCLE1BQU0sT0FBTyw4QkFBOEIsR0FBRyxJQUFJLGNBQWMsQ0FDNUQsZ0NBQWdDLEVBQUU7SUFDOUIsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLHNDQUFzQztDQUNsRCxDQUFDOzs7Ozs7QUFJTixNQUFNLFVBQVUsc0NBQXNDO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLGNBQWMsRUFBRSxLQUFLO0tBQ3hCLENBQUM7QUFDTixDQUFDOzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7VUFDM0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFFakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3QixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUdELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxXQUFtQjs7Ozs7SUFzQnRELFlBQ3dDLFVBQWtCLEVBRTlDLE9BQXFDO1FBRTdDLEtBQUssRUFBRSxDQUFDO1FBRkEsWUFBTyxHQUFQLE9BQU8sQ0FBOEI7UUFyQmhDLHlCQUFvQixHQUFXLGNBQWMsQ0FBQztRQXlCM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFFOUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQXhCRCxJQUFZLGdCQUFnQjtRQUN4QixPQUFPLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Ozs7SUF3QkQsU0FBUyxDQUFDLE1BQWM7UUFDcEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7WUFFcEIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OztjQUcxQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBRS9CLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXJELGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUMzQyxXQUFXLEVBQUU7b0JBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTO29CQUN2RCxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVU7aUJBQy9EO2dCQUNELGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLO2dCQUN4RCxRQUFRLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSTthQUNyRCxDQUFDLENBQUM7U0FDTjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsY0FBYyxFQUFFO1lBQ2pELFVBQVUsRUFBRSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDckMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUMzQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUM7WUFDcEUsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtZQUMzQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO1lBQ2pELGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtTQUNuRCxDQUFDO0lBQ04sQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBWTtRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxlQUFlLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFrQztRQUM1QywrQ0FBK0M7UUFDL0MsT0FBTyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7SUFDdkYsQ0FBQzs7OztJQUVELFlBQVk7UUFDUixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsaUJBQWlCLENBQUMsS0FBa0M7UUFDaEQsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQ2xCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7U0FDekM7UUFFRCxJQUFJLEtBQUssS0FBSyxPQUFPLEVBQUU7WUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQztTQUMxQztRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELEtBQUssQ0FBQyxJQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsSUFBWTtRQUNoRCwyRkFBMkY7UUFDM0Ysc0VBQXNFO1FBQ3RFLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxDQUFDLHdCQUF3QixLQUFLLDRDQUE0QyxDQUFDLENBQUM7U0FDMUY7UUFFRCxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDVixNQUFNLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxtQ0FBbUMsQ0FBQyxDQUFDO1NBQ3pFOztjQUVLLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpFLG1GQUFtRjtRQUNuRixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ25CLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixJQUFJLDJCQUEyQixLQUFLLElBQUksQ0FBQyxDQUFDO1NBQzFFO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7Ozs7SUFFRCxjQUFjLENBQ1YsSUFBWSxFQUFFLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBYSxFQUFFLE9BQWUsRUFBRSxPQUFlLEVBQUUsWUFBb0I7O2NBRTFHLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO1FBRWxELE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbkMsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELEtBQUs7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7Ozs7OztJQUVELEtBQUssQ0FBQyxLQUFVLEVBQUUsV0FBOEI7UUFDNUMsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ3BDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtvQkFDN0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQztnQkFFRCxPQUFPLFdBQVc7b0JBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNwRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3REO1lBRUQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBWSxFQUFFLGFBQXFCO1FBQ3RDLDJDQUEyQztRQUMzQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQixNQUFNLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7OztJQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxLQUFhO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7OztJQUVELGlCQUFpQixDQUFDLElBQVksRUFBRSxNQUFjO1FBQzFDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7OztJQUVELGVBQWUsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQyxDQUFDOzs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBVTs7WUFDZCxJQUFJO1FBQ1IsSUFBSSxLQUFLLFlBQVksSUFBSSxFQUFFO1lBQ3ZCLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkQ7YUFBTSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsMkRBQTJEO1lBQzNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUNELElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsR0FBUTtRQUNuQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsSUFBWTtRQUNoQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLFFBQW9DO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUFFOztjQUV6RSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjs7Y0FFM0IsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQzs7Y0FDeEMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQzs7Y0FFeEMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQzs7Y0FDakMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7O2NBRXJELGlCQUFpQixtQ0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsR0FBSyxRQUFRLENBQUMsU0FBUyxDQUFDOztjQUM5RSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQzs7WUFDNUQsV0FBVztRQUVmLElBQUksWUFBWSxJQUFJLEVBQUUsRUFBRSxFQUFFLGNBQWM7WUFDcEMsU0FBUyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7WUFDeEMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7U0FFdEM7YUFBTSxJQUFJLFlBQVksSUFBSSxFQUFFLEVBQUUsRUFBRSxjQUFjO1lBQzNDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDO1lBQ3hDLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBRXRDO2FBQU0sSUFBSSxPQUFPLEVBQUUsRUFBRSxRQUFRO1lBQzFCLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBRWhDO2FBQU0sSUFBSSxXQUFXLEVBQUUsRUFBRSxZQUFZO1lBQ2xDLFdBQVcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1NBRXBDO2FBQU0sRUFBRSxtQkFBbUI7WUFDeEIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Ozs7Ozs7SUFFRCxZQUFZLENBQUMsSUFBWSxFQUFFLE1BQWtDLEVBQUUsUUFBUSxHQUFHLEtBQUs7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQUU7O2NBRXpFLFNBQVMsbUNBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQzs7Y0FDcEUsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7UUFFekQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxJQUFZO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLElBQVk7UUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2RixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLElBQVk7UUFDekIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLENBQUM7Ozs7O0lBRUQsb0JBQW9CLENBQUMsSUFBWTtRQUM3QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RGLENBQUM7Ozs7Ozs7SUFFRCxlQUFlLENBQUMsU0FBd0IsRUFBRSxPQUFzQixFQUFFLFFBQWlDO1FBQy9GLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDOztjQUVLLFNBQVMsbUNBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBRTs7WUFDMUUsTUFBTSxHQUFHLEVBQUU7UUFFZixJQUFJLFNBQVMsRUFBRTs7a0JBQ0wsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFFdEUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUMvRSxVQUFVLEVBQUUsV0FBVyxHQUMxQixDQUFDO1NBQ0w7YUFBTSxJQUFJLE9BQU8sRUFBRTs7a0JBQ1YsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7WUFFbEUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUN6RSxVQUFVLEVBQUUsU0FBUyxHQUN4QixDQUFDO1NBQ0w7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsU0FBd0IsRUFBRSxPQUFzQixFQUFFLFFBQWlDO1FBQ25HLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDOztjQUVLLFNBQVMsbUNBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBRTs7WUFDMUUsTUFBTSxHQUFHLEVBQUU7UUFFZixJQUFJLFNBQVMsRUFBRTs7a0JBQ0wsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUM7WUFFdEUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osY0FBYyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUN2RixVQUFVLEVBQUUsV0FBVyxHQUMxQixDQUFDO1NBQ0w7YUFBTSxJQUFJLE9BQU8sRUFBRTs7a0JBQ1YsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7WUFFbEUsTUFBTSxtQ0FDQyxTQUFTLEtBQ1osWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNqRixVQUFVLEVBQUUsU0FBUyxHQUN4QixDQUFDO1NBQ0w7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7Ozs7O0lBRUQsU0FBUyxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFFBQWlDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDOztjQUVLLFNBQVMsbUNBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBRTs7Y0FDeEUsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7O2NBRXBELGtCQUFrQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQ3RFLGtCQUFrQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O2NBRXBDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O2NBRWxDLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLEtBQUssS0FBSyxJQUFJLGdCQUFnQixDQUFDLFlBQVksS0FBSyxLQUFLO1FBQzVHLGtCQUFrQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pFLGdCQUFnQixDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOztjQUV6RCxNQUFNLG1DQUNMLFNBQVMsS0FDWixVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQy9FLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFDekUsVUFBVSxFQUFFLFNBQVMsR0FDeEI7UUFFRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7Ozs7O0lBRUQsYUFBYSxDQUFDLFNBQWlCLEVBQUUsT0FBZSxFQUFFLFFBQWlDO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzlDOztjQUVLLFNBQVMsbUNBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEdBQUssUUFBUSxDQUFDLFNBQVMsQ0FBQzs7Y0FDdEUsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7O2NBQ3BELE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDOztjQUVoRCxrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztRQUN0RSxrQkFBa0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzFDLGtCQUFrQixDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O2NBRWhDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO1FBQ2xFLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDeEMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7Y0FFOUIsZUFBZSxHQUNqQixrQkFBa0IsQ0FBQyxZQUFZLEtBQUssS0FBSztZQUN6QyxnQkFBZ0IsQ0FBQyxZQUFZLEtBQUssS0FBSztRQUMzQyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRSxnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs7Y0FFekQsTUFBTSxtQ0FBTyxTQUFTLEtBQ3hCLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsa0JBQWtCLENBQUMsRUFDdkYsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNqRixVQUFVLEVBQUUsU0FBUyxFQUNyQixRQUFRLEVBQUUsT0FBTyxHQUFDO1FBRXRCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7OztJQUVELGNBQWMsQ0FBQyxTQUF3QixFQUFFLE9BQWdCOztjQUMvQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO1FBRTFELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9FO1FBRUQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUYsQ0FBQzs7Ozs7O0lBRUQsa0JBQWtCLENBQUMsU0FBd0IsRUFBRSxPQUFnQjs7Y0FDbkQsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYztRQUUxRCxJQUFJLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuRjtRQUVELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEcsQ0FBQzs7Ozs7O0lBRUQsYUFBYSxDQUFDLFNBQXdCLEVBQUUsT0FBZ0I7O2NBQzlDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWM7UUFFMUQsSUFBSSxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUU7UUFFRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RixDQUFDOzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxTQUF3QixFQUFFLE9BQWdCOztjQUNsRCxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjO1FBRTFELElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUN0QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xGO1FBRUQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRyxDQUFDOzs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxTQUFpQixFQUFFLE9BQWU7UUFDbEQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFHLENBQUM7Ozs7Ozs7SUFHTyxZQUFZLENBQUMsR0FBRyxJQUFXO1FBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDekYsQ0FBQzs7Ozs7OztJQUVPLGdCQUFnQixDQUFDLElBQVksRUFBRSxTQUFjOztjQUMzQyxpQkFBaUIsR0FBUSxFQUFFO1FBRWpDLHFDQUFxQztRQUNyQyxLQUFLLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRTtZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEMsU0FBUzthQUNaOztrQkFFSyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUM1QixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO1FBRUQsaUJBQWlCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUQsT0FBTyxpQkFBaUIsQ0FBQztJQUM3QixDQUFDOzs7Ozs7SUFFTyxhQUFhLENBQUMsS0FBYTtRQUMvQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RSxDQUFDOzs7Ozs7OztJQUVPLE1BQU0sQ0FBQyxJQUF3QixFQUFFLFNBQWlCLEVBQUUsT0FBZTtRQUN2RSxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxNQUFjO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRU8sU0FBUyxDQUFDLEtBQVU7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7O0lBRU8sVUFBVSxDQUFDLEtBQWE7UUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7OztjQUdLLE9BQU8sR0FBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFdkUsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsZ0JBQWdCO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyRDtRQUVELHNFQUFzRTtRQUN0RSxJQUNJLCtCQUErQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsdUNBQXVDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUM1RDtZQUNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQztRQUVELGlFQUFpRTtRQUNqRSxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7UUFFRCxnRUFBZ0U7UUFDaEUsSUFBSSx1RUFBdUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO1FBRUQsbURBQW1EO1FBQ25ELElBQUksbUNBQW1DLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxLQUFhO1FBQ2hDLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQixLQUFLLElBQUk7Z0JBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pFLEtBQUssSUFBSTtnQkFDTCw4REFBOEQ7Z0JBQzlELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMvRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakU7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLG1CQUFtQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOzs7Ozs7SUFFTyxjQUFjLENBQUMsS0FBYTtRQUNoQyxRQUFRLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDakIsS0FBSyxJQUFJO2dCQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvRCw2RUFBNkU7WUFDN0UsS0FBSyxJQUFJOzs7c0JBRUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOztzQkFDeEIsY0FBYyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxjQUFjLEVBQUU7b0JBQ2pDLE9BQU8sSUFBSSxDQUFDO2lCQUNmOztzQkFFSyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRTs7c0JBQzNCLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO2dCQUVsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzNELE9BQU8sSUFBSSxDQUFDO2lCQUNmOztzQkFFSyxhQUFhLEdBQUcsRUFBRTs7c0JBRWxCLGVBQWUsR0FBRyxDQUFDLFNBQVMsSUFBSSxhQUFhOztzQkFDN0MsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFVLElBQUksYUFBYTtnQkFFckQsa0NBQWtDO2dCQUNsQyxJQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQ3ZDLE9BQU8sSUFBSSxDQUFDO2lCQUNmOztzQkFFSyxzQkFBc0IsR0FBRyxlQUFlLElBQUksZ0JBQWdCO2dCQUVsRSxJQUFJLHNCQUFzQixFQUFFO29CQUN4QiwyQkFBMkI7b0JBQzNCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsT0FBTyxlQUFlLElBQUksQ0FBQyxnQkFBZ0I7b0JBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDckQsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLG1CQUFtQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOzs7Ozs7SUFFTyxhQUFhLENBQUMsS0FBYTs7O2NBRXpCLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM5QixJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7O2NBRUssdUJBQXVCLEdBQUcsQ0FBQztRQUVqQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksdUJBQXVCO1lBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFFTyxZQUFZLENBQUMsS0FBYTtRQUM5QixrREFBa0Q7UUFDbEQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9ELENBQUM7OztZQXZvQkosVUFBVTs7Ozt5Q0F3QkYsUUFBUSxZQUFJLE1BQU0sU0FBQyxjQUFjOzRDQUNqQyxRQUFRLFlBQUksTUFBTSxTQUFDLDhCQUE4Qjs7Ozs7OztJQXRCdEQsMENBQXFDOzs7OztJQUVyQyxpREFBK0Q7Ozs7O0lBRS9ELDRDQUEwQzs7Ozs7SUFNMUMsdUNBUUU7Ozs7O0lBSUUsb0NBQzZDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tbWFnaWMtbnVtYmVyc1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRGF0ZUFkYXB0ZXIsXG4gICAgTUNfREFURV9MT0NBTEUsXG4gICAgSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUsXG4gICAgSUZvcm1hdHRlclJlbGF0aXZlVGVtcGxhdGUsXG4gICAgSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGVcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCAqIGFzIE1lc3NhZ2VGb3JtYXQgZnJvbSAnbWVzc2FnZWZvcm1hdCc7XG4vLyBEZXBlbmRpbmcgb24gd2hldGhlciByb2xsdXAgaXMgdXNlZCwgbW9tZW50IG5lZWRzIHRvIGJlIGltcG9ydGVkIGRpZmZlcmVudGx5LlxuLy8gU2luY2UgTW9tZW50LmpzIGRvZXNuJ3QgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0LCB3ZSBub3JtYWxseSBuZWVkIHRvIGltcG9ydCB1c2luZyB0aGUgYCogYXNgXG4vLyBzeW50YXguIEhvd2V2ZXIsIHJvbGx1cCBjcmVhdGVzIGEgc3ludGhldGljIGRlZmF1bHQgbW9kdWxlIGFuZCB3ZSB0aHVzIG5lZWQgdG8gaW1wb3J0IGl0IHVzaW5nXG4vLyB0aGUgYGRlZmF1bHQgYXNgIHN5bnRheC5cbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIHRzbGludDpkaXNhYmxlOm5vLWR1cGxpY2F0ZS1pbXBvcnRzXG4vLyBAdHMtaWdub3JlIChsb29rIGF0IHRzY29uZmlnKVxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfcm9sbHVwTW9tZW50LCBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgdW5pdE9mVGltZSB9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL2xvY2FsZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vbG9jYWxlcy9ydS1SVSc7XG5pbXBvcnQgeyBJRm9ybWF0dGVyQ29uZmlnIH0gZnJvbSAnLi9sb2NhbGVzL0lGb3JtYXR0ZXJDb25maWcnO1xuXG5cbmNvbnN0IG1vbWVudCA9IF9yb2xsdXBNb21lbnQgfHwgX21vbWVudDtcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciB7QHNlZSBNb21lbnREYXRlQWRhcHRlcn0uICovXG5leHBvcnQgaW50ZXJmYWNlIElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICB1c2VVdGM6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogd2hldGhlciBzaG91bGQgcGFyc2UgbWV0aG9kIHRyeSBndWVzcyBkYXRlIGZvcm1hdFxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICBmaW5kRGF0ZUZvcm1hdDogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvblRva2VuIGZvciBtb21lbnQgZGF0ZSBhZGFwdGVyIHRvIGNvbmZpZ3VyZSBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnM+KFxuICAgICdNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1c2VVdGM6IGZhbHNlLFxuICAgICAgICBmaW5kRGF0ZUZvcm1hdDogZmFsc2VcbiAgICB9O1xufVxuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8TW9tZW50PiB7XG5cbiAgICBwcml2YXRlIG1lc3NhZ2Vmb3JtYXQ6IE1lc3NhZ2VGb3JtYXQ7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGludmFsaWREYXRlRXJyb3JUZXh0OiBzdHJpbmcgPSAnSW52YWxpZCBkYXRlJztcblxuICAgIHByaXZhdGUgZm9ybWF0dGVyQ29uZmlnOiBJRm9ybWF0dGVyQ29uZmlnO1xuXG4gICAgcHJpdmF0ZSBnZXQgbW9tZW50V2l0aExvY2FsZSgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gbW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2FsZURhdGE6IHtcbiAgICAgICAgZmlyc3REYXlPZldlZWs6IG51bWJlcjtcbiAgICAgICAgbG9uZ01vbnRoczogc3RyaW5nW107XG4gICAgICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgZGF0ZXM6IHN0cmluZ1tdO1xuICAgICAgICBsb25nRGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIHNob3J0RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19EQVRFX0xPQ0FMRSkgZGF0ZUxvY2FsZTogc3RyaW5nLFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUylcbiAgICAgICAgcHJpdmF0ZSBvcHRpb25zPzogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zZXRMb2NhbGUoZGF0ZUxvY2FsZSB8fCBtb21lbnQubG9jYWxlKCkpO1xuXG4gICAgICAgIHRoaXMuY29uZmlndXJlVHJhbnNsYXRvcih0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIGxldCBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LmxvY2FsZURhdGEobG9jYWxlKTtcblxuICAgICAgICAvLyBUaGlzIGlzIG91ciBjdXN0b21zIHRyYW5zbGF0aW9uc1xuICAgICAgICBjb25zdCBpMThuTG9jYWxzID0gWydlbicsICdydSddO1xuXG4gICAgICAgIGlmIChpMThuTG9jYWxzLmluZGV4T2YobG9jYWxlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyQ29uZmlnID0gbG9jYWxlID09PSAnZW4nID8gZW5VUyA6IHJ1UlU7XG5cbiAgICAgICAgICAgIG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQudXBkYXRlTG9jYWxlKGxvY2FsZSwge1xuICAgICAgICAgICAgICAgIG1vbnRoc1Nob3J0OiB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXR0ZXJDb25maWcubW9udGhOYW1lcy5zaG9ydC5mb3JtYXR0ZWQsXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kYWxvbmU6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuc3RhbmRhbG9uZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd2Vla2RheXNTaG9ydDogdGhpcy5mb3JtYXR0ZXJDb25maWcuZGF5T2ZXZWVrTmFtZXMuc2hvcnQsXG4gICAgICAgICAgICAgICAgd2Vla2RheXM6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLmRheU9mV2Vla05hbWVzLmxvbmdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgZmlyc3REYXlPZldlZWs6IG1vbWVudExvY2FsZURhdGEuZmlyc3REYXlPZldlZWsoKSxcbiAgICAgICAgICAgIGxvbmdNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzKCksXG4gICAgICAgICAgICBzaG9ydE1vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHNTaG9ydCgpLFxuICAgICAgICAgICAgZGF0ZXM6IHJhbmdlKDMxLCAoaSkgPT4gdGhpcy5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoJ0QnKSksXG4gICAgICAgICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgICAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xuICAgIH1cblxuICAgIGdldE1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcbiAgICB9XG5cbiAgICBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBnZXRTZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWlsbGlzZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgZ2V0VGltZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xuICAgIH1cblxuICAgIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXNcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZycgPyB0aGlzLmxvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMubG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgICB9XG5cbiAgICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmRhdGVzO1xuICAgIH1cblxuICAgIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLnNob3J0RGF5c09mV2VlaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEubmFycm93RGF5c09mV2VlaztcbiAgICB9XG5cbiAgICBnZXRZZWFyTmFtZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoJ1lZWVknKTtcbiAgICB9XG5cbiAgICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrO1xuICAgIH1cblxuICAgIGdldE51bURheXNJbk1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheXNJbk1vbnRoKCk7XG4gICAgfVxuXG4gICAgY2xvbmUoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIGRhdGUuY2xvbmUoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXG4gICAgICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZWFjaCBjYXNlIHNvIHdlIGNhbiB0aHJvdyBtb3JlIGRlc2NyaXB0aXZlIGVycm9ycy5cbiAgICAgICAgaWYgKG1vbnRoIDwgMCB8fCBtb250aCA+IDExKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtb250aCBpbmRleCBcIiR7bW9udGh9XCIuIE1vbnRoIGluZGV4IGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDExLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY3JlYXRlTW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgLy8gSWYgdGhlIHJlc3VsdCBpc24ndCB2YWxpZCwgdGhlIGRhdGUgbXVzdCBoYXZlIGJlZW4gb3V0IG9mIGJvdW5kcyBmb3IgdGhpcyBtb250aC5cbiAgICAgICAgaWYgKCFyZXN1bHQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiIGZvciBtb250aCB3aXRoIGluZGV4IFwiJHttb250aH1cIi5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZVRpbWUoXG4gICAgICAgIHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3VyczogbnVtYmVyLCBtaW51dGVzOiBudW1iZXIsIHNlY29uZHM6IG51bWJlciwgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICApOiBNb21lbnQge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gdGhpcy5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcblxuICAgICAgICBuZXdEYXRlLmhvdXJzKGhvdXJzKTtcbiAgICAgICAgbmV3RGF0ZS5taW51dGVzKG1pbnV0ZXMpO1xuICAgICAgICBuZXdEYXRlLnNlY29uZHMoc2Vjb25kcyk7XG4gICAgICAgIG5ld0RhdGUubWlsbGlzZWNvbmRzKG1pbGxpc2Vjb25kcyk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0RhdGU7XG4gICAgfVxuXG4gICAgdG9kYXkoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwYXJzZSh2YWx1ZTogYW55LCBwYXJzZUZvcm1hdDogc3RyaW5nIHwgc3RyaW5nW10pOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmZpbmREYXRlRm9ybWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRGb3JtYXQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZvcm1hdFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBwYXJzZUZvcm1hdCwgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZvcm1hdChkYXRlOiBNb21lbnQsIGRpc3BsYXlGb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlOm5vLXBhcmFtZXRlci1yZWFzc2lnbm1lbnRcbiAgICAgICAgZGF0ZSA9IHRoaXMuY2xvbmUoZGF0ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKGRhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignTW9tZW50RGF0ZUFkYXB0ZXI6IENhbm5vdCBmb3JtYXQgaW52YWxpZCBkYXRlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KGRpc3BsYXlGb3JtYXQpO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyWWVhcnMoZGF0ZTogTW9tZW50LCB5ZWFyczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgeWVhcnMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogTW9tZW50LCBtb250aHM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IG1vbnRocyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhckRheXMoZGF0ZTogTW9tZW50LCBkYXlzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBkYXlzIH0pO1xuICAgIH1cblxuICAgIHRvSXNvODYwMShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5mb3JtYXQoKTtcbiAgICB9XG5cbiAgICAvKiogaHR0cHM6Ly93d3cuaWV0Zi5vcmcvcmZjL3JmYzMzMzkudHh0ICovXG4gICAgZGVzZXJpYWxpemUodmFsdWU6IGFueSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgZGF0ZTtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNEYXRlSW5zdGFuY2UodmFsdWUpKSB7XG4gICAgICAgICAgICAvLyBOb3RlOiBhc3N1bWVzIHRoYXQgY2xvbmluZyBhbHNvIHNldHMgdGhlIGNvcnJlY3QgbG9jYWxlLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbW9tZW50LmlzTW9tZW50KG9iaik7XG4gICAgfVxuXG4gICAgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgcmVsYXRpdmVEYXRlKGRhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMubW9tZW50V2l0aExvY2FsZTtcblxuICAgICAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBub3cuZGlmZihkYXRlLCAnc2Vjb25kcycpO1xuICAgICAgICBjb25zdCB0b3RhbE1pbnV0ZXMgPSBub3cuZGlmZihkYXRlLCAnbWludXRlcycpO1xuXG4gICAgICAgIGNvbnN0IGlzVG9kYXkgPSBub3cuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgICAgICAgY29uc3QgaXNZZXN0ZXJkYXkgPSBub3cuYWRkKC0xLCAnZGF5cycpLmlzU2FtZShkYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVWYXJpYWJsZXMgPSB7Li4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgdGVtcGxhdGVWYXJpYWJsZXMpO1xuICAgICAgICBsZXQgbmV3VGVtcGxhdGU7XG5cbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8PSA1OSkgeyAvLyBzZWNvbmRzIGFnb1xuICAgICAgICAgICAgdmFyaWFibGVzLlNFQ09ORFNfUEFTU0VEID0gdG90YWxTZWNvbmRzO1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5TRUNPTkRTX0FHTztcblxuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsTWludXRlcyA8PSA1OSkgeyAvLyBtaW51dGVzIGFnb1xuICAgICAgICAgICAgdmFyaWFibGVzLk1JTlVURVNfUEFTU0VEID0gdG90YWxNaW51dGVzO1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5NSU5VVEVTX0FHTztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzVG9kYXkpIHsgLy8gdG9kYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuVE9EQVk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1llc3RlcmRheSkgeyAvLyB5ZXN0ZXJkYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuWUVTVEVSREFZO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGJlZm9yZSB5ZXN0ZXJkYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuQkVGT1JFX1lFU1RFUkRBWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZShuZXdUZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcucmVsYXRpdmVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIHJlbGF0aXZlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIGFic29sdXRlRGF0ZShkYXRlOiBNb21lbnQsIHBhcmFtczogSUZvcm1hdHRlckFic29sdXRlVGVtcGxhdGUsIGRhdGV0aW1lID0gZmFsc2UpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gey4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4ucGFyYW1zLnZhcmlhYmxlc307XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZGF0ZXRpbWUgPyBwYXJhbXMuREFURVRJTUUgOiBwYXJhbXMuREFURTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUpKHRoaXMuY29tcGlsZVZhcmlhYmxlcyhkYXRlLCB2YXJpYWJsZXMpKTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIGFic29sdXRlU2hvcnREYXRlVGltZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5hYnNvbHV0ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcuYWJzb2x1dGVUZW1wbGF0ZXMuc2hvcnQsIHRydWUpO1xuICAgIH1cblxuICAgIGFic29sdXRlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShkYXRlLCB0aGlzLmZvcm1hdHRlckNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nLCB0cnVlKTtcbiAgICB9XG5cbiAgICBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlOiBNb21lbnQgfCBudWxsLCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCFtb21lbnQuaXNNb21lbnQoc3RhcnREYXRlKSAmJiAhbW9tZW50LmlzTW9tZW50KGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGxldCBwYXJhbXMgPSB7fTtcblxuICAgICAgICBpZiAoc3RhcnREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIFNUQVJUX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlTdGFydCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgb3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU6IE1vbWVudCB8IG51bGwsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIW1vbWVudC5pc01vbWVudChzdGFydERhdGUpICYmICFtb21lbnQuaXNNb21lbnQoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgICAgIFJBTkdFX1RZUEU6ICdvbmx5U3RhcnQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKGVuZERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBFTkRfREFURVRJTUU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFVElNRSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlFbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkRBVEVUSU1FKShwYXJhbXMpO1xuICAgIH1cblxuICAgIHJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZTogSUZvcm1hdHRlclJhbmdlVGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2Uoc3RhcnREYXRlKSB8fCAhdGhpcy5pc0RhdGVJbnN0YW5jZShlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBjb25zdCBzYW1lTW9udGggPSB0aGlzLmlzU2FtZSgnbW9udGgnLCBzdGFydERhdGUsIGVuZERhdGUpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGVuZERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZW5kRGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX01PTlRIID0gc2FtZU1vbnRoO1xuXG4gICAgICAgIGNvbnN0IGJvdGhDdXJyZW50WWVhciA9IHN0YXJ0RGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnICYmIGVuZERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJztcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSBib3RoQ3VycmVudFllYXIgPyAneWVzJyA6ICdubyc7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIEVORF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURSkoZW5kRGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICBTQU1FX01PTlRIOiBzYW1lTW9udGhcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc0RhdGVJbnN0YW5jZShzdGFydERhdGUpIHx8ICF0aGlzLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7Li4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCBzYW1lTW9udGggPSB0aGlzLmlzU2FtZSgnbW9udGgnLCBzdGFydERhdGUsIGVuZERhdGUpO1xuICAgICAgICBjb25zdCBzYW1lRGF5ID0gdGhpcy5pc1NhbWUoJ2RheScsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIHN0YXJ0RGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9EQVkgPSBzYW1lRGF5O1xuXG4gICAgICAgIGNvbnN0IGJvdGhDdXJyZW50WWVhciA9XG4gICAgICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID09PSAneWVzJyAmJlxuICAgICAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7Li4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoLFxuICAgICAgICAgICAgU0FNRV9EQVk6IHNhbWVEYXl9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5zaG9ydCk7XG4gICAgfVxuXG4gICAgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIHJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2UubG9uZyk7XG4gICAgfVxuXG4gICAgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLm1pZGRsZSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYSBNb21lbnQgaW5zdGFuY2Ugd2hpbGUgcmVzcGVjdGluZyB0aGUgY3VycmVudCBVVEMgc2V0dGluZ3MuICovXG4gICAgcHJpdmF0ZSBjcmVhdGVNb21lbnQoLi4uYXJnczogYW55W10pOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXNlVXRjKSA/IG1vbWVudC51dGMoLi4uYXJncykgOiBtb21lbnQoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21waWxlVmFyaWFibGVzKGRhdGU6IE1vbWVudCwgdmFyaWFibGVzOiBhbnkpOiBhbnkge1xuICAgICAgICBjb25zdCBjb21waWxlZFZhcmlhYmxlczogYW55ID0ge307XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvci1pblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIGlmICghdmFyaWFibGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YXJpYWJsZXNba2V5XTtcbiAgICAgICAgICAgIGNvbXBpbGVkVmFyaWFibGVzW2tleV0gPSBkYXRlLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21waWxlZFZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSB0aGlzLmlzQ3VycmVudFllYXIoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVmFyaWFibGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDdXJyZW50WWVhcih2YWx1ZTogTW9tZW50KTogJ3llcycgfCAnbm8nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9tZW50V2l0aExvY2FsZS5pc1NhbWUodmFsdWUsICd5ZWFyJykgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NhbWUodW5pdDogdW5pdE9mVGltZS5TdGFydE9mLCBzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0RGF0ZS5pc1NhbWUoZW5kRGF0ZSwgdW5pdCkgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maWd1cmVUcmFuc2xhdG9yKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVzc2FnZWZvcm1hdCA9IG5ldyBNZXNzYWdlRm9ybWF0KGxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRm9ybWF0KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWZhdWx0IHRlc3QgLSBpc29cbiAgICAgICAgY29uc3QgaXNvRGF0ZSA9ICB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxLCB0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgaWYgKGlzb0RhdGUuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNvRGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHVuaXggdGltZSBzZWNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1gnLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb25nIG1vbnRocyBuYW1pbmc6IEQgTU1NIFlZWVksIE1NTSBEbyBZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC9eXFxkezEsMn1cXHNcXFMrXFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpIHx8XG4gICAgICAgICAgICAvXlxcUytcXHNcXGR7MSwyfVthLXpdezJ9XFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU3BhY2UodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xhc2ggbm90YXRpb246IEREL01NL1lZWVksIE1NL0REL1lZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC9eXFxkezEsMn1cXC9cXGR7MSwyfVxcLyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhTbGFzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkYXNoIG5vdGF0aW9uOiBERC1NTS1ZWVlZLCBZWVlZLURELU1NIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvKF4oXFxkezEsMn18XFxkezR9KS1cXGR7MSwyfS1cXGR7MSwyfSQpfCheXFxkezEsMn0tXFxkezEsMn0tKFxcZHsyfXxcXGR7NH0pJCkvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG90IG5vdGF0aW9uOiBERC5NTS5ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwuXFxkezEsMn1cXC4oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoRG90KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU3BhY2UodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQgTU1NTSBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIDE2IEZlYiAyMDE5IHZzIEZlYiAxNnRoIDIwMTksIGNvdmVycyBGZWIgYW5kIEZlYnJ1YXJ5IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHZhbHVlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdEIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTU1NIERvIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU2xhc2godmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIC8vIHRvZG8gZG8gd2UgdXNlIGdlbmVyYWxpemVkIGxvY2FsZXM/IGVuIHZzIGVuLVVTOyB1bnRpbCBub3Qgd2UgdHJ5IHRvIGd1ZXNzXG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgLy8gVVMgdnMgVUtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzQ291bnQgPSAzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IGRhdGVQYXJ0c0NvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0UGFydCA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRQYXJ0ID0gcGFydHNbMV0udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTnVtZXJpYyhmaXJzdFBhcnQpIHx8ICF0aGlzLmlzTnVtZXJpYyhzZWNvbmRQYXJ0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb250aHNJblllYXJzID0gMTI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW5GaXJzdEJlTW9udGggPSArZmlyc3RQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuU2Vjb25kQnlNb250aCA9ICtzZWNvbmRQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCB0d28gcGFydHMgY2Fubm90IGJlIG1vbnRoXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRGV0ZXJtaW5lV2hlcmVNb250aCA9IGNhbkZpcnN0QmVNb250aCAmJiBjYW5TZWNvbmRCeU1vbnRoO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbkRldGVybWluZVdoZXJlTW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIFVTIGZvcm1hdCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGUgJHt0aGlzLmxvY2FsZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gbGVhZGluZyB5ZWFyIHZzIGZpbmlzaGluZyB5ZWFyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgaWYgKHBhcnRzWzBdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudCA9IDI7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdLmxlbmd0aCA8PSBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELU1NLVlZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdZWVlZLU1NLUREJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRG90KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gY292ZXJzIHR3byBjYXNlcyBZWVlZIGFuZCBZWSAoZm9yIGN1cnJlbnQgeWVhcilcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQuTU0uWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICB9XG59XG4iXX0=