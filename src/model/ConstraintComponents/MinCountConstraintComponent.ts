import ConstraintComponent from "./ConstraintComponent";
import { IPropertyShape } from "../Shapes/PropertyShape";

export default class MinCountConstraintComponent extends ConstraintComponent {
	getMessage( node: any, property: IPropertyShape ): string {
		return `Less than ${ property.minCount } values.`;
	}

	isValid( node: any, property: IPropertyShape ): boolean {
		const minCount: number = property.minCount as number;

		if ( minCount === 0 ) {
			return true;
		}

		if ( minCount === 1 ) {
			return ! node[ property.path ] === undefined;
		}

		return node[ property.path ].length >= minCount;
	}
}

