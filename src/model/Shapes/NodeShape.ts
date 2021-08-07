import { IPropertyShape, PropertyShape } from "./PropertyShape";
import ValidationResult from "../ValidationReport/ValidationResult";
import ConstraintRegistry from "../ConstraintComponents/ConstraintRegistry";
import { flatten } from "lodash";

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

	public check( node: any, availableConstraints: ConstraintRegistry ): ValidationResult[] {
		const results = this.property.map( shape => shape.check( node, availableConstraints ) );
		return flatten( results );
	}
}
