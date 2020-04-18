import {State} from "../../state/State";

export const Availability = [
    'ABUNDANT',
    'PLENTIFUL',
    'COMMON',
    'AVERAGE',
    'SCARCE',
    'RARE',
    'VERY_RARE'
];

export const availabilityEntityName = 'availability';

State.data[availabilityEntityName] = Availability;