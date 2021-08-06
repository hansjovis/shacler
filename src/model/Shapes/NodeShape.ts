import { IPropertyShape, PropertyShape } from "./PropertyShape";

export interface INodeShape {
	property: IPropertyShape[];
	targetClass?: string;
}

export class NodeShape {
	property: PropertyShape[];
	targetClass?: string;

	constructor( props: INodeShape ) {
		this.property = props.property.map( property => new PropertyShape( property ) );
		this.targetClass = props.targetClass;
	}

	public isApplicable( node: any ): boolean {
		return node["@type"] === this.targetClass;
	}
}
