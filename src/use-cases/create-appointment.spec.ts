import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryRepository } from "../repositories/in-memory/in-memory-repository";

describe("Create Appointment", () => {
  it("should be able to create an Appointment", () => {
    const appointmentRepository = new InMemoryRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate('2024-03-05');
    const endsAt = getFutureDate('2024-03-06');

    expect( 
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an Appointment with overlapping dates", async () => {
    const appointmentRepository = new InMemoryRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startsAt = getFutureDate('2024-03-05');
    const endsAt = getFutureDate('2024-03-10');

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect( 
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate('2024-03-08'),
        endsAt: getFutureDate('2024-03-14'),
      })
    ).rejects.toBeInstanceOf(Error)

    expect( 
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate('2024-03-04'),
        endsAt: getFutureDate('2024-03-08'),
      })
    ).rejects.toBeInstanceOf(Error)

    expect( 
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate('2024-03-04'),
        endsAt: getFutureDate('2024-03-18'),
      })
    ).rejects.toBeInstanceOf(Error)
  });
});
