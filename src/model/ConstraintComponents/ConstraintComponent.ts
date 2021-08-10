import { IPropertyShape } from "../Shapes/PropertyShape";
import { Node } from "../Node";

export default abstract class ConstraintComponent {
	abstract isValid( node: Node, property: IPropertyShape ): boolean;
	abstract getMessage( node: Node, property: IPropertyShape ): string;
}
