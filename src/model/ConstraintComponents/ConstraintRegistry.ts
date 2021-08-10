import ConstraintComponent from "./ConstraintComponent";
import { PropertyShape } from "../Shapes/PropertyShape";

export default class ConstraintRegistry {
	private readonly registry: Record<string, ConstraintComponent>;

	constructor() {
		this.registry = {};
		this.get = this.get.bind( this );
	}

	register( parameter: string, constraintComponent: ConstraintComponent ): void {
		this.registry[ parameter ] = constraintComponent;
	}

	get( parameter: string ): ConstraintComponent | undefined {
		return this.registry[ parameter ];
	}

	getApplicableConstraints( propertyShape: PropertyShape ): ConstraintComponent[] {
		return Object.keys( propertyShape.constraints )
			.map( this.get )
			.filter( x => x ) as ConstraintComponent[];
	}
}
