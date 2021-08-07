import ConstraintComponent from "./ConstraintComponent";

export default class ConstraintRegistry {
	private registry: Record<string, ConstraintComponent>;

	constructor() {
		this.registry = {};
	}

	register( parameter: string, constraintComponent: ConstraintComponent ) {
		if ( ! this.registry ) {
			this.registry = {};
		}
		this.registry[ parameter ] = constraintComponent;
	}

	get( parameter: string ): ConstraintComponent | undefined {
		if ( ! this.registry ) {
			return undefined;
		}
		return this.registry[ parameter ];
	}
}
