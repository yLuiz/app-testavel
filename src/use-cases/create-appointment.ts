import { Appointment } from "../entities/appointment";
import { IAppointmentsRepository } from "../repositories/appointments-repository";

interface ICreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type ICreateAppointmentResponse = Appointment;

export class CreateAppointment {

  constructor (
    private _appointmentsRepository: IAppointmentsRepository
  ) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: ICreateAppointmentRequest): Promise<ICreateAppointmentResponse> {

    const overlappingAppointment = await this._appointmentsRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    );

    if (overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    this._appointmentsRepository.create(appointment);

    return appointment;
  }
}
