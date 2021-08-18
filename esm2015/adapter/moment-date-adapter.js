import { __decorate, __metadata } from "tslib";
// tslint:disable:no-magic-numbers
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DateAdapter, MC_DATE_LOCALE } from '@ptsecurity/cdk/datetime';
import { DateFormatter } from '@ptsecurity/mosaic/core';
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
// @ts-ignore
export function DeprecatedMethod(target, key, descriptor) {
    const origin = descriptor.value;
    // tslint:disable-next-line:no-function-expression only-arrow-functions
    descriptor.value = function (...args) {
        console.warn(`Found use of deprecated method ${key}, it was moved in DateFormatter. ` +
            `The deprecated method will be removed in 13.0.0.`);
        return origin.apply(this, args);
    };
    return descriptor;
}
export class MomentDateAdapter extends DateAdapter {
    constructor(dateLocale, options) {
        super();
        this.options = options;
        this.firstMonth = 0;
        this.setLocale(dateLocale || moment.locale());
    }
    get lastMonth() {
        // tslint:disable-next-line:binary-expression-operand-order no-magic-numbers
        return 11 + this.firstMonth;
    }
    setLocale(locale) {
        super.setLocale(locale);
        this.dateFormatter = new DateFormatter(this, locale);
        this.config = locale === 'en' ? enUS : ruRU;
        let momentLocaleData = moment.localeData(locale);
        // This is our customs translations
        const i18nLocals = ['en', 'ru'];
        if (i18nLocals.indexOf(locale) !== -1) {
            momentLocaleData = moment.updateLocale(locale, {
                monthsShort: {
                    format: this.config.monthNames.short.formatted,
                    standalone: this.config.monthNames.short.standalone
                },
                weekdays: this.config.dayOfWeekNames.long,
                weekdaysShort: this.config.dayOfWeekNames.short,
                weekdaysMin: this.config.dayOfWeekNames.narrow
            });
        }
        this.localeData = {
            firstDayOfWeek: this.config.firstDayOfWeek,
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (i) => this.createDate(2017, this.firstMonth, i + 1).format('D')),
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
    getYear(date) { return this.clone(date).year(); }
    getMonth(date) { return this.clone(date).month(); }
    getDate(date) { return this.clone(date).date(); }
    getHours(date) { return this.clone(date).hours(); }
    getMinutes(date) { return this.clone(date).minutes(); }
    getSeconds(date) { return this.clone(date).seconds(); }
    getMilliseconds(date) { return this.clone(date).milliseconds(); }
    getTime(date) { return date.valueOf(); }
    getDayOfWeek(date) { return this.clone(date).day(); }
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
    createDate(year, month = 0, date = 1) {
        // Moment.js will create an invalid date if any of the components are out of bounds, but we
        // explicitly check each case so we can throw more descriptive errors.
        if (month < this.firstMonth || month > this.lastMonth) {
            throw Error(`Invalid month index "${month}".
                Month index has to be between ${this.firstMonth} and ${this.lastMonth}.`);
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
            if (typeof value === 'string') {
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
    hasSame(startDate, endDate, unit) {
        return startDate.isSame(endDate, unit);
    }
    diffNow(date, unit) {
        return date.diff(this.today(), unit);
    }
    absoluteDate(date, params, datetime, milliseconds) {
        return this.dateFormatter.absoluteDate(date, params, datetime, milliseconds);
    }
    absoluteLongDate(date) {
        return this.dateFormatter.absoluteLongDate(date);
    }
    absoluteLongDateTime(date, options) {
        return this.dateFormatter.absoluteLongDateTime(date, options);
    }
    absoluteShortDate(date) {
        return this.dateFormatter.absoluteShortDate(date);
    }
    absoluteShortDateTime(date, options) {
        return this.dateFormatter.absoluteShortDateTime(date, options);
    }
    openedRangeDate(startDate, endDate, template) {
        return this.dateFormatter.openedRangeDate(startDate, endDate, template);
    }
    openedRangeDateTime(startDate, endDate, template) {
        return this.dateFormatter.openedRangeDateTime(startDate, endDate, template);
    }
    rangeDate(startDate, endDate, template) {
        return this.dateFormatter.rangeDate(startDate, endDate, template);
    }
    rangeDateTime(startDate, endDate, template) {
        return this.dateFormatter.rangeDateTime(startDate, endDate, template);
    }
    rangeLongDate(startDate, endDate) {
        return this.dateFormatter.rangeLongDate(startDate, endDate);
    }
    rangeLongDateTime(startDate, endDate) {
        return this.dateFormatter.rangeLongDateTime(startDate, endDate);
    }
    rangeMiddleDateTime(startDate, endDate) {
        return this.dateFormatter.rangeMiddleDateTime(startDate, endDate);
    }
    rangeShortDate(startDate, endDate) {
        return this.dateFormatter.rangeShortDate(startDate, endDate);
    }
    rangeShortDateTime(startDate, endDate) {
        return this.dateFormatter.rangeShortDateTime(startDate, endDate);
    }
    relativeDate(date, template) {
        return this.dateFormatter.relativeDate(date, template);
    }
    relativeLongDate(date) {
        return this.dateFormatter.relativeLongDate(date);
    }
    relativeShortDate(date) {
        return this.dateFormatter.relativeShortDate(date);
    }
    /** Creates a Moment instance while respecting the current UTC settings. */
    createMoment(...args) {
        var _a;
        return ((_a = this.options) === null || _a === void 0 ? void 0 : _a.useUtc) ? moment.utc(...args) : moment(...args);
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
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Boolean, Boolean]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteLongDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteShortDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "absoluteShortDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "openedRangeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "openedRangeDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeLongDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeMiddleDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeShortDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "rangeShortDateTime", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeLongDate", null);
__decorate([
    DeprecatedMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], MomentDateAdapter.prototype, "relativeShortDate", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBc0IsTUFBTSxRQUFRLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd2QyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDO0FBZ0J4QyxtRUFBbUU7QUFDbkUsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQzVELGdDQUFnQyxFQUFFO0lBQzlCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxzQ0FBc0M7Q0FDbEQsQ0FBQyxDQUFDO0FBRVAsb0JBQW9CO0FBQ3BCLG1DQUFtQztBQUNuQyxNQUFNLFVBQVUsc0NBQXNDO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLGNBQWMsRUFBRSxLQUFLO0tBQ3hCLENBQUM7QUFDTixDQUFD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LGtEQUFrRDtRQUNsRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBL2NKLFVBQVU7Ozs7eUNBc0JGLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYzs0Q0FDakMsUUFBUSxZQUFJLE1BQU0sU0FBQyw4QkFBOEI7O0FBZ1B0RDtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs2REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs4REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt3REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztrREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt1REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzsyREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRlQWRhcHRlcixcbiAgICBNQ19EQVRFX0xPQ0FMRVxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbi8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHJvbGx1cCBpcyB1c2VkLCBtb21lbnQgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgZGlmZmVyZW50bHkuXG4vLyBTaW5jZSBNb21lbnQuanMgZG9lc24ndCBoYXZlIGEgZGVmYXVsdCBleHBvcnQsIHdlIG5vcm1hbGx5IG5lZWQgdG8gaW1wb3J0IHVzaW5nIHRoZSBgKiBhc2Bcbi8vIHN5bnRheC4gSG93ZXZlciwgcm9sbHVwIGNyZWF0ZXMgYSBzeW50aGV0aWMgZGVmYXVsdCBtb2R1bGUgYW5kIHdlIHRodXMgbmVlZCB0byBpbXBvcnQgaXQgdXNpbmdcbi8vIHRoZSBgZGVmYXVsdCBhc2Agc3ludGF4LlxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tZHVwbGljYXRlLWltcG9ydHNcbi8vIEB0cy1pZ25vcmUgKGxvb2sgYXQgdHNjb25maWcpXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9yb2xsdXBNb21lbnQsIE1vbWVudCwgdW5pdE9mVGltZSB9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL2xvY2FsZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vbG9jYWxlcy9ydS1SVSc7XG5cblxuY29uc3QgbW9tZW50ID0gX3JvbGx1cE1vbWVudCB8fCBfbW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiB3aGV0aGVyIHNob3VsZCBwYXJzZSBtZXRob2QgdHJ5IGd1ZXNzIGRhdGUgZm9ybWF0XG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIGZpbmREYXRlRm9ybWF0OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucz4oXG4gICAgJ01DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2UsXG4gICAgICAgIGZpbmREYXRlRm9ybWF0OiBmYWxzZVxuICAgIH07XG59XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gRGVwcmVjYXRlZE1ldGhvZCh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG9yaWdpbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tZXhwcmVzc2lvbiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgRm91bmQgdXNlIG9mIGRlcHJlY2F0ZWQgbWV0aG9kICR7a2V5fSwgaXQgd2FzIG1vdmVkIGluIERhdGVGb3JtYXR0ZXIuIGAgK1xuICAgICAgICAgICAgYFRoZSBkZXByZWNhdGVkIG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTMuMC4wLmBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gb3JpZ2luLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBmaXJzdE1vbnRoOiBudW1iZXIgPSAwO1xuXG4gICAgZ2V0IGxhc3RNb250aCgpOiBudW1iZXIge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmluYXJ5LWV4cHJlc3Npb24tb3BlcmFuZC1vcmRlciBuby1tYWdpYy1udW1iZXJzXG4gICAgICAgIHJldHVybiAxMSArIHRoaXMuZmlyc3RNb250aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRhdGVGb3JtYXR0ZXI6IERhdGVGb3JtYXR0ZXI8TW9tZW50PjtcblxuICAgIHByaXZhdGUgbG9jYWxlRGF0YToge1xuICAgICAgICBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuICAgICAgICBsb25nTW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBkYXRlczogc3RyaW5nW107XG4gICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TKSBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM/OiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldExvY2FsZShkYXRlTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdHRlciA9IG5ldyBEYXRlRm9ybWF0dGVyPE1vbWVudD4odGhpcywgbG9jYWxlKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuY29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nLFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuY29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzTWluOiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5uYXJyb3dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgZmlyc3REYXlPZldlZWs6IHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrLFxuICAgICAgICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgICAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICAgICAgICBkYXRlczogcmFuZ2UoMzEsIChpKSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgdGhpcy5maXJzdE1vbnRoLCBpICsgMSkuZm9ybWF0KCdEJykpLFxuICAgICAgICAgICAgbG9uZ0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXMoKSxcbiAgICAgICAgICAgIHNob3J0RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c1Nob3J0KCksXG4gICAgICAgICAgICBuYXJyb3dEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzTWluKClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXRMb2NhbGVEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHNldExvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSBsb2NhbGVEYXRhO1xuICAgIH1cblxuICAgIHVwZGF0ZUxvY2FsZURhdGEobG9jYWxlRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvY2FsZURhdGEgPSB7IC4uLnRoaXMubG9jYWxlRGF0YSwgLi4ubG9jYWxlRGF0YSB9O1xuICAgIH1cblxuICAgIGdldFllYXIoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkueWVhcigpOyB9XG5cbiAgICBnZXRNb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5tb250aCgpOyB9XG5cbiAgICBnZXREYXRlKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRhdGUoKTsgfVxuXG4gICAgZ2V0SG91cnMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaG91cnMoKTsgfVxuXG4gICAgZ2V0TWludXRlcyhkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5taW51dGVzKCk7IH1cblxuICAgIGdldFNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuc2Vjb25kcygpOyB9XG5cbiAgICBnZXRNaWxsaXNlY29uZHMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWlsbGlzZWNvbmRzKCk7IH1cblxuICAgIGdldFRpbWUoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIGRhdGUudmFsdWVPZigpOyB9XG5cbiAgICBnZXREYXlPZldlZWsoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5KCk7IH1cblxuICAgIGdldE1vbnRoTmFtZXMoc3R5bGU6ICdsb25nJyB8ICdzaG9ydCcgfCAnbmFycm93Jyk6IHN0cmluZ1tdIHtcbiAgICAgICAgLy8gTW9tZW50LmpzIGRvZXNuJ3Qgc3VwcG9ydCBuYXJyb3cgbW9udGggbmFtZXNcbiAgICAgICAgcmV0dXJuIHN0eWxlID09PSAnbG9uZycgPyB0aGlzLmxvY2FsZURhdGEubG9uZ01vbnRocyA6IHRoaXMubG9jYWxlRGF0YS5zaG9ydE1vbnRocztcbiAgICB9XG5cbiAgICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmRhdGVzO1xuICAgIH1cblxuICAgIGdldERheU9mV2Vla05hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIGlmIChzdHlsZSA9PT0gJ2xvbmcnKSB7IHJldHVybiB0aGlzLmxvY2FsZURhdGEubG9uZ0RheXNPZldlZWs7IH1cblxuICAgICAgICBpZiAoc3R5bGUgPT09ICdzaG9ydCcpIHsgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5zaG9ydERheXNPZldlZWs7IH1cblxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLm5hcnJvd0RheXNPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0WWVhck5hbWUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCdZWVlZJyk7XG4gICAgfVxuXG4gICAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5maXJzdERheU9mV2VlaztcbiAgICB9XG5cbiAgICBnZXROdW1EYXlzSW5Nb250aChkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXlzSW5Nb250aCgpO1xuICAgIH1cblxuICAgIGNsb25lKGRhdGU6IE1vbWVudCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiBkYXRlLmNsb25lKCkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciA9IDAsIGRhdGU6IG51bWJlciA9IDEpOiBNb21lbnQge1xuICAgICAgICAvLyBNb21lbnQuanMgd2lsbCBjcmVhdGUgYW4gaW52YWxpZCBkYXRlIGlmIGFueSBvZiB0aGUgY29tcG9uZW50cyBhcmUgb3V0IG9mIGJvdW5kcywgYnV0IHdlXG4gICAgICAgIC8vIGV4cGxpY2l0bHkgY2hlY2sgZWFjaCBjYXNlIHNvIHdlIGNhbiB0aHJvdyBtb3JlIGRlc2NyaXB0aXZlIGVycm9ycy5cbiAgICAgICAgaWYgKG1vbnRoIDwgdGhpcy5maXJzdE1vbnRoIHx8IG1vbnRoID4gdGhpcy5sYXN0TW9udGgpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi5cbiAgICAgICAgICAgICAgICBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAke3RoaXMuZmlyc3RNb250aH0gYW5kICR7dGhpcy5sYXN0TW9udGh9LmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIuIERhdGUgaGFzIHRvIGJlIGdyZWF0ZXIgdGhhbiAwLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5jcmVhdGVNb21lbnQoe3llYXIsIG1vbnRoLCBkYXRlfSkubG9jYWxlKHRoaXMubG9jYWxlKTtcblxuICAgICAgICAvLyBJZiB0aGUgcmVzdWx0IGlzbid0IHZhbGlkLCB0aGUgZGF0ZSBtdXN0IGhhdmUgYmVlbiBvdXQgb2YgYm91bmRzIGZvciB0aGlzIG1vbnRoLlxuICAgICAgICBpZiAoIXJlc3VsdC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIGRhdGUgXCIke2RhdGV9XCIgZm9yIG1vbnRoIHdpdGggaW5kZXggXCIke21vbnRofVwiLmApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRlVGltZShcbiAgICAgICAgeWVhcjogbnVtYmVyLFxuICAgICAgICBtb250aDogbnVtYmVyLFxuICAgICAgICBkYXRlOiBudW1iZXIsXG4gICAgICAgIGhvdXJzOiBudW1iZXIsXG4gICAgICAgIG1pbnV0ZXM6IG51bWJlcixcbiAgICAgICAgc2Vjb25kczogbnVtYmVyLFxuICAgICAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgICk6IE1vbWVudCB7XG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSB0aGlzLmNyZWF0ZURhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuXG4gICAgICAgIG5ld0RhdGUuaG91cnMoaG91cnMpO1xuICAgICAgICBuZXdEYXRlLm1pbnV0ZXMobWludXRlcyk7XG4gICAgICAgIG5ld0RhdGUuc2Vjb25kcyhzZWNvbmRzKTtcbiAgICAgICAgbmV3RGF0ZS5taWxsaXNlY29uZHMobWlsbGlzZWNvbmRzKTtcblxuICAgICAgICByZXR1cm4gbmV3RGF0ZTtcbiAgICB9XG5cbiAgICB0b2RheSgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQoKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgIH1cblxuICAgIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBzdHJpbmcgfCBzdHJpbmdbXSk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuZmluZERhdGVGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEZvcm1hdCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRm9ybWF0XG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIHBhcnNlRm9ybWF0LCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9ybWF0KGRhdGU6IE1vbWVudCwgZGlzcGxheUZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGU6bm8tcGFyYW1ldGVyLXJlYXNzaWdubWVudFxuICAgICAgICBkYXRlID0gdGhpcy5jbG9uZShkYXRlKTtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdNb21lbnREYXRlQWRhcHRlcjogQ2Fubm90IGZvcm1hdCBpbnZhbGlkIGRhdGUuJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQoZGlzcGxheUZvcm1hdCk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBNb21lbnQsIHllYXJzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyB5ZWFycyB9KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBNb21lbnQsIG1vbnRoczogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgbW9udGhzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBNb21lbnQsIGRheXM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IGRheXMgfSk7XG4gICAgfVxuXG4gICAgdG9Jc284NjAxKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgpO1xuICAgIH1cblxuICAgIC8qKiBodHRwczovL3d3dy5pZXRmLm9yZy9yZmMvcmZjMzMzOS50eHQgKi9cbiAgICBkZXNlcmlhbGl6ZSh2YWx1ZTogYW55KTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBkYXRlO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0RhdGVJbnN0YW5jZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIE5vdGU6IGFzc3VtZXMgdGhhdCBjbG9uaW5nIGFsc28gc2V0cyB0aGUgY29ycmVjdCBsb2NhbGUuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0ZSA9IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCBtb21lbnQuSVNPXzg2MDEpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0ZSAmJiB0aGlzLmlzVmFsaWQoZGF0ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudChkYXRlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gbW9tZW50LmlzTW9tZW50KG9iaik7XG4gICAgfVxuXG4gICAgaXNWYWxpZChkYXRlOiBNb21lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuaXNWYWxpZCgpO1xuICAgIH1cblxuICAgIGludmFsaWQoKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIG1vbWVudC5pbnZhbGlkKCk7XG4gICAgfVxuXG4gICAgaGFzU2FtZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB1bml0OiB1bml0T2ZUaW1lLkRpZmYpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHN0YXJ0RGF0ZS5pc1NhbWUoZW5kRGF0ZSwgdW5pdCk7XG4gICAgfVxuXG4gICAgZGlmZk5vdyhkYXRlOiBNb21lbnQsIHVuaXQ6IHVuaXRPZlRpbWUuRGlmZik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBkYXRlLmRpZmYodGhpcy50b2RheSgpLCB1bml0KTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlRGF0ZShkYXRlOiBNb21lbnQsIHBhcmFtcywgZGF0ZXRpbWU6IGJvb2xlYW4sIG1pbGxpc2Vjb25kczogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVEYXRlKGRhdGUsIHBhcmFtcywgZGF0ZXRpbWUsIG1pbGxpc2Vjb25kcyk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVMb25nRGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGU6IE1vbWVudCwgb3B0aW9ucz8pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlTG9uZ0RhdGVUaW1lKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVTaG9ydERhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZVNob3J0RGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlU2hvcnREYXRlVGltZShkYXRlOiBNb21lbnQsIG9wdGlvbnM/KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZVNob3J0RGF0ZVRpbWUoZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBvcGVuZWRSYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLm9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIG9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLm9wZW5lZFJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZURhdGUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlRGF0ZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VMb25nRGF0ZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VMb25nRGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VNaWRkbGVEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZU1pZGRsZURhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZVNob3J0RGF0ZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZVNob3J0RGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJlbGF0aXZlRGF0ZShkYXRlOiBNb21lbnQsIHRlbXBsYXRlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yZWxhdGl2ZURhdGUoZGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmVsYXRpdmVMb25nRGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJlbGF0aXZlTG9uZ0RhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByZWxhdGl2ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJlbGF0aXZlU2hvcnREYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIC8qKiBDcmVhdGVzIGEgTW9tZW50IGluc3RhbmNlIHdoaWxlIHJlc3BlY3RpbmcgdGhlIGN1cnJlbnQgVVRDIHNldHRpbmdzLiAqL1xuICAgIHByaXZhdGUgY3JlYXRlTW9tZW50KC4uLmFyZ3M6IGFueVtdKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucz8udXNlVXRjID8gbW9tZW50LnV0YyguLi5hcmdzKSA6IG1vbWVudCguLi5hcmdzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzTnVtZXJpYyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZpbmRGb3JtYXQodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgLy8gZGVmYXVsdCB0ZXN0IC0gaXNvXG4gICAgICAgIGNvbnN0IGlzb0RhdGUgPSAgdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSwgdGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIGlmIChpc29EYXRlLmlzVmFsaWQoKSkgeyByZXR1cm4gaXNvRGF0ZTsgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzTnVtZXJpYyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIHVuaXggdGltZSBzZWNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1gnLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb25nIG1vbnRocyBuYW1pbmc6IEQgTU1NIFlZWVksIE1NTSBEbyBZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIC9eXFxkezEsMn1cXHNcXFMrXFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpIHx8XG4gICAgICAgICAgICAvXlxcUytcXHNcXGR7MSwyfVthLXpdezJ9XFxzKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZS50cmltKCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoU3BhY2UodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xhc2ggbm90YXRpb246IEREL01NL1lZWVksIE1NL0REL1lZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC9eXFxkezEsMn1cXC9cXGR7MSwyfVxcLyhcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhTbGFzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkYXNoIG5vdGF0aW9uOiBERC1NTS1ZWVlZLCBZWVlZLURELU1NIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvKF4oXFxkezEsMn18XFxkezR9KS1cXGR7MSwyfS1cXGR7MSwyfSQpfCheXFxkezEsMn0tXFxkezEsMn0tKFxcZHsyfXxcXGR7NH0pJCkvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aERhc2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG90IG5vdGF0aW9uOiBERC5NTS5ZWVlZIHdpdGggc2hvcnQgY2FzZSBzdXBwb3J0XG4gICAgICAgIGlmICgvXlxcZHsxLDJ9XFwuXFxkezEsMn1cXC4oXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoRG90KHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU3BhY2UodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQgTU1NTSBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgY2FzZSAnZW4nOlxuICAgICAgICAgICAgICAgIC8vIDE2IEZlYiAyMDE5IHZzIEZlYiAxNnRoIDIwMTksIGNvdmVycyBGZWIgYW5kIEZlYnJ1YXJ5IGNhc2VzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHZhbHVlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdEIE1NTU0gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTU1NIERvIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTG9jYWxlICR7dGhpcy5sb2NhbGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcGFyc2VXaXRoU2xhc2godmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICBjYXNlICdydSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIC8vIHRvZG8gZG8gd2UgdXNlIGdlbmVyYWxpemVkIGxvY2FsZXM/IGVuIHZzIGVuLVVTOyB1bnRpbCBub3Qgd2UgdHJ5IHRvIGd1ZXNzXG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgLy8gVVMgdnMgVUtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzQ291bnQgPSAzO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0cy5sZW5ndGggIT09IGRhdGVQYXJ0c0NvdW50KSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdFBhcnQgPSBwYXJ0c1swXS50cmltKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kUGFydCA9IHBhcnRzWzFdLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc051bWVyaWMoZmlyc3RQYXJ0KSB8fCAhdGhpcy5pc051bWVyaWMoc2Vjb25kUGFydCkpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoc0luWWVhcnMgPSAxMjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbkZpcnN0QmVNb250aCA9ICtmaXJzdFBhcnQgPD0gbW9udGhzSW5ZZWFycztcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5TZWNvbmRCeU1vbnRoID0gK3NlY29uZFBhcnQgPD0gbW9udGhzSW5ZZWFycztcblxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IHR3byBwYXJ0cyBjYW5ub3QgYmUgbW9udGhcbiAgICAgICAgICAgICAgICBpZiAoIWNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRGV0ZXJtaW5lV2hlcmVNb250aCA9IGNhbkZpcnN0QmVNb250aCAmJiBjYW5TZWNvbmRCeU1vbnRoO1xuXG4gICAgICAgICAgICAgICAgLy8gdXNlIFVTIGZvcm1hdCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgaWYgKGNhbkRldGVybWluZVdoZXJlTW9udGgpIHsgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKTsgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbkZpcnN0QmVNb250aCAmJiAhY2FuU2Vjb25kQnlNb250aFxuICAgICAgICAgICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnTU0vREQvWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQvTU0vWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGUgJHt0aGlzLmxvY2FsZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEYXNoKHZhbHVlOiBzdHJpbmcpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgLy8gbGVhZGluZyB5ZWFyIHZzIGZpbmlzaGluZyB5ZWFyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoJy0nKTtcbiAgICAgICAgaWYgKHBhcnRzWzBdLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgIGNvbnN0IG1heERheU9yTW9udGhDaGFyc0NvdW50ID0gMjtcblxuICAgICAgICByZXR1cm4gcGFydHNbMF0ubGVuZ3RoIDw9IG1heERheU9yTW9udGhDaGFyc0NvdW50XG4gICAgICAgICAgICA/IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnREQtTU0tWVlZWScsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgOiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ1lZWVktTU0tREQnLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhEb3QodmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICAvLyBjb3ZlcnMgdHdvIGNhc2VzIFlZWVkgYW5kIFlZIChmb3IgY3VycmVudCB5ZWFyKVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC5NTS5ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgIH1cbn1cbiJdfQ==