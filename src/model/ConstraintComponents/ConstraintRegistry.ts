import ConstraintComponent from "./ConstraintComponent";

export default class ConstraintRegistry {
	private static registry: Record<string, ConstraintComponent>;

	static register( parameter: string, constraintComponent: ConstraintComponent ) {
		if ( ! this.registry ) {
			this.registry = {};
		}
		this.registry[ parameter ] = constraintComponent;
	}

	static get( parameter: string ): ConstraintComponent | undefined {
		if ( ! this.registry ) {
			return undefined;
		}
		return this.registry[ parameter ];
	}
}
