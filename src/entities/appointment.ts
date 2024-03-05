interface IAppointmentProps {
    customer: string;
    startsAt: Date;
    endsAt: Date;
}

export class Appointment {
    private _props: IAppointmentProps;

    constructor(props: IAppointmentProps) {
        
        if (props.endsAt <= props.startsAt) {
            throw new Error('startsAt must be greater than endsAt.');
        }
        
        if (props.startsAt <= new Date()) {
            throw new Error('startsAt must be greater than now.');
        }

        this._props = props;

    }

    get startsAt() {
        return this._props.startsAt
    }
    get endsAt() {
        return this._props.endsAt
    }
    get customer() {
        return this._props.customer
    }
}