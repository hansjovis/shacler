import ConstraintComponent from "./ConstraintComponent";

export default class ConstraintRegistry {
	private static registry: Record<string, ConstraintComponent>;

	static register( key: string, constraintComponent: ConstraintComponent ) {
		if ( ! this.registry ) {
			this.registry = {};
		}
		this.registry[ key ] = constraintComponent;
	}

	static get( key: string ): ConstraintComponent | undefined {
		if ( ! this.registry ) {
			return undefined;
		}
		return this.registry[ key ];
	}
}
