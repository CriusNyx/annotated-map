import Annotation from "./Annotation";

class MapNode {
  id: number;
  name: string;
  parent: number | null;
  graphic: string;
  annotations: Annotation[];

  constructor(id: number) {
    this.id = id;
    this.name = "";
    this.parent = null;
    this.graphic = "";
    this.annotations = [];
  }

  public getID() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getParent() {
    return this.parent;
  }

  public setParent(parent: MapNode | null) {
    this.parent = parent?.id ?? null;
  }

  public getGraphic() {
    return this.graphic;
  }

  public setGraphic(graphic: string) {
    this.graphic = graphic;
  }

  public getAnnotations() {
    return this.annotations;
  }

  public addAnnotation(annotation: Annotation) {
    this.annotations.push(annotation);
  }

  public removeAnnotation(annotation: Annotation) {
    let index = this.annotations.indexOf(annotation);
    this.annotations.splice(index, 1);
  }

  public replaceAnnotation(
    oldAnnotation: Annotation,
    newAnnotation: Annotation
  ) {
    this.removeAnnotation(oldAnnotation);
    this.addAnnotation(newAnnotation);
  }
}

export default MapNode;
