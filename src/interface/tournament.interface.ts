import { Player} from './player.interface';

export interface Tournament {
    _id: string;
    name: string;
    location: string;
    isDoubles: boolean;
    players: Player[];
    date: Date;
}