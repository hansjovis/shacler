import { IPropertyShape } from "../Shapes/PropertyShape";
import { Node } from "../Node";

/**
 * A constraint component.
 *
 * Represents a possible constraint on a linked data node's properties.
 *
 * @see https://www.w3.org/TR/shacl/#dfn-constraint-component
 */
export default abstract class ConstraintComponent {
	/**
	 * Checks whether the given node is valid according to the rules of this
	 * constraint component and the configuration given in the property shape.
	 *
	 * @param node The node to check.
	 * @param propertyShape The property shape to use.
	 *
	 * @return Whether the node is valid according to this constraint and the given property shape.
	 */
	abstract isValid( node: Node, propertyShape: IPropertyShape ): boolean;

	/**
	 * Returns the message that should be used when this constraint is violated
	 * for the given node and the configuration in given property shape.
	 *
	 * @param node The node to check.
	 * @param propertyShape The property shape to use.
	 *
	 * @return The message that should be used when this constraint is violated.
	 */
	abstract getMessage( node: Node, propertyShape: IPropertyShape ): string;
}
