import { Injectable } from '@nestjs/common';
import { Photos } from './interfaces/photos.interface';

@Injectable()
export class PhotosService {
    
    private photos: Photos[] = [
        {
            id:"1",
            url: "https://www.autobusesdecolombia.com/_next/static/media/1404-copetran.8b4f61d6.jpeg",
            company: "Copetran",
            bodywork: "Marcopolo",
            engine: "Chevrolet",
            serial: "1404"
        },
        {
            id:"2",
            url: "https://live.staticflickr.com/6044/5906486771_048c8e2e6c_b.jpg",
            company: "Empresa Arauca",
            bodywork: "Scania",
            engine: "",
            serial: "3051"
        }
        
    ]

    getAllPhotos() {
        return this.photos
    }
}
