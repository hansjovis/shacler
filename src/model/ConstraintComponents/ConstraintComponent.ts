import { IPropertyShape } from "../Shapes/PropertyShape";

export default abstract class ConstraintComponent {
	abstract isValid( node: any, property: IPropertyShape ): boolean;
	abstract getMessage( node: any, property: IPropertyShape ): string;
}
