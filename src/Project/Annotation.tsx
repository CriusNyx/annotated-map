import { AnyARecord } from "dns";
import RichText from './RichText';


const geometric = require('geometric');

class Annotation{
    polygon : Array<[number, number]>

    constructor(polygon : Array<[number, number]>, richText : RichText){
        this.polygon = polygon;
        this.pointInPolygon = this.pointInPolygon.bind(this);
    }

    pointInPolygon(point : [number, number]){
        return geometric.pointInPolygon(point, this.polygon);
    }
}

export default Annotation;