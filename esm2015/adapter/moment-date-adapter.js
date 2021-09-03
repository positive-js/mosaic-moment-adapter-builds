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
        this.setLocale(dateLocale || moment.locale());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy1tb21lbnQtYWRhcHRlci9hZGFwdGVyL21vbWVudC1kYXRlLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFDSCxXQUFXLEVBQ1gsY0FBYyxFQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxnRkFBZ0Y7QUFDaEYsNkZBQTZGO0FBQzdGLGlHQUFpRztBQUNqRywyQkFBMkI7QUFDM0IsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMsc0NBQXNDO0FBQ3RDLGdDQUFnQztBQUNoQyxPQUFPLEVBQUUsT0FBTyxJQUFJLGFBQWEsRUFBc0IsTUFBTSxRQUFRLENBQUM7QUFFdEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUd2QyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksT0FBTyxDQUFDO0FBZ0J4QyxtRUFBbUU7QUFDbkUsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQUcsSUFBSSxjQUFjLENBQzVELGdDQUFnQyxFQUFFO0lBQzlCLFVBQVUsRUFBRSxNQUFNO0lBQ2xCLE9BQU8sRUFBRSxzQ0FBc0M7Q0FDbEQsQ0FBQyxDQUFDO0FBRVAsb0JBQW9CO0FBQ3BCLG1DQUFtQztBQUNuQyxNQUFNLFVBQVUsc0NBQXNDO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSztRQUNiLGNBQWMsRUFBRSxLQUFLO0tBQ3hCLENBQUM7QUFDTixDQUFD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Nk90RDtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs2REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs4REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt3REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztrREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztzREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozs0REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt1REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzsyREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OztxREFHaEI7QUFHRDtJQURDLGdCQUFnQjs7Ozt5REFHaEI7QUFHRDtJQURDLGdCQUFnQjs7OzswREFHaEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1tYWdpYy1udW1iZXJzXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBEYXRlQWRhcHRlcixcbiAgICBNQ19EQVRFX0xPQ0FMRVxufSBmcm9tICdAcHRzZWN1cml0eS9jZGsvZGF0ZXRpbWUnO1xuaW1wb3J0IHsgRGF0ZUZvcm1hdHRlciB9IGZyb20gJ0BwdHNlY3VyaXR5L21vc2FpYy9jb3JlJztcbi8vIERlcGVuZGluZyBvbiB3aGV0aGVyIHJvbGx1cCBpcyB1c2VkLCBtb21lbnQgbmVlZHMgdG8gYmUgaW1wb3J0ZWQgZGlmZmVyZW50bHkuXG4vLyBTaW5jZSBNb21lbnQuanMgZG9lc24ndCBoYXZlIGEgZGVmYXVsdCBleHBvcnQsIHdlIG5vcm1hbGx5IG5lZWQgdG8gaW1wb3J0IHVzaW5nIHRoZSBgKiBhc2Bcbi8vIHN5bnRheC4gSG93ZXZlciwgcm9sbHVwIGNyZWF0ZXMgYSBzeW50aGV0aWMgZGVmYXVsdCBtb2R1bGUgYW5kIHdlIHRodXMgbmVlZCB0byBpbXBvcnQgaXQgdXNpbmdcbi8vIHRoZSBgZGVmYXVsdCBhc2Agc3ludGF4LlxuaW1wb3J0ICogYXMgX21vbWVudCBmcm9tICdtb21lbnQnO1xuLy8gdHNsaW50OmRpc2FibGU6bm8tZHVwbGljYXRlLWltcG9ydHNcbi8vIEB0cy1pZ25vcmUgKGxvb2sgYXQgdHNjb25maWcpXG5pbXBvcnQgeyBkZWZhdWx0IGFzIF9yb2xsdXBNb21lbnQsIE1vbWVudCwgdW5pdE9mVGltZSB9IGZyb20gJ21vbWVudCc7XG5cbmltcG9ydCB7IGVuVVMgfSBmcm9tICcuL2xvY2FsZXMvZW4tVVMnO1xuaW1wb3J0IHsgcnVSVSB9IGZyb20gJy4vbG9jYWxlcy9ydS1SVSc7XG5cblxuY29uc3QgbW9tZW50ID0gX3JvbGx1cE1vbWVudCB8fCBfbW9tZW50O1xuXG4vKiogQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHtAc2VlIE1vbWVudERhdGVBZGFwdGVyfS4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSU1jTW9tZW50RGF0ZUFkYXB0ZXJPcHRpb25zIHtcbiAgICAvKipcbiAgICAgKiBUdXJucyB0aGUgdXNlIG9mIHV0YyBkYXRlcyBvbiBvciBvZmYuXG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIHVzZVV0YzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiB3aGV0aGVyIHNob3VsZCBwYXJzZSBtZXRob2QgdHJ5IGd1ZXNzIGRhdGUgZm9ybWF0XG4gICAgICoge0BkZWZhdWx0IGZhbHNlfVxuICAgICAqL1xuICAgIGZpbmREYXRlRm9ybWF0OiBib29sZWFuO1xufVxuXG4vKiogSW5qZWN0aW9uVG9rZW4gZm9yIG1vbWVudCBkYXRlIGFkYXB0ZXIgdG8gY29uZmlndXJlIG9wdGlvbnMuICovXG5leHBvcnQgY29uc3QgTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPElNY01vbWVudERhdGVBZGFwdGVyT3B0aW9ucz4oXG4gICAgJ01DX01PTUVOVF9EQVRFX0FEQVBURVJfT1BUSU9OUycsIHtcbiAgICAgICAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICAgICAgICBmYWN0b3J5OiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWVxuICAgIH0pO1xuXG4vKiogQGRvY3MtcHJpdmF0ZSAqL1xuLy8gdHNsaW50OmRpc2FibGU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBmdW5jdGlvbiBNQ19NT01FTlRfREFURV9BREFQVEVSX09QVElPTlNfRkFDVE9SWSgpOiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICAgIHVzZVV0YzogZmFsc2UsXG4gICAgICAgIGZpbmREYXRlRm9ybWF0OiBmYWxzZVxuICAgIH07XG59XG5cbi8qKiBDcmVhdGVzIGFuIGFycmF5IGFuZCBmaWxscyBpdCB3aXRoIHZhbHVlcy4gKi9cbmZ1bmN0aW9uIHJhbmdlPFQ+KGxlbmd0aDogbnVtYmVyLCB2YWx1ZUZ1bmN0aW9uOiAoaW5kZXg6IG51bWJlcikgPT4gVCk6IFRbXSB7XG4gICAgY29uc3QgdmFsdWVzQXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZnVuY3Rpb24gRGVwcmVjYXRlZE1ldGhvZCh0YXJnZXQ6IGFueSwga2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICAgIGNvbnN0IG9yaWdpbiA9IGRlc2NyaXB0b3IudmFsdWU7XG5cbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZnVuY3Rpb24tZXhwcmVzc2lvbiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbiguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgRm91bmQgdXNlIG9mIGRlcHJlY2F0ZWQgbWV0aG9kICR7a2V5fSwgaXQgd2FzIG1vdmVkIGluIERhdGVGb3JtYXR0ZXIuIGAgK1xuICAgICAgICAgICAgYFRoZSBkZXByZWNhdGVkIG1ldGhvZCB3aWxsIGJlIHJlbW92ZWQgaW4gMTMuMC4wLmBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gb3JpZ2luLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZUFkYXB0ZXIgZXh0ZW5kcyBEYXRlQWRhcHRlcjxNb21lbnQ+IHtcbiAgICBwcml2YXRlIGRhdGVGb3JtYXR0ZXI6IERhdGVGb3JtYXR0ZXI8TW9tZW50PjtcblxuICAgIHByaXZhdGUgbG9jYWxlRGF0YToge1xuICAgICAgICBmaXJzdERheU9mV2VlazogbnVtYmVyO1xuICAgICAgICBsb25nTW9udGhzOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnRNb250aHM6IHN0cmluZ1tdO1xuICAgICAgICBkYXRlczogc3RyaW5nW107XG4gICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgc2hvcnREYXlzT2ZXZWVrOiBzdHJpbmdbXTtcbiAgICAgICAgbmFycm93RGF5c09mV2Vlazogc3RyaW5nW107XG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1DX0RBVEVfTE9DQUxFKSBkYXRlTG9jYWxlOiBzdHJpbmcsXG4gICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTUNfTU9NRU5UX0RBVEVfQURBUFRFUl9PUFRJT05TKSBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM/OiBJTWNNb21lbnREYXRlQWRhcHRlck9wdGlvbnNcbiAgICApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNldExvY2FsZShkYXRlTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gICAgfVxuXG4gICAgc2V0TG9jYWxlKGxvY2FsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNldExvY2FsZShsb2NhbGUpO1xuXG4gICAgICAgIHRoaXMuZGF0ZUZvcm1hdHRlciA9IG5ldyBEYXRlRm9ybWF0dGVyPE1vbWVudD4odGhpcywgbG9jYWxlKTtcbiAgICAgICAgdGhpcy5jb25maWcgPSBsb2NhbGUgPT09ICdlbicgPyBlblVTIDogcnVSVTtcblxuICAgICAgICBsZXQgbW9tZW50TG9jYWxlRGF0YSA9IG1vbWVudC5sb2NhbGVEYXRhKGxvY2FsZSk7XG5cbiAgICAgICAgLy8gVGhpcyBpcyBvdXIgY3VzdG9tcyB0cmFuc2xhdGlvbnNcbiAgICAgICAgY29uc3QgaTE4bkxvY2FscyA9IFsnZW4nLCAncnUnXTtcblxuICAgICAgICBpZiAoaTE4bkxvY2Fscy5pbmRleE9mKGxvY2FsZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBtb21lbnRMb2NhbGVEYXRhID0gbW9tZW50LnVwZGF0ZUxvY2FsZShsb2NhbGUsIHtcbiAgICAgICAgICAgICAgICBtb250aHNTaG9ydDoge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuY29uZmlnLm1vbnRoTmFtZXMuc2hvcnQuZm9ybWF0dGVkLFxuICAgICAgICAgICAgICAgICAgICBzdGFuZGFsb25lOiB0aGlzLmNvbmZpZy5tb250aE5hbWVzLnNob3J0LnN0YW5kYWxvbmVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzOiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5sb25nLFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzU2hvcnQ6IHRoaXMuY29uZmlnLmRheU9mV2Vla05hbWVzLnNob3J0LFxuICAgICAgICAgICAgICAgIHdlZWtkYXlzTWluOiB0aGlzLmNvbmZpZy5kYXlPZldlZWtOYW1lcy5uYXJyb3dcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0ge1xuICAgICAgICAgICAgZmlyc3REYXlPZldlZWs6IHRoaXMuY29uZmlnLmZpcnN0RGF5T2ZXZWVrLFxuICAgICAgICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgICAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICAgICAgICBkYXRlczogcmFuZ2UoMzEsIChpKSA9PiB0aGlzLmNyZWF0ZURhdGUoMjAxNywgMCwgaSArIDEpLmZvcm1hdCgnRCcpKSxcbiAgICAgICAgICAgIGxvbmdEYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzKCksXG4gICAgICAgICAgICBzaG9ydERheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNTaG9ydCgpLFxuICAgICAgICAgICAgbmFycm93RGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5c01pbigpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0TG9jYWxlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YTtcbiAgICB9XG5cbiAgICBzZXRMb2NhbGVEYXRhKGxvY2FsZURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0gbG9jYWxlRGF0YTtcbiAgICB9XG5cbiAgICB1cGRhdGVMb2NhbGVEYXRhKGxvY2FsZURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sb2NhbGVEYXRhID0geyAuLi50aGlzLmxvY2FsZURhdGEsIC4uLmxvY2FsZURhdGEgfTtcbiAgICB9XG5cbiAgICBnZXRZZWFyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnllYXIoKTsgfVxuXG4gICAgZ2V0TW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubW9udGgoKTsgfVxuXG4gICAgZ2V0RGF0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5kYXRlKCk7IH1cblxuICAgIGdldEhvdXJzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmhvdXJzKCk7IH1cblxuICAgIGdldE1pbnV0ZXMoZGF0ZTogTW9tZW50KTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkubWludXRlcygpOyB9XG5cbiAgICBnZXRTZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLnNlY29uZHMoKTsgfVxuXG4gICAgZ2V0TWlsbGlzZWNvbmRzKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLm1pbGxpc2Vjb25kcygpOyB9XG5cbiAgICBnZXRUaW1lKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiBkYXRlLnZhbHVlT2YoKTsgfVxuXG4gICAgZ2V0RGF5T2ZXZWVrKGRhdGU6IE1vbWVudCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmRheSgpOyB9XG5cbiAgICBnZXRNb250aE5hbWVzKHN0eWxlOiAnbG9uZycgfCAnc2hvcnQnIHwgJ25hcnJvdycpOiBzdHJpbmdbXSB7XG4gICAgICAgIC8vIE1vbWVudC5qcyBkb2Vzbid0IHN1cHBvcnQgbmFycm93IG1vbnRoIG5hbWVzXG4gICAgICAgIHJldHVybiBzdHlsZSA9PT0gJ2xvbmcnID8gdGhpcy5sb2NhbGVEYXRhLmxvbmdNb250aHMgOiB0aGlzLmxvY2FsZURhdGEuc2hvcnRNb250aHM7XG4gICAgfVxuXG4gICAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5kYXRlcztcbiAgICB9XG5cbiAgICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZTogJ2xvbmcnIHwgJ3Nob3J0JyB8ICduYXJyb3cnKTogc3RyaW5nW10ge1xuICAgICAgICBpZiAoc3R5bGUgPT09ICdsb25nJykgeyByZXR1cm4gdGhpcy5sb2NhbGVEYXRhLmxvbmdEYXlzT2ZXZWVrOyB9XG5cbiAgICAgICAgaWYgKHN0eWxlID09PSAnc2hvcnQnKSB7IHJldHVybiB0aGlzLmxvY2FsZURhdGEuc2hvcnREYXlzT2ZXZWVrOyB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YS5uYXJyb3dEYXlzT2ZXZWVrO1xuICAgIH1cblxuICAgIGdldFllYXJOYW1lKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmZvcm1hdCgnWVlZWScpO1xuICAgIH1cblxuICAgIGdldEZpcnN0RGF5T2ZXZWVrKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEuZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogTW9tZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZGF5c0luTW9udGgoKTtcbiAgICB9XG5cbiAgICBjbG9uZShkYXRlOiBNb21lbnQpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gZGF0ZS5jbG9uZSgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIgPSAwLCBkYXRlOiBudW1iZXIgPSAxKTogTW9tZW50IHtcbiAgICAgICAgLy8gTW9tZW50LmpzIHdpbGwgY3JlYXRlIGFuIGludmFsaWQgZGF0ZSBpZiBhbnkgb2YgdGhlIGNvbXBvbmVudHMgYXJlIG91dCBvZiBib3VuZHMsIGJ1dCB3ZVxuICAgICAgICAvLyBleHBsaWNpdGx5IGNoZWNrIGVhY2ggY2FzZSBzbyB3ZSBjYW4gdGhyb3cgbW9yZSBkZXNjcmlwdGl2ZSBlcnJvcnMuXG4gICAgICAgIGlmIChtb250aCA8IDAgfHwgbW9udGggPiAxMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgbW9udGggaW5kZXggXCIke21vbnRofVwiLiBNb250aCBpbmRleCBoYXMgdG8gYmUgYmV0d2VlbiAwIGFuZCAxMS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIi4gRGF0ZSBoYXMgdG8gYmUgZ3JlYXRlciB0aGFuIDAuYCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmNyZWF0ZU1vbWVudCh7eWVhciwgbW9udGgsIGRhdGV9KS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuXG4gICAgICAgIC8vIElmIHRoZSByZXN1bHQgaXNuJ3QgdmFsaWQsIHRoZSBkYXRlIG11c3QgaGF2ZSBiZWVuIG91dCBvZiBib3VuZHMgZm9yIHRoaXMgbW9udGguXG4gICAgICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNyZWF0ZURhdGVUaW1lKFxuICAgICAgICB5ZWFyOiBudW1iZXIsXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXG4gICAgICAgIGRhdGU6IG51bWJlcixcbiAgICAgICAgaG91cnM6IG51bWJlcixcbiAgICAgICAgbWludXRlczogbnVtYmVyLFxuICAgICAgICBzZWNvbmRzOiBudW1iZXIsXG4gICAgICAgIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgKTogTW9tZW50IHtcbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IHRoaXMuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgICAgbmV3RGF0ZS5ob3Vycyhob3Vycyk7XG4gICAgICAgIG5ld0RhdGUubWludXRlcyhtaW51dGVzKTtcbiAgICAgICAgbmV3RGF0ZS5zZWNvbmRzKHNlY29uZHMpO1xuICAgICAgICBuZXdEYXRlLm1pbGxpc2Vjb25kcyhtaWxsaXNlY29uZHMpO1xuXG4gICAgICAgIHJldHVybiBuZXdEYXRlO1xuICAgIH1cblxuICAgIHRvZGF5KCk6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCgpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgfVxuXG4gICAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IHN0cmluZyB8IHN0cmluZ1tdKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5maW5kRGF0ZUZvcm1hdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kRm9ybWF0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGb3JtYXRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgcGFyc2VGb3JtYXQsIHRoaXMubG9jYWxlKVxuICAgICAgICAgICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlKS5sb2NhbGUodGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmb3JtYXQoZGF0ZTogTW9tZW50LCBkaXNwbGF5Rm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby1wYXJhbWV0ZXItcmVhc3NpZ25tZW50XG4gICAgICAgIGRhdGUgPSB0aGlzLmNsb25lKGRhdGUpO1xuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ01vbWVudERhdGVBZGFwdGVyOiBDYW5ub3QgZm9ybWF0IGludmFsaWQgZGF0ZS4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRlLmZvcm1hdChkaXNwbGF5Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IE1vbWVudCwgeWVhcnM6IG51bWJlcik6IE1vbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmNsb25lKGRhdGUpLmFkZCh7IHllYXJzIH0pO1xuICAgIH1cblxuICAgIGFkZENhbGVuZGFyTW9udGhzKGRhdGU6IE1vbWVudCwgbW9udGhzOiBudW1iZXIpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5hZGQoeyBtb250aHMgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IE1vbWVudCwgZGF5czogbnVtYmVyKTogTW9tZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuYWRkKHsgZGF5cyB9KTtcbiAgICB9XG5cbiAgICB0b0lzbzg2MDEoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoZGF0ZSkuZm9ybWF0KCk7XG4gICAgfVxuXG4gICAgLyoqIGh0dHBzOi8vd3d3LmlldGYub3JnL3JmYy9yZmMzMzM5LnR4dCAqL1xuICAgIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgICAgbGV0IGRhdGU7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzRGF0ZUluc3RhbmNlKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gTm90ZTogYXNzdW1lcyB0aGF0IGNsb25pbmcgYWxzbyBzZXRzIHRoZSBjb3JyZWN0IGxvY2FsZS5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRlID0gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsIG1vbWVudC5JU09fODYwMSkubG9jYWxlKHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRlICYmIHRoaXMuaXNWYWxpZChkYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KGRhdGUpLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIuZGVzZXJpYWxpemUodmFsdWUpO1xuICAgIH1cblxuICAgIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBtb21lbnQuaXNNb21lbnQob2JqKTtcbiAgICB9XG5cbiAgICBpc1ZhbGlkKGRhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jbG9uZShkYXRlKS5pc1ZhbGlkKCk7XG4gICAgfVxuXG4gICAgaW52YWxpZCgpOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gbW9tZW50LmludmFsaWQoKTtcbiAgICB9XG5cbiAgICBoYXNTYW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQsIHVuaXQ6IHVuaXRPZlRpbWUuRGlmZik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gc3RhcnREYXRlLmlzU2FtZShlbmREYXRlLCB1bml0KTtcbiAgICB9XG5cbiAgICBkaWZmTm93KGRhdGU6IE1vbWVudCwgdW5pdDogdW5pdE9mVGltZS5EaWZmKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZGlmZih0aGlzLnRvZGF5KCksIHVuaXQpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVEYXRlKGRhdGU6IE1vbWVudCwgcGFyYW1zLCBkYXRldGltZTogYm9vbGVhbiwgbWlsbGlzZWNvbmRzOiBib29sZWFuKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZURhdGUoZGF0ZSwgcGFyYW1zLCBkYXRldGltZSwgbWlsbGlzZWNvbmRzKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIGFic29sdXRlTG9uZ0RhdGUoZGF0ZTogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5hYnNvbHV0ZUxvbmdEYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZTogTW9tZW50LCBvcHRpb25zPyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIuYWJzb2x1dGVMb25nRGF0ZVRpbWUoZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICBhYnNvbHV0ZVNob3J0RGF0ZShkYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlU2hvcnREYXRlKGRhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgYWJzb2x1dGVTaG9ydERhdGVUaW1lKGRhdGU6IE1vbWVudCwgb3B0aW9ucz8pOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLmFic29sdXRlU2hvcnREYXRlVGltZShkYXRlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIG9wZW5lZFJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIub3BlbmVkUmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgb3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIub3BlbmVkUmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlRGF0ZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgdGVtcGxhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmFuZ2VEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCwgZW5kRGF0ZTogTW9tZW50LCB0ZW1wbGF0ZSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VEYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUsIHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlTG9uZ0RhdGUoc3RhcnREYXRlOiBNb21lbnQgfCBudWxsLCBlbmREYXRlPzogTW9tZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUZvcm1hdHRlci5yYW5nZUxvbmdEYXRlKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZUxvbmdEYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlTG9uZ0RhdGVUaW1lKHN0YXJ0RGF0ZSwgZW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByYW5nZU1pZGRsZURhdGVUaW1lKHN0YXJ0RGF0ZTogTW9tZW50LCBlbmREYXRlOiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlTWlkZGxlRGF0ZVRpbWUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlU2hvcnREYXRlKHN0YXJ0RGF0ZTogTW9tZW50IHwgbnVsbCwgZW5kRGF0ZT86IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmFuZ2VTaG9ydERhdGUoc3RhcnREYXRlLCBlbmREYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGU6IE1vbWVudCB8IG51bGwsIGVuZERhdGU/OiBNb21lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJhbmdlU2hvcnREYXRlVGltZShzdGFydERhdGUsIGVuZERhdGUpO1xuICAgIH1cblxuICAgIEBEZXByZWNhdGVkTWV0aG9kXG4gICAgcmVsYXRpdmVEYXRlKGRhdGU6IE1vbWVudCwgdGVtcGxhdGUpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRlRm9ybWF0dGVyLnJlbGF0aXZlRGF0ZShkYXRlLCB0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgQERlcHJlY2F0ZWRNZXRob2RcbiAgICByZWxhdGl2ZUxvbmdEYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmVsYXRpdmVMb25nRGF0ZShkYXRlKTtcbiAgICB9XG5cbiAgICBARGVwcmVjYXRlZE1ldGhvZFxuICAgIHJlbGF0aXZlU2hvcnREYXRlKGRhdGU6IE1vbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGVGb3JtYXR0ZXIucmVsYXRpdmVTaG9ydERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIENyZWF0ZXMgYSBNb21lbnQgaW5zdGFuY2Ugd2hpbGUgcmVzcGVjdGluZyB0aGUgY3VycmVudCBVVEMgc2V0dGluZ3MuICovXG4gICAgcHJpdmF0ZSBjcmVhdGVNb21lbnQoLi4uYXJnczogYW55W10pOiBNb21lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zPy51c2VVdGMgPyBtb21lbnQudXRjKC4uLmFyZ3MpIDogbW9tZW50KC4uLmFyZ3MpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNOdW1lcmljKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZEZvcm1hdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAvLyBkZWZhdWx0IHRlc3QgLSBpc29cbiAgICAgICAgY29uc3QgaXNvRGF0ZSA9ICB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgbW9tZW50LklTT184NjAxLCB0aGlzLmxvY2FsZSk7XG5cbiAgICAgICAgaWYgKGlzb0RhdGUuaXNWYWxpZCgpKSB7IHJldHVybiBpc29EYXRlOyB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNOdW1lcmljKHZhbHVlKSkge1xuICAgICAgICAgICAgLy8gdW5peCB0aW1lIHNlY1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnWCcsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxvbmcgbW9udGhzIG5hbWluZzogRCBNTU0gWVlZWSwgTU1NIERvIFlZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgL15cXGR7MSwyfVxcc1xcUytcXHMoXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlLnRyaW0oKSkgfHxcbiAgICAgICAgICAgIC9eXFxTK1xcc1xcZHsxLDJ9W2Etel17Mn1cXHMoXFxkezJ9fFxcZHs0fSkkLy50ZXN0KHZhbHVlLnRyaW0oKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhTcGFjZSh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzbGFzaCBub3RhdGlvbjogREQvTU0vWVlZWSwgTU0vREQvWVlZWSB3aXRoIHNob3J0IGNhc2Ugc3VwcG9ydFxuICAgICAgICBpZiAoL15cXGR7MSwyfVxcL1xcZHsxLDJ9XFwvKFxcZHsyfXxcXGR7NH0pJC8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcnNlV2l0aFNsYXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRhc2ggbm90YXRpb246IERELU1NLVlZWVksIFlZWVktREQtTU0gd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC8oXihcXGR7MSwyfXxcXGR7NH0pLVxcZHsxLDJ9LVxcZHsxLDJ9JCl8KF5cXGR7MSwyfS1cXGR7MSwyfS0oXFxkezJ9fFxcZHs0fSkkKS8udGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VXaXRoRGFzaCh2YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb3Qgbm90YXRpb246IERELk1NLllZWVkgd2l0aCBzaG9ydCBjYXNlIHN1cHBvcnRcbiAgICAgICAgaWYgKC9eXFxkezEsMn1cXC5cXGR7MSwyfVxcLihcXGR7Mn18XFxkezR9KSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVdpdGhEb3QodmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhTcGFjZSh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3J1JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERCBNTU1NIFlZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICBjYXNlICdlbic6XG4gICAgICAgICAgICAgICAgLy8gMTYgRmViIDIwMTkgdnMgRmViIDE2dGggMjAxOSwgY292ZXJzIEZlYiBhbmQgRmVicnVhcnkgY2FzZXNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc051bWVyaWModmFsdWVbMF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0QgTU1NTSBZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ01NTU0gRG8gWVlZWScsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBMb2NhbGUgJHt0aGlzLmxvY2FsZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwYXJzZVdpdGhTbGFzaCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3J1JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC9NTS9ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgLy8gdG9kbyBkbyB3ZSB1c2UgZ2VuZXJhbGl6ZWQgbG9jYWxlcz8gZW4gdnMgZW4tVVM7IHVudGlsIG5vdCB3ZSB0cnkgdG8gZ3Vlc3NcbiAgICAgICAgICAgIGNhc2UgJ2VuJzpcbiAgICAgICAgICAgICAgICAvLyBVUyB2cyBVS1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlUGFydHNDb3VudCA9IDM7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gZGF0ZVBhcnRzQ291bnQpIHsgcmV0dXJuIG51bGw7IH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0UGFydCA9IHBhcnRzWzBdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRQYXJ0ID0gcGFydHNbMV0udHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTnVtZXJpYyhmaXJzdFBhcnQpIHx8ICF0aGlzLmlzTnVtZXJpYyhzZWNvbmRQYXJ0KSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhzSW5ZZWFycyA9IDEyO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuRmlyc3RCZU1vbnRoID0gK2ZpcnN0UGFydCA8PSBtb250aHNJblllYXJzO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNhblNlY29uZEJ5TW9udGggPSArc2Vjb25kUGFydCA8PSBtb250aHNJblllYXJzO1xuXG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgdHdvIHBhcnRzIGNhbm5vdCBiZSBtb250aFxuICAgICAgICAgICAgICAgIGlmICghY2FuRmlyc3RCZU1vbnRoICYmICFjYW5TZWNvbmRCeU1vbnRoKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjYW5EZXRlcm1pbmVXaGVyZU1vbnRoID0gY2FuRmlyc3RCZU1vbnRoICYmIGNhblNlY29uZEJ5TW9udGg7XG5cbiAgICAgICAgICAgICAgICAvLyB1c2UgVVMgZm9ybWF0IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICBpZiAoY2FuRGV0ZXJtaW5lV2hlcmVNb250aCkgeyByZXR1cm4gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTS9ERC9ZWVlZJywgdGhpcy5sb2NhbGUpOyB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2FuRmlyc3RCZU1vbnRoICYmICFjYW5TZWNvbmRCeU1vbnRoXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdNTS9ERC9ZWVlZJywgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC9NTS9ZWVlZJywgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYExvY2FsZSAke3RoaXMubG9jYWxlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aERhc2godmFsdWU6IHN0cmluZyk6IE1vbWVudCB8IG51bGwge1xuICAgICAgICAvLyBsZWFkaW5nIHllYXIgdnMgZmluaXNoaW5nIHllYXJcbiAgICAgICAgY29uc3QgcGFydHMgPSB2YWx1ZS5zcGxpdCgnLScpO1xuICAgICAgICBpZiAocGFydHNbMF0ubGVuZ3RoID09PSAwKSB7IHJldHVybiBudWxsOyB9XG5cbiAgICAgICAgY29uc3QgbWF4RGF5T3JNb250aENoYXJzQ291bnQgPSAyO1xuXG4gICAgICAgIHJldHVybiBwYXJ0c1swXS5sZW5ndGggPD0gbWF4RGF5T3JNb250aENoYXJzQ291bnRcbiAgICAgICAgICAgID8gdGhpcy5jcmVhdGVNb21lbnQodmFsdWUsICdERC1NTS1ZWVlZJywgdGhpcy5sb2NhbGUpXG4gICAgICAgICAgICA6IHRoaXMuY3JlYXRlTW9tZW50KHZhbHVlLCAnWVlZWS1NTS1ERCcsIHRoaXMubG9jYWxlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHBhcnNlV2l0aERvdCh2YWx1ZTogc3RyaW5nKTogTW9tZW50IHwgbnVsbCB7XG4gICAgICAgIC8vIGNvdmVycyB0d28gY2FzZXMgWVlZWSBhbmQgWVkgKGZvciBjdXJyZW50IHllYXIpXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1vbWVudCh2YWx1ZSwgJ0RELk1NLllZWVknLCB0aGlzLmxvY2FsZSk7XG4gICAgfVxufVxuIl19