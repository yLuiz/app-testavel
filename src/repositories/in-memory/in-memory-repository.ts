import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment";
import { IAppointmentsRepository } from "../appointments-repository";

export class InMemoryRepository implements IAppointmentsRepository {
  public items: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.items.push(appointment);
  }

  async findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null> {
    const overlappingAppointment = this.items.find(a => {
        return areIntervalsOverlapping(
            { start: startsAt, end: endsAt },
            { start: a.startsAt, end: a.endsAt },
            { inclusive: true },
        )
    });

    return overlappingAppointment || null;

  }

  async save(): Promise<void> {}
}
