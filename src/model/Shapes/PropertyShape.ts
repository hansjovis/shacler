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

	public check( node: any, availableConstraints: ConstraintRegistry ): ValidationResult[] {
		return availableConstraints.getApplicableConstraints( this )
			.filter( constraint => ! constraint.isValid( node, this.shape ) )
			.map( constraint => this.generateResult( node, constraint ) );
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
