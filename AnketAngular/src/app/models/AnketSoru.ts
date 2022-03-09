import { AnketSecenekler } from './AnketSecenekler';
import { Anket } from './Anket';
export class AnketSoru{
    AnketSoruId: number;
    AnketId: number;
    Soru: string;
    AnketBilgi: Anket;
    anketsorus: AnketSecenekler[];
}