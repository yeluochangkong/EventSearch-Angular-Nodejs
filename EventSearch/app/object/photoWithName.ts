import { Photo} from './photo';
export class PhotoWithName {
    name: string;
    photo: Photo[];
    constructor (name, photo) {
        this.name = name;
        this.photo = photo;
    }
}
