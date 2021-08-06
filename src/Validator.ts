import { Graph } from "./model/Graph";
import ValidationReport from "./model/ValidationReport/ValidationReport";
import { IShapeGraph, ShapeGraph } from "./model/Shapes/ShapeGraph";
import ValidationResult from "./model/ValidationReport/ValidationResult";
import { PropertyShape } from "./model/Shapes/PropertyShape";

import MinCountConstraintComponent from "./model/ConstraintComponents/MinCountConstraintComponent";
import ConstraintRegistry from "./model/ConstraintComponents/ConstraintRegistry";

ConstraintRegistry.register( "minCount", new MinCountConstraintComponent() );

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
	 * Creates a new SHACL validator.
	 *
	 * @param shapes The shape graph to validate against.
	 */
	constructor( shapes: IShapeGraph ) {
		this.shapes = new ShapeGraph( shapes );
	}

	/**
	 * Validates the given linked data graph.
	 * (Against the shape graph set in the constructor).
	 *
	 * @param data The linked data graph to validate.
	 */
	public validate( data: Graph ): ValidationReport {
		const graph = data[ "@graph" ];
		const nodeShapes = this.shapes.graph;

		const results: ValidationResult[] = [];

		graph.forEach( node => {
			nodeShapes.forEach( nodeShape => {
				if ( nodeShape.isApplicable( node ) ) {
					const nodeResults: ValidationResult[] = [];
					nodeShape.property.forEach(
						( propertyShape: PropertyShape ) => {
							nodeResults.push( ... propertyShape.check( node ) );
						}
					);
					results.push( ...nodeResults );
				}
			} );
		} );

		return {
			conforms: results.length === 0,
			result: results,
		};
	}
}
