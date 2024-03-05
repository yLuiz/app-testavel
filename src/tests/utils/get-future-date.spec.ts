import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test('increases date with one year', () => {
    const year = new Date().getFullYear();
    const currentDate = new Date().toISOString().split('T')[0];

    expect(getFutureDate(currentDate).getFullYear()).toEqual(year + 1);
})