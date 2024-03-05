import { expect, test } from "vitest";
import { Appointment } from "./appointment";

test('create an appointment', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 4);

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
    });

    expect(appointment).toBeInstanceOf(Appointment);
});

test('cannot create an appointment with end date before start date', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 1);

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        })
    }).toThrow();
});

test('cannot create an appointment with end date before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() - 1);

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        })
    }).toThrow();
});