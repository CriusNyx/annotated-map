import { AnyARecord } from "dns";
import RichText from './RichText';


const geometric = require('geometric');

class Annotation{
    polygon : Array<[number, number]>
    richText : RichText

    constructor(polygon : Array<[number, number]>, richText : RichText){
        this.polygon = polygon;
        this.richText = richText;
    }

    public getPolygon(){
        return this.polygon;
    }

    public pointInPolygon(point : [number, number]){
        return geometric.pointInPolygon(point, this.polygon);
    }

    public getText(){
        return this.richText;
    }

    public clone(
        polygon : Array<[number, number]> | null = null,
        richText : RichText | null = null){
            return new Annotation(
                polygon ?? this.polygon, 
                richText ?? this.richText)
    }
}

export default Annotation;