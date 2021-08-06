import ValidationResult from "../ValidationReport/ValidationResult";
import ConstraintRegistry from "../ConstraintComponents/ConstraintRegistry";
import ConstraintComponent from "../ConstraintComponents/ConstraintComponent";

export interface IPropertyShape {
	path: string;
	message?: string;
	severity?: string;
	[key: string]: unknown;
}

export class PropertyShape {
	shape: IPropertyShape;

	constraints: Record<string, any>;

	constructor( shape: IPropertyShape ) {
		this.shape = shape;

		this.constraints = Object.assign( {}, shape );

		delete this.constraints.path;
		delete this.constraints.message;
		delete this.constraints.severity;
	}

	public check( node: any ): ValidationResult[] {
		const results: ValidationResult[] = [];
		Object.keys( this.constraints ).forEach(
			key => {
				const result = this.checkConstraint( key, node );
				if ( result ) {
					results.push( result );
				}
			}
		);
		return results;
	}

	private checkConstraint( key: string, node: any ) {
		const constraint = ConstraintRegistry.get( key );

		if ( constraint && ! constraint.isValid( node, this.shape )  ) {
			return this.generateResult( node, constraint );
		}

		return null;
	}

	private generateResult( node: any, constraint: ConstraintComponent ): ValidationResult {
		return {
			focusNode: node,

			sourceConstraintComponent: "minCount",
			sourceShape: this.shape,

			resultMessage: this.shape.message || constraint.getMessage( node, this.shape ),
			resultPath: this.shape.path,
			resultSeverity: this.shape.severity || "Violation",
		};
	}
}
