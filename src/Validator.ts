import { Graph } from "./model/Graph";
import { Node } from "./model/Node";
import ValidationReport from "./model/ValidationReport/ValidationReport";
import { IShapeGraph, ShapeGraph } from "./model/Shapes/ShapeGraph";
import ValidationResult from "./model/ValidationReport/ValidationResult";
import ConstraintRegistry from "./model/ConstraintComponents/ConstraintRegistry";

import { flatMap } from "lodash";

/**
 * Used to validate a linked data graph using a SHACL shape graph.
 */
export default class Validator {
	/**
	 * The SHACL shapes to validate against.
	 *
	 * @private
	 */
	private readonly shapes: ShapeGraph;

	/**
	 * The registry of available constraint components.
	 *
	 * @private
	 */
	private readonly availableConstraints: ConstraintRegistry;

	/**
	 * Creates a new SHACL validator.
	 *
	 * @param shapes               The shape graph to validate against.
	 * @param availableConstraints The registry of available constraint components.
	 */
	constructor( shapes: IShapeGraph, availableConstraints: ConstraintRegistry ) {
		this.shapes = new ShapeGraph( shapes );
		this.availableConstraints = availableConstraints;
	}

	/**
	 * Validates the given linked data graph.
	 * (Against the shape graph set in the constructor).
	 *
	 * @param data The linked data graph to validate.
	 *
	 * @return The validation report.
	 */
	public validate( data: Graph ): ValidationReport {
		const graph = data[ "@graph" ];

		const results = flatMap( graph, ( node: Node ) => this.checkNode( node ) );

		return {
			conforms: results.length === 0,
			result: results,
		};
	}

	public checkNode( node: Node ): ValidationResult[] {
		const nodeShapes = this.shapes.graph;

		const applicableNodeShapes = nodeShapes.filter( shape => shape.isApplicable( node ) );

		return flatMap(
			applicableNodeShapes,
			shape => shape.check( node, this.availableConstraints )
		);
	}
}
