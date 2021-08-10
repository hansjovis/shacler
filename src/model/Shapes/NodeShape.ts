import { IPropertyShape, PropertyShape } from "./PropertyShape";
import ValidationResult from "../ValidationReport/ValidationResult";
import ConstraintRegistry from "../ConstraintComponents/ConstraintRegistry";
import { flatMap } from "lodash";
import { Node } from "../Node";

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

	public isApplicable( node: Node ): boolean {
		return node["@type"] === this.targetClass;
	}

	public check( node: Node, availableConstraints: ConstraintRegistry ): ValidationResult[] {
		return flatMap( this.property, shape => shape.check( node, availableConstraints ) );
	}
}
