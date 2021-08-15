import { IPropertyShape, PropertyShape } from "./PropertyShape";
import ValidationResult from "../ValidationReport/ValidationResult";
import ConstraintRegistry from "../ConstraintComponents/ConstraintRegistry";
import { flatMap } from "lodash";
import { Node } from "../Node";

/**
 * A JSON representation of a node shape.
 *
 * @see https://www.w3.org/TR/shacl/#node-shapes
 */
export interface INodeShape {
	property: IPropertyShape[];
	targetClass?: string;
}

/**
 * A node shape.
 *
 * A shape a linked data node should be in.
 *
 * Consists of a target and a list of property shapes defining the shape that the target node's properties should be in.
 *
 * @see https://www.w3.org/TR/shacl/#node-shapes
 */
export class NodeShape {
	/**
	 * The list of property shapes.
	 *
	 * @private
	 */
	private readonly property: PropertyShape[];

	/**
	 * The target class.
	 *
	 * TODO: Add support for other targets, like `sh:targetNode`.
	 *
	 * @private
	 */
	private readonly targetClass?: string;

	/**
	 * Creates a new node shape.
	 *
	 * @param nodeShape The node shape data.
	 */
	constructor( nodeShape: INodeShape ) {
		this.property = nodeShape.property.map( property => new PropertyShape( property ) );
		this.targetClass = nodeShape.targetClass;
	}

	/**
	 * Checks whether this node shape is applicable to the given node.
	 *
	 * E.g. if the node type is the same as the target class in this node shape.
	 *
	 * @param node The node to check.
	 *
	 * @return Whether this node shape is applicable to the given node.
	 */
	public isApplicable( node: Node ): boolean {
		return node[ "@type" ] === this.targetClass;
	}

	/**
	 * Validates the given node according to this node shape's property shapes
	 * and the given list of available constraints.
	 *
	 * @param node The node to check.
	 * @param availableConstraints The registry of available constraints that can be used.
	 *
	 * @return A list of validation results if any constraints are violated, or an empty list if no constraints are violated.
	 */
	public validate( node: Node, availableConstraints: ConstraintRegistry ): ValidationResult[] {
		return flatMap( this.property, shape => shape.validate( node, availableConstraints ) );
	}
}
