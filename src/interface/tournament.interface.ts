import { Player} from './player.interface';

export interface Tournament {
    _id: string;
    name: string;
    location: string;
    city: string;
    desc: string;
    img: string;
    country: string;
    players: Player[];
    date: Date;
    price: number;
}