import { kullanici } from './Kullanici';
import { Konular } from './Konu';
export class Anket{
    AnketId : number;
    AnketAciklama : string;
    KonuId : number;
    OlusturanKullanici : number;
    konuBilgi: Konular;
    kullaniciBilgi: kullanici;
}