/**
 * @license
 * Positive Technologies All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license.
 */
import { __decorate, __param, __metadata } from 'tslib';
import { Inject, Injectable, InjectionToken, Optional, NgModule } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE, MC_DATE_FORMATS } from '@ptsecurity/cdk/datetime';
import * as MessageFormat from 'messageformat';
import * as _rollupMoment from 'moment';
import _rollupMoment__default, {  } from 'moment';

const enUS = {
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
            END_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}}
                                        other{{SHORT_DATE}, {YEAR}}
                                }}
                        }`,
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {SHORT_DATE}}
                                        other{{TIME}, {SHORT_DATE}, {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        middle: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE}, {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {DATE}}
                                        other{{TIME}, {DATE}, {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        long: {
            START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
            END_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE}, {YEAR}}
                                }}
                        }`,
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, from{NBSP}{TIME}}
                                        other{{DATE}, {YEAR}, from{NBSP}{TIME}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{to{NBSP}{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE}, {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME} {END_DATETIME}}
                                other{From {START_DATETIME} to{NBSP}{END_DATETIME}}
                        }`
        }
    }
};

const ruRU = {
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
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}}
                                        other{{SHORT_DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {SHORT_DATE}}
                                        other{{TIME}, {SHORT_DATE} {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{SHORT_DATE}, {TIME}}
                                        other{{SHORT_DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        middle: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{TIME}, {DATE}}
                                        other{{TIME}, {DATE} {YEAR}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME}{DASH}{END_DATETIME}}
                                other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}
                        }`
        },
        long: {
            START_DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{DAY}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}}
                                        other{{DATE} {YEAR}}
                                }}
                        }`,
            END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
            DATE: `{
                            SAME_MONTH,
                            select,
                                yes{{START_DATE}{DASH}{END_DATE}}
                                other{{START_DATE}{LONG_DASH}{END_DATE}}
                        }`,
            START_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, с{NBSP}{TIME}}
                                        other{{DATE} {YEAR}, с{NBSP}{TIME}}
                                }}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            END_DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{по{NBSP}{TIME}}
                                other{{
                                    CURRENT_YEAR,
                                    select,
                                        yes{{DATE}, {TIME}}
                                        other{{DATE} {YEAR}, {TIME}}
                                }}
                        }`,
            DATETIME: `{
                            SAME_DAY,
                            select,
                                yes{{START_DATETIME} {END_DATETIME}}
                                other{С{NBSP}{START_DATETIME} по{NBSP}{END_DATETIME}}
                        }`
        }
    }
};

const moment = _rollupMoment__default || _rollupMoment;
/** InjectionToken for moment date adapter to configure options. */
const MC_MOMENT_DATE_ADAPTER_OPTIONS = new InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
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
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
let MomentDateAdapter = class MomentDateAdapter extends DateAdapter {
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
            dates: range(31, (i) => this.createDate(2017, 0, i + 1).format('D')),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
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
    today() {
        return this.createMoment().locale(this.locale);
    }
    parse(value, parseFormat) {
        // tslint:disable:triple-equals
        if (value && typeof value == 'string') {
            return this.createMoment(value, parseFormat, this.locale);
        }
        return value ? this.createMoment(value).locale(this.locale) : null;
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
        const templateVariables = Object.assign({}, this.formatterConfig.variables, template.variables);
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
    absoluteDate(date, params, datetime = false) {
        if (!this.isDateInstance(date)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign({}, this.formatterConfig.variables, params.variables);
        const template = datetime ? params.DATETIME : params.DATE;
        return this.messageformat.compile(template)(this.compileVariables(date, variables));
    }
    absoluteShortDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
    }
    absoluteShortDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true);
    }
    absoluteLongDate(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
    }
    absoluteLongDateTime(date) {
        return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true);
    }
    rangeDate(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign({}, this.formatterConfig.variables, template.variables);
        const sameMonth = this.isSame('month', startDate, endDate);
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        const params = Object.assign({}, variables, { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
        return this.messageformat.compile(template.DATE)(params);
    }
    rangeDateTime(startDate, endDate, template) {
        if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
            throw new Error(this.invalidDateErrorText);
        }
        const variables = Object.assign({}, this.formatterConfig.variables, template.variables);
        const sameMonth = this.isSame('month', startDate, endDate);
        const sameDay = this.isSame('day', startDate, endDate);
        const startDateVariables = this.compileVariables(startDate, variables);
        startDateVariables.SAME_MONTH = sameMonth;
        startDateVariables.SAME_DAY = sameDay;
        const endDateVariables = this.compileVariables(endDate, variables);
        endDateVariables.SAME_MONTH = sameMonth;
        endDateVariables.SAME_DAY = sameDay;
        const params = Object.assign({}, variables, { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
        return this.messageformat.compile(template.DATETIME)(params);
    }
    rangeShortDate(startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    }
    rangeShortDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.short);
    }
    rangeLongDate(startDate, endDate) {
        return this.rangeDate(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    }
    rangeLongDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.long);
    }
    rangeMiddleDateTime(startDate, endDate) {
        return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.middle);
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
};
MomentDateAdapter = __decorate([
    Injectable(),
    __param(0, Optional()), __param(0, Inject(MC_DATE_LOCALE)),
    __param(1, Optional()), __param(1, Inject(MC_MOMENT_DATE_ADAPTER_OPTIONS)),
    __metadata("design:paramtypes", [String, Object])
], MomentDateAdapter);

const MC_MOMENT_DATE_FORMATS = {
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

let MomentDateModule = class MomentDateModule {
};
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
const ɵ0 = MC_MOMENT_DATE_FORMATS;
let McMomentDateModule = class McMomentDateModule {
};
McMomentDateModule = __decorate([
    NgModule({
        imports: [MomentDateModule],
        providers: [{
                provide: MC_DATE_FORMATS, useValue: ɵ0
            }]
    })
], McMomentDateModule);

/**
 * Generated bundle index. Do not edit.
 */

export { MomentDateModule, McMomentDateModule, ɵ0, MC_MOMENT_DATE_ADAPTER_OPTIONS, MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY, MomentDateAdapter, MC_MOMENT_DATE_FORMATS };
//# sourceMappingURL=mosaic-moment-adapter.js.map
