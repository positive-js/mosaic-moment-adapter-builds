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
const moment = _rollupMoment || _moment;
/** InjectionToken for moment date adapter to configure options. */
export const MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
    providedIn: 'root',
    factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
});
/** @docs-private */
// tslint:disable:naming-convention
export function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
    return {
        useUtc: false,
        findDateFormat: false
    };
}
/** Creates an array and fills it with values. */
function range(length, valueFunction) {
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
export class MomentDateAdapter extends DateAdapter {
    constructor(dateLocale, options) {
        super();
        this.options = options;
        this.invalidDateErrorText = 'Invalid date';
        this.setLocale(dateLocale || moment.locale());
        this.configureTranslator(this.locale);
    }
    get momentWithLocale() {
        return moment().locale(this.locale);
    }
    setLocale(locale) {
        super.setLocale(locale);
        let momentLocaleData = moment.localeData(locale);
        // This is our customs translations
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
            dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    getLocaleData() {
        return this.localeData;
    }
    setLocaleData(localeData) {
        this.localeData = localeData;
    }
    updateLocaleData(localeData) {
        this.localeData = Object.assign(Object.assign({}, this.localeData), localeData);
    }
    getYear(date) {
        return this.clone(date).year();
    }
    getMonth(date) {
        return this.clone(date).month();
    }
    getDate(date) {
        return this.clone(date).date();
    }
    getHours(date) {
        return this.clone(date).hours();
    }
    getMinutes(date) {
        return this.clone(date).minutes();
    }
    getSeconds(date) {
        return this.clone(date).seconds();
    }
    getMilliseconds(date) {
        return this.clone(date).milliseconds();
    }
    getTime(date) {
        return date.valueOf();
    }
    getDayOfWeek(date) {
        return this.clone(date).day();
    }
    getMonthNames(style) {
        // Moment.js doesn't support narrow month names
        return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
    }
    getDateNames() {
        return this.localeData.dates;
    }
    getDayOfWeekNames(style) {
        if (style === 'long') {
            return this.localeData.longDaysOfWeek;
        }
        if (style === 'short') {
            return this.localeData.shortDaysOfWeek;
        }
        return this.localeData.narrowDaysOfWeek;
    }
    getYearName(date) {
        return this.clone(date).format('YYYY');
    }
    getFirstDayOfWeek() {
        return this.localeData.firstDayOfWeek;
    }
    getNumDaysInMonth(date) {
        return this.clone(date).daysInMonth();
    }
    clone(date) {
        return date.clone().locale(this.locale);
    }
    createDate(year, month, date) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        const result = this.createMoment({ year, month, date }).locale(this.locale);
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    createDateTime(year, month, date, hours, minutes, seconds, milliseconds) {
        const newDate = this.createDate(year, month, date);
        newDate.hours(hours);
        newDate.minutes(minutes);
        newDate.seconds(seconds);
        newDate.milliseconds(milliseconds);
        return newDate;
    }
    today() {
        return this.createMoment().locale(this.locale);
    }
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
    format(date, displayFormat) {
        // tslint:disable:no-parameter-reassignment
        date = this.clone(date);
        if (!this.isValid(date)) {
            throw Error('MomentDateAdapter: Cannot format invalid date.');
        }
        return date.format(displayFormat);
    }
    addCalendarYears(date, years) {
        return this.clone(date).add({ years });
    }
    addCalendarMonths(date, months) {
        return this.clone(date).add({ months });
    }
    addCalendarDays(date, days) {
        return this.clone(date).add({ days });
    }
    toIso8601(date) {
        return this.clone(date).format();
    }
    /** https://www.ietf.org/rfc/rfc3339.txt */
    deserialize(value) {
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
    isDateInstance(obj) {
        return moment.isMoment(obj);
    }
    isValid(date) {
        return this.clone(date).isValid();
    }
    invalid() {
        return moment.invalid();
    }
    relativeDate(date, template) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        const now = this.momentWithLocale;
        const totalSeconds = now.diff(date, 'seconds');
        const totalMinutes = now.diff(date, 'minutes');
        const isToday = now.isSame(date, 'day');
        const isYesterday = now.add(-1, 'days').isSame(date, 'day');
        const templateVariables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        const variables = this.compileVariables(date, templateVariables);
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
    relativeShortDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
    }
    relativeLongDate(date) {
        return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
    }
    absoluteDate(date, params, datetime = false, milliseconds = false, microseconds = false) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = this.compileVariables(date, Object.assign(Object.assign({}, this.formatterConfig.variables), params.variables));
        variables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
        variables.SHOW_MICROSECONDS = microseconds ? 'yes' : 'no';
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(variables);
    }
    absoluteShortDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    }
    absoluteShortDateTime(date, options) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
    }
    absoluteLongDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    }
    absoluteLongDateTime(date, options) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
    }
    openedRangeDate(startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATE)(params);
    }
    openedRangeDateTime(startDate, endDate, template) {
        if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        let params = {};
        if (startDate) {
            const startDateVariables = this.compileVariables(startDate, variables);
            params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
        }
        else if (endDate) {
            const endDateVariables = this.compileVariables(endDate, variables);
            params = Object.assign(Object.assign({}, variables), { END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
        }
        return this.messageformat.compile(template.DATETIME)(params);
    }
    rangeDate(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        const sameMonth = this.isSame('month', startDate, endDate);
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        const params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    }
    rangeDateTime(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
        const sameMonth = this.isSame('month', startDate, endDate);
        const sameDay = this.isSame('day', startDate, endDate);
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        const bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
        startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
        const params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    }
    rangeShortDate(startDate, endDate) {
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
    }
    rangeShortDateTime(startDate, endDate) {
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
    }
    rangeLongDate(startDate, endDate) {
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    rangeLongDateTime(startDate, endDate) {
        const rangeTemplates = this.formatterConfig.rangeTemplates;
        if (startDate && endDate) {
            return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
        }
        return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
    }
    rangeMiddleDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.closedRange.middle);
    }
    /** Creates a Moment instance while respecting the current UTC settings. */
    createMoment(...args) {
        return (this.options && this.options.useUtc) ? moment.utc(...args) : moment(...args);
    }
    compileVariables(date, variables) {
        const compiledVariables = {};
        // tslint:disable-next-line:no-for-in
        for (const key in variables) {
            if (!variables.hasOwnProperty(key)) {
                continue;
            }
            const value = variables[key];
            compiledVariables[key] = date.format(value);
        }
        compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
        return compiledVariables;
    }
    isCurrentYear(value) {
        return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
    }
    isSame(unit, startDate, endDate) {
        return startDate.isSame(endDate, unit) ? 'yes' : 'no';
    }
    configureTranslator(locale) {
        this.messageformat = new MessageFormat(locale);
    }
    isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    findFormat(value) {
        if (!value) {
            return null;
        }
        // default test - iso
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
    parseWithSlash(value) {
        switch (this.locale) {
            case 'ru':
                return this.createMoment(value, 'DD/MM/YYYY', this.locale);
            // todo do we use generalized locales? en vs en-US; until not we try to guess
            case 'en':
                // US vs UK
                const parts = value.split('/');
                const datePartsCount = 3;
                if (parts.length !== datePartsCount) {
                    return null;
                }
                const firstPart = parts[0].trim();
                const secondPart = parts[1].trim();
                if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                    return null;
                }
                const monthsInYears = 12;
                const canFirstBeMonth = +firstPart <= monthsInYears;
                const canSecondByMonth = +secondPart <= monthsInYears;
                // first two parts cannot be month
                if (!canFirstBeMonth && !canSecondByMonth) {
                    return null;
                }
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
    parseWithDash(value) {
        // leading year vs finishing year
        const parts = value.split('-');
        if (parts[0].length === 0) {
            return null;
        }
        const maxDayOrMonthCharsCount = 2;
        return parts[0].length <= maxDayOrMonthCharsCount
            ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
            : this.createMoment(value, 'YYYY-MM-DD', this.locale);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsa0NBQWtDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUNILFdBQVcsRUFDWCxjQUFjLEVBS2pCLE1BQU0sMEJBQTBCLENBQUM7QUFDbEMsT0FBTyxLQUFLLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDL0MsZ0ZBQWdGO0FBQ2hGLDZGQUE2RjtBQUM3RixpR0FBaUc7QUFDakcsMkJBQTJCO0FBQzNCLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLHNDQUFzQztBQUN0QyxnQ0FBZ0M7QUFDaEMsT0FBTyxFQUFFLE9BQU8sSUFBSSxhQUFhLEVBQVUsTUFBTSxRQUFRLENBQUM7QUFHMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUl2QyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDO0FBZ0J4QyxtRUFBbUU7QUFDbkUsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQzVELGdDQUFnQyxFQUFFO0lBQzlCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxzQ0FBc0M7Q0FDbEQsQ0FBQyxDQUFDO0FBRVAsb0JBQW9CO0FBQ3BCLG1DQUFtQztBQUNuQyxNQUFNLFVBQVUsc0NBQXNDO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLGNBQWMsRUFBRSxLQUFLO0tBQ3hCLENBQUM7QUFDTixDQUFDO0FBRUQsaURB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Q0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNyRCxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sWUFBWSxDQUFDLEtBQWE7UUFDOUIsa0RBQWtEO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUF6cEJKLFVBQVU7Ozs7eUNBdUJGLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs0Q0FDakMsUUFBUSxZQUFJLE1BQU0sU0FBQyw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRlQWRhcHRlcixcbiAgICBNQ19EQVRFX0xPQ0FMRSxcbiAgICBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSxcbiAgICBJRm9ybWF0dGVyUmVsYXRpdmVUZW1wbGF0ZSxcbiAgICBJRm9ybWF0dGVyQWJzb2x1dGVUZW1wbGF0ZSxcbiAgICBJQWJzb2x1dGVEYXRlVGltZU9wdGlvbnNcbn0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL2RhdGV0aW1lJztcbmltcG9ydCAqIGFzIE1lc3NhZ2VGb3JtYXQgZnJvbSAnbWVzc2FnZWZvcm1hdCc7XG4vLyBEZXBlbmRpbmcgb24gd2hldGhlciByb2xsdXAgaXMgdXNlZCwgbW9tZW50IG5lZWRzIHRvIGJlIGltcG9ydGVkIGRpZmZlcmVudGx5LlxuLy8gU2luY2UgTW9tZW50LmpzIGRvZXNuJ3QgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0LCB3ZSBub3JtYWxseSBuZWVkIHRvIGltcG9ydCB1c2luZyB0aGUgYCogYXNgXG4vLyBzeW50YXguIEhvd2V2ZXIsIHJvbGx1cCBjcmVhdGVzIGEgc3ludGhldGljIGRlZmF1bHQgbW9kdWxlIGFuZCB3ZSB0aHVzIG5lZWQgdG8gaW1wb3J0IGl0IHVzaW5nXG4vLyB0aGUgYGRlZmF1bHQgYXNgIHN5bnRheC5cbmltcG9ydCAqIGFzIF9tb21lbnQgZnJvbSAnbW9tZW50Jztcbi8vIHRzbGludDpkaXNhYmxlOm5vLWR1cGxpY2F0ZS1pbXBvcnRzXG4vLyBAdHMtaWdub3JlIChsb29rIGF0IHRzY29uZmlnKVxuaW1wb3J0IHsgZGVmYXVsdCBhcyBfcm9sbHVwTW9tZW50LCBNb21lbnQgfSBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgdW5pdE9mVGltZSB9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL2xvY2FsZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vbG9jYWxlcy9ydS1SVSc7XG5pbXBvcnQgeyBJRm9ybWF0dGVyQ29uZmlnIH0gZnJvbSAnLi9sb2NhbGVzL0lGb3JtYXR0ZXJDb25maWcnO1xuXG5cbmNvbnN0IG1vbWVudCA9IF9yb2xsdXBNb21lbnQgfHwgX21vbWVudDtcblxuLyoqIENvbmZpZ3VyYWJsZSBvcHRpb25zIGZvciB7QHNlZSBNb21lbnREYXRlQWRhcHRlcn0uICovXG5leHBvcnQgaW50ZXJmYWNlIElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucyB7XG4gICAgLyoqXG4gICAgICogVHVybnMgdGhlIHVzZSBvZiB1dGMgZGF0ZXMgb24gb3Igb2ZmLlxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICB1c2VVdGM6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogd2hldGhlciBzaG91bGQgcGFyc2UgbWV0aG9kIHRyeSBndWVzcyBkYXRlIGZvcm1hdFxuICAgICAqIHtAZGVmYXVsdCBmYWxzZX1cbiAgICAgKi9cbiAgICBmaW5kRGF0ZUZvcm1hdDogYm9vbGVhbjtcbn1cblxuLyoqIEluamVjdGlvblRva2VuIGZvciBtb21lbnQgZGF0ZSBhZGFwdGVyIHRvIGNvbmZpZ3VyZSBvcHRpb25zLiAqL1xuZXhwb3J0IGNvbnN0IE1DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnM+KFxuICAgICdNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMnLCB7XG4gICAgICAgIHByb3ZpZGVkSW46ICdyb290JyxcbiAgICAgICAgZmFjdG9yeTogTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUllcbiAgICB9KTtcblxuLyoqIEBkb2NzLXByaXZhdGUgKi9cbi8vIHRzbGludDpkaXNhYmxlOm5hbWluZy1jb252ZW50aW9uXG5leHBvcnQgZnVuY3Rpb24gTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TX0ZBQ1RPUlkoKTogSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1c2VVdGM6IGZhbHNlLFxuICAgICAgICBmaW5kRGF0ZUZvcm1hdDogZmFsc2VcbiAgICB9O1xufVxuXG4vKiogQ3JlYXRlcyBhbiBhcnJheSBhbmQgZmlsbHMgaXQgd2l0aCB2YWx1ZXMuICovXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICAgIGNvbnN0IHZhbHVlc0FycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWVzQXJyYXlbaV0gPSB2YWx1ZUZ1bmN0aW9uKGkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXNBcnJheTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGVBZGFwdGVyIGV4dGVuZHMgRGF0ZUFkYXB0ZXI8TW9tZW50PiB7XG4gICAgcHJpdmF0ZSBtZXNzYWdlZm9ybWF0OiBNZXNzYWdlRm9ybWF0O1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBpbnZhbGlkRGF0ZUVycm9yVGV4dDogc3RyaW5nID0gJ0ludmFsaWQgZGF0ZSc7XG5cbiAgICBwcml2YXRlIGZvcm1hdHRlckNvbmZpZzogSUZvcm1hdHRlckNvbmZpZztcblxuICAgIHByaXZhdGUgZ2V0IG1vbWVudFdpdGhMb2NhbGUoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbGVEYXRhOiB7XG4gICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBudW1iZXI7XG4gICAgICAgIGxvbmdNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydE1vbnRoczogc3RyaW5nW107XG4gICAgICAgIGRhdGVzOiBzdHJpbmdbXTtcbiAgICAgICAgbG9uZ0RheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdO1xuICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfREFURV9MT0NBTEUpIGRhdGVMb2NhbGU6IHN0cmluZyxcbiAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlMpIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9ucz86IElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9uc1xuICAgICkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2V0TG9jYWxlKGRhdGVMb2NhbGUgfHwgbW9tZW50LmxvY2FsZSgpKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ3VyZVRyYW5zbGF0b3IodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHNldExvY2FsZShsb2NhbGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlckNvbmZpZyA9IGxvY2FsZSA9PT0gJ2VuJyA/IGVuVVMgOiBydVJVO1xuXG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuZm9ybWF0dGVyQ29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmZvcm1hdHRlckNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9jYWxlRGF0YSA9IHtcbiAgICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLmZpcnN0RGF5T2ZXZWVrKCksXG4gICAgICAgICAgICBsb25nTW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRocygpLFxuICAgICAgICAgICAgc2hvcnRNb250aHM6IG1vbWVudExvY2FsZURhdGEubW9udGhzU2hvcnQoKSxcbiAgICAgICAgICAgIGRhdGVzOiByYW5nZSgzMSwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZSgyMDE3LCAwLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRMb2NhbGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHNldExvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSBsb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHVwZGF0ZUxvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSB7IC4uLnRoaXMubG9jYWxlRGF0YSwgLi4ubG9jYWxlRGF0YSB9O1xuICAgIH1cblxuICAgIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpO1xuICAgIH1cblxuICAgIGdldE1vbnRoKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1vbnRoKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7XG4gICAgfVxuXG4gICAgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTtcbiAgICB9XG5cbiAgICBnZXRNaW51dGVzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbnV0ZXMoKTtcbiAgICB9XG5cbiAgICBnZXRTZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnNlY29uZHMoKTtcbiAgICB9XG5cbiAgICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWlsbGlzZWNvbmRzKCk7XG4gICAgfVxuXG4gICAgZ2V0VGltZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gZGF0ZS52YWx1ZU9mKCk7XG4gICAgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpO1xuICAgIH1cblxuICAgIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXNcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZycgPyB0aGlzLmxvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMubG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgICB9XG5cbiAgICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmRhdGVzO1xuICAgIH1cblxuICAgIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7IHJldHVybiB0aGlzLmxvY2FsZURhdGEubG9uZ0RheXNPZldlZWs7IH1cblxuICAgICAgICBpZiAoc3R5bGUgPT09ICdzaG9ydCcpIHsgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgICAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZU1vbWVudCh7eWVhciwgbW9udGgsIGRhdGV9KS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlcixcbiAgICAgICAgbWludXRlczogbnVtYmVyLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIsXG4gICAgICAgIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogTW9tZW50IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgICAgbmV3RGF0ZS5ob3Vycyhob3Vycyk7XG4gICAgICAgIG5ld0RhdGUubWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgbmV3RGF0ZS5zZWNvbmRzKHNlY29uZHMpO1xuICAgICAgICBuZXdEYXRlLm1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBuZXdEYXRlO1xuICAgIH1cblxuICAgIHRvZGF5KCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maW5kRGF0ZUZvcm1hdCkgeyByZXR1cm4gdGhpcy5maW5kRm9ybWF0KHZhbHVlKTsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRm9ybWF0XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9ybWF0KGRhdGU6IE1vbWVudCwgZGlzcGxheUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIHllYXJzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFycyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBNb21lbnQsIG1vbnRoczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBNb21lbnQsIGRheXM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXMgfSk7XG4gICAgfVxuXG4gICAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICAgIH1cblxuICAgIC8qKiBodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBkYXRlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IGFzc3VtZXMgdGhhdCBjbG9uaW5nIGFsc28gc2V0cyB0aGUgY29ycmVjdCBsb2NhbGUuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbW9tZW50LmlzTW9tZW50KG9iaik7XG4gICAgfVxuXG4gICAgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgcmVsYXRpdmVEYXRlKGRhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSZWxhdGl2ZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKGRhdGUpKSB7IHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTsgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMubW9tZW50V2l0aExvY2FsZTtcblxuICAgICAgICBjb25zdCB0b3RhbFNlY29uZHMgPSBub3cuZGlmZihkYXRlLCAnc2Vjb25kcycpO1xuICAgICAgICBjb25zdCB0b3RhbE1pbnV0ZXMgPSBub3cuZGlmZihkYXRlLCAnbWludXRlcycpO1xuXG4gICAgICAgIGNvbnN0IGlzVG9kYXkgPSBub3cuaXNTYW1lKGRhdGUsICdkYXknKTtcbiAgICAgICAgY29uc3QgaXNZZXN0ZXJkYXkgPSBub3cuYWRkKC0xLCAnZGF5cycpLmlzU2FtZShkYXRlLCAnZGF5Jyk7XG5cbiAgICAgICAgY29uc3QgdGVtcGxhdGVWYXJpYWJsZXMgPSB7Li4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXN9O1xuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoZGF0ZSwgdGVtcGxhdGVWYXJpYWJsZXMpO1xuICAgICAgICBsZXQgbmV3VGVtcGxhdGU7XG5cbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8PSA1OSkgeyAvLyBzZWNvbmRzIGFnb1xuICAgICAgICAgICAgdmFyaWFibGVzLlNFQ09ORFNfUEFTU0VEID0gdG90YWxTZWNvbmRzO1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5TRUNPTkRTX0FHTztcblxuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsTWludXRlcyA8PSA1OSkgeyAvLyBtaW51dGVzIGFnb1xuICAgICAgICAgICAgdmFyaWFibGVzLk1JTlVURVNfUEFTU0VEID0gdG90YWxNaW51dGVzO1xuICAgICAgICAgICAgbmV3VGVtcGxhdGUgPSB0ZW1wbGF0ZS5NSU5VVEVTX0FHTztcblxuICAgICAgICB9IGVsc2UgaWYgKGlzVG9kYXkpIHsgLy8gdG9kYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuVE9EQVk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1llc3RlcmRheSkgeyAvLyB5ZXN0ZXJkYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuWUVTVEVSREFZO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGJlZm9yZSB5ZXN0ZXJkYXlcbiAgICAgICAgICAgIG5ld1RlbXBsYXRlID0gdGVtcGxhdGUuQkVGT1JFX1lFU1RFUkRBWTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZShuZXdUZW1wbGF0ZSkodmFyaWFibGVzKTtcbiAgICB9XG5cbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZURhdGUoZGF0ZSwgdGhpcy5mb3JtYXR0ZXJDb25maWcucmVsYXRpdmVUZW1wbGF0ZXMuc2hvcnQpO1xuICAgIH1cblxuICAgIHJlbGF0aXZlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJlbGF0aXZlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIGFic29sdXRlRGF0ZShcbiAgICAgICAgZGF0ZTogTW9tZW50LFxuICAgICAgICBwYXJhbXM6IElGb3JtYXR0ZXJBYnNvbHV0ZVRlbXBsYXRlLFxuICAgICAgICBkYXRldGltZSA9IGZhbHNlLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBmYWxzZSxcbiAgICAgICAgbWljcm9zZWNvbmRzID0gZmFsc2VcbiAgICApOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXRoaXMuaXNEYXRlSW5zdGFuY2UoZGF0ZSkpIHsgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpOyB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGRhdGUsIHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi5wYXJhbXMudmFyaWFibGVzIH0pO1xuXG4gICAgICAgIHZhcmlhYmxlcy5TSE9XX01JTExJU0VDT05EUyA9IG1pbGxpc2Vjb25kcyA/ICd5ZXMnIDogJ25vJztcbiAgICAgICAgdmFyaWFibGVzLlNIT1dfTUlDUk9TRUNPTkRTID0gbWljcm9zZWNvbmRzID8gJ3llcycgOiAnbm8nO1xuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gZGF0ZXRpbWUgPyBwYXJhbXMuREFURVRJTUUgOiBwYXJhbXMuREFURTtcblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUpKHZhcmlhYmxlcyk7XG4gICAgfVxuXG4gICAgYWJzb2x1dGVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0KTtcbiAgICB9XG5cbiAgICBhYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPzogSUFic29sdXRlRGF0ZVRpbWVPcHRpb25zKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKFxuICAgICAgICAgICAgZGF0ZSxcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLnNob3J0LFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIG9wdGlvbnM/Lm1pY3Jvc2Vjb25kc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGFic29sdXRlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWJzb2x1dGVEYXRlKGRhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLmFic29sdXRlVGVtcGxhdGVzLmxvbmcpO1xuICAgIH1cblxuICAgIGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IE1vbWVudCwgb3B0aW9ucz86IElBYnNvbHV0ZURhdGVUaW1lT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmFic29sdXRlRGF0ZShcbiAgICAgICAgICAgIGRhdGUsXG4gICAgICAgICAgICB0aGlzLmZvcm1hdHRlckNvbmZpZy5hYnNvbHV0ZVRlbXBsYXRlcy5sb25nLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIG9wdGlvbnM/Lm1pbGxpc2Vjb25kcyxcbiAgICAgICAgICAgIG9wdGlvbnM/Lm1pY3Jvc2Vjb25kc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIG9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU6IE1vbWVudCB8IG51bGwsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIW1vbWVudC5pc01vbWVudChzdGFydERhdGUpICYmICFtb21lbnQuaXNNb21lbnQoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsgLi4udGhpcy5mb3JtYXR0ZXJDb25maWcudmFyaWFibGVzLCAuLi50ZW1wbGF0ZS52YXJpYWJsZXMgfTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGlmIChzdGFydERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhzdGFydERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgU1RBUlRfREFURTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURSkoc3RhcnREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seVN0YXJ0J1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChlbmREYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG5cbiAgICAgICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICAgICAgRU5EX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seUVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICBvcGVuZWRSYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZTogTW9tZW50IHwgbnVsbCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghbW9tZW50LmlzTW9tZW50KHN0YXJ0RGF0ZSkgJiYgIW1vbWVudC5pc01vbWVudChlbmREYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHRoaXMuaW52YWxpZERhdGVFcnJvclRleHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyAuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlcyB9O1xuICAgICAgICBsZXQgcGFyYW1zID0ge307XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcblxuICAgICAgICAgICAgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIC4uLnZhcmlhYmxlcyxcbiAgICAgICAgICAgICAgICBTVEFSVF9EQVRFVElNRTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuU1RBUlRfREFURVRJTUUpKHN0YXJ0RGF0ZVZhcmlhYmxlcyksXG4gICAgICAgICAgICAgICAgUkFOR0VfVFlQRTogJ29ubHlTdGFydCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoZW5kRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuXG4gICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udmFyaWFibGVzLFxuICAgICAgICAgICAgICAgIEVORF9EQVRFVElNRTogdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuRU5EX0RBVEVUSU1FKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgICAgICBSQU5HRV9UWVBFOiAnb25seUVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZXNzYWdlZm9ybWF0LmNvbXBpbGUodGVtcGxhdGUuREFURVRJTUUpKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmFuZ2VEYXRlKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHRlbXBsYXRlOiBJRm9ybWF0dGVyUmFuZ2VUZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIGlmICghdGhpcy5pc0RhdGVJbnN0YW5jZShzdGFydERhdGUpIHx8ICF0aGlzLmlzRGF0ZUluc3RhbmNlKGVuZERhdGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5pbnZhbGlkRGF0ZUVycm9yVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IC4uLnRoaXMuZm9ybWF0dGVyQ29uZmlnLnZhcmlhYmxlcywgLi4udGVtcGxhdGUudmFyaWFibGVzIH07XG4gICAgICAgIGNvbnN0IHNhbWVNb250aCA9IHRoaXMuaXNTYW1lKCdtb250aCcsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG5cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKHN0YXJ0RGF0ZSwgdmFyaWFibGVzKTtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG5cbiAgICAgICAgY29uc3QgZW5kRGF0ZVZhcmlhYmxlcyA9IHRoaXMuY29tcGlsZVZhcmlhYmxlcyhlbmREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLlNBTUVfTU9OVEggPSBzYW1lTW9udGg7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAuLi52YXJpYWJsZXMsXG4gICAgICAgICAgICBTVEFSVF9EQVRFOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5TVEFSVF9EQVRFKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgRU5EX0RBVEU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLkVORF9EQVRFKShlbmREYXRlVmFyaWFibGVzKSxcbiAgICAgICAgICAgIFNBTUVfTU9OVEg6IHNhbWVNb250aFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFKShwYXJhbXMpO1xuICAgIH1cblxuICAgIHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGU6IElGb3JtYXR0ZXJSYW5nZVRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGF0ZUluc3RhbmNlKHN0YXJ0RGF0ZSkgfHwgIXRoaXMuaXNEYXRlSW5zdGFuY2UoZW5kRGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcih0aGlzLmludmFsaWREYXRlRXJyb3JUZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHsuLi50aGlzLmZvcm1hdHRlckNvbmZpZy52YXJpYWJsZXMsIC4uLnRlbXBsYXRlLnZhcmlhYmxlc307XG4gICAgICAgIGNvbnN0IHNhbWVNb250aCA9IHRoaXMuaXNTYW1lKCdtb250aCcsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgICAgIGNvbnN0IHNhbWVEYXkgPSB0aGlzLmlzU2FtZSgnZGF5Jywgc3RhcnREYXRlLCBlbmREYXRlKTtcblxuICAgICAgICBjb25zdCBzdGFydERhdGVWYXJpYWJsZXMgPSB0aGlzLmNvbXBpbGVWYXJpYWJsZXMoc3RhcnREYXRlLCB2YXJpYWJsZXMpO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgc3RhcnREYXRlVmFyaWFibGVzLlNBTUVfREFZID0gc2FtZURheTtcblxuICAgICAgICBjb25zdCBlbmREYXRlVmFyaWFibGVzID0gdGhpcy5jb21waWxlVmFyaWFibGVzKGVuZERhdGUsIHZhcmlhYmxlcyk7XG4gICAgICAgIGVuZERhdGVWYXJpYWJsZXMuU0FNRV9NT05USCA9IHNhbWVNb250aDtcbiAgICAgICAgZW5kRGF0ZVZhcmlhYmxlcy5TQU1FX0RBWSA9IHNhbWVEYXk7XG5cbiAgICAgICAgY29uc3QgYm90aEN1cnJlbnRZZWFyID0gc3RhcnREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9PT0gJ3llcycgJiYgZW5kRGF0ZVZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPT09ICd5ZXMnO1xuICAgICAgICBzdGFydERhdGVWYXJpYWJsZXMuQ1VSUkVOVF9ZRUFSID0gYm90aEN1cnJlbnRZZWFyID8gJ3llcycgOiAnbm8nO1xuICAgICAgICBlbmREYXRlVmFyaWFibGVzLkNVUlJFTlRfWUVBUiA9IGJvdGhDdXJyZW50WWVhciA/ICd5ZXMnIDogJ25vJztcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSB7Li4udmFyaWFibGVzLFxuICAgICAgICAgICAgU1RBUlRfREFURVRJTUU6IHRoaXMubWVzc2FnZWZvcm1hdC5jb21waWxlKHRlbXBsYXRlLlNUQVJUX0RBVEVUSU1FKShzdGFydERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgRU5EX0RBVEVUSU1FOiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5FTkRfREFURVRJTUUpKGVuZERhdGVWYXJpYWJsZXMpLFxuICAgICAgICAgICAgU0FNRV9NT05USDogc2FtZU1vbnRoLFxuICAgICAgICAgICAgU0FNRV9EQVk6IHNhbWVEYXl9O1xuXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2Vmb3JtYXQuY29tcGlsZSh0ZW1wbGF0ZS5EQVRFVElNRSkocGFyYW1zKTtcbiAgICB9XG5cbiAgICByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5zaG9ydCk7XG4gICAgfVxuXG4gICAgcmFuZ2VTaG9ydERhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHJhbmdlVGVtcGxhdGVzID0gdGhpcy5mb3JtYXR0ZXJDb25maWcucmFuZ2VUZW1wbGF0ZXM7XG5cbiAgICAgICAgaWYgKHN0YXJ0RGF0ZSAmJiBlbmREYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yYW5nZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcmFuZ2VUZW1wbGF0ZXMuY2xvc2VkUmFuZ2Uuc2hvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2Uuc2hvcnQpO1xuICAgIH1cblxuICAgIHJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgcmFuZ2VUZW1wbGF0ZXMgPSB0aGlzLmZvcm1hdHRlckNvbmZpZy5yYW5nZVRlbXBsYXRlcztcblxuICAgICAgICBpZiAoc3RhcnREYXRlICYmIGVuZERhdGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSB8fCBudWxsLCByYW5nZVRlbXBsYXRlcy5vcGVuZWRSYW5nZS5sb25nKTtcbiAgICB9XG5cbiAgICByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCByYW5nZVRlbXBsYXRlcyA9IHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzO1xuXG4gICAgICAgIGlmIChzdGFydERhdGUgJiYgZW5kRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLmxvbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUgfHwgbnVsbCwgcmFuZ2VUZW1wbGF0ZXMub3BlbmVkUmFuZ2UubG9uZyk7XG4gICAgfVxuXG4gICAgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRoaXMuZm9ybWF0dGVyQ29uZmlnLnJhbmdlVGVtcGxhdGVzLmNsb3NlZFJhbmdlLm1pZGRsZSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYSBNb21lbnQgaW5zdGFuY2Ugd2hpbGUgcmVzcGVjdGluZyB0aGUgY3VycmVudCBVVEMgc2V0dGluZ3MuICovXG4gICAgcHJpdmF0ZSBjcmVhdGVNb21lbnQoLi4uYXJnczogYW55W10pOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXNlVXRjKSA/IG1vbWVudC51dGMoLi4uYXJncykgOiBtb21lbnQoLi4uYXJncyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21waWxlVmFyaWFibGVzKGRhdGU6IE1vbWVudCwgdmFyaWFibGVzOiBhbnkpOiBhbnkge1xuICAgICAgICBjb25zdCBjb21waWxlZFZhcmlhYmxlczogYW55ID0ge307XG5cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZvci1pblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB2YXJpYWJsZXMpIHtcbiAgICAgICAgICAgIGlmICghdmFyaWFibGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2YXJpYWJsZXNba2V5XTtcbiAgICAgICAgICAgIGNvbXBpbGVkVmFyaWFibGVzW2tleV0gPSBkYXRlLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb21waWxlZFZhcmlhYmxlcy5DVVJSRU5UX1lFQVIgPSB0aGlzLmlzQ3VycmVudFllYXIoZGF0ZSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbXBpbGVkVmFyaWFibGVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNDdXJyZW50WWVhcih2YWx1ZTogTW9tZW50KTogJ3llcycgfCAnbm8nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9tZW50V2l0aExvY2FsZS5pc1NhbWUodmFsdWUsICd5ZWFyJykgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NhbWUodW5pdDogdW5pdE9mVGltZS5TdGFydE9mLCBzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0RGF0ZS5pc1NhbWUoZW5kRGF0ZSwgdW5pdCkgPyAneWVzJyA6ICdubyc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb25maWd1cmVUcmFuc2xhdG9yKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVzc2FnZWZvcm1hdCA9IG5ldyBNZXNzYWdlRm9ybWF0KGxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmaW5kRm9ybWF0KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIC8vIGRlZmF1bHQgdGVzdCAtIGlzb1xuICAgICAgICBjb25zdCBpc29EYXRlID0gIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEsIHRoaXMubG9jYWxlKTtcblxuICAgICAgICBpZiAoaXNvRGF0ZS5pc1ZhbGlkKCkpIHsgcmV0dXJuIGlzb0RhdGU7IH1cblxuICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWUpKSB7XG4gICAgICAgICAgICAvLyB1bml4IHRpbWUgc2VjXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdYJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbG9uZyBtb250aHMgbmFtaW5nOiBEIE1NTSBZWVlZLCBNTU0gRG8gWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAvXlxcZHsxLDJ9XFxzXFxTK1xccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKSB8fFxuICAgICAgICAgICAgL15cXFMrXFxzXFxkezEsMn1bYS16XXsyfVxccyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUudHJpbSgpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNwYWNlKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsYXNoIG5vdGF0aW9uOiBERC9NTS9ZWVlZLCBNTS9ERC9ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwvXFxkezEsMn1cXC8oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU2xhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGFzaCBub3RhdGlvbjogREQtTU0tWVlZWSwgWVlZWS1ERC1NTSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoLyheKFxcZHsxLDJ9fFxcZHs0fSktXFxkezEsMn0tXFxkezEsMn0kKXwoXlxcZHsxLDJ9LVxcZHsxLDJ9LShcXGR7Mn18XFxkezR9KSQpLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvdCBub3RhdGlvbjogREQuTU0uWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcLlxcZHsxLDJ9XFwuKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERvdCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNwYWNlKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyAxNiBGZWIgMjAxOSB2cyBGZWIgMTZ0aCAyMDE5LCBjb3ZlcnMgRmViIGFuZCBGZWJydWFyeSBjYXNlc1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnRCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU1NTSBEbyBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aFNsYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY2FsZSkge1xuICAgICAgICAgICAgY2FzZSAncnUnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB0b2RvIGRvIHdlIHVzZSBnZW5lcmFsaXplZCBsb2NhbGVzPyBlbiB2cyBlbi1VUzsgdW50aWwgbm90IHdlIHRyeSB0byBndWVzc1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIFVTIHZzIFVLXG4gICAgICAgICAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0c0NvdW50ID0gMztcbiAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoICE9PSBkYXRlUGFydHNDb3VudCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RQYXJ0ID0gcGFydHNbMF0udHJpbSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlY29uZFBhcnQgPSBwYXJ0c1sxXS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOdW1lcmljKGZpcnN0UGFydCkgfHwgIXRoaXMuaXNOdW1lcmljKHNlY29uZFBhcnQpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb250aHNJblllYXJzID0gMTI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW5GaXJzdEJlTW9udGggPSArZmlyc3RQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FuU2Vjb25kQnlNb250aCA9ICtzZWNvbmRQYXJ0IDw9IG1vbnRoc0luWWVhcnM7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCB0d28gcGFydHMgY2Fubm90IGJlIG1vbnRoXG4gICAgICAgICAgICAgICAgaWYgKCFjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGgpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkRldGVybWluZVdoZXJlTW9udGggPSBjYW5GaXJzdEJlTW9udGggJiYgY2FuU2Vjb25kQnlNb250aDtcblxuICAgICAgICAgICAgICAgIC8vIHVzZSBVUyBmb3JtYXQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGlmIChjYW5EZXRlcm1pbmVXaGVyZU1vbnRoKSB7IHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSk7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBjYW5GaXJzdEJlTW9udGggJiYgIWNhblNlY29uZEJ5TW9udGhcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NL0REL1lZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0REL01NL1lZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGxlYWRpbmcgeWVhciB2cyBmaW5pc2hpbmcgeWVhclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCctJyk7XG4gICAgICAgIGlmIChwYXJ0c1swXS5sZW5ndGggPT09IDApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICBjb25zdCBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudCA9IDI7XG5cbiAgICAgICAgcmV0dXJuIHBhcnRzWzBdLmxlbmd0aCA8PSBtYXhEYXlPck1vbnRoQ2hhcnNDb3VudFxuICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELU1NLVlZWVknLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdZWVlZLU1NLUREJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoRG90KHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gY292ZXJzIHR3byBjYXNlcyBZWVlZIGFuZCBZWSAoZm9yIGN1cnJlbnQgeWVhcilcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQuTU0uWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICB9XG59XG4iXX0=