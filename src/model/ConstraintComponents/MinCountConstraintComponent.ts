import ConstraintComponent from "./ConstraintComponent";
import { IPropertyShape } from "../Shapes/PropertyShape";
import { Node } from "../Node";

/**
 * A minimum count constraint.
 *
 * Constrains the minimum amount of a given property a node should have.
 *
 * @example ```
 * // Each ExampleClass should have at least one name property.
 * {
 * 		"@context": {
 * 			"@vocab": "http://www.w3.org/ns/shacl#",
 * 			"ex": "https://example.org/"
 * 		}
 * 		"@type": "NodeShape",
 * 		"targetClass": "ex:ExampleClass"
 * 		"property": {
 * 			"path": "ex:name",
 * 			"minCount": 1
 * 		}
 * }
 * ```
 */
export default class MinCountConstraintComponent extends ConstraintComponent {
	/**
	 * Returns the message that should be used when this constraint is violated
	 * for the given node and the configuration in given property shape.
	 *
	 * @param node The node to check.
	 * @param propertyShape The property shape to use.
	 *
	 * @return The message that should be used when this constraint is violated.
	 */
	getMessage( node: Node, propertyShape: IPropertyShape ): string {
		return `Less than ${ propertyShape.minCount } values.`;
	}

	/**
	 * Checks whether the given node is valid according to the rules of this
	 * constraint component and the configuration given in the property shape.
	 *
	 * @param node The node to check.
	 * @param propertyShape The property shape to use.
	 *
	 * @return Whether the node is valid according to this constraint and the given property shape.
	 */
	isValid( node: Node, propertyShape: IPropertyShape ): boolean {
		const minCount: number = propertyShape.minCount as number;

		if ( minCount === 0 ) {
			return true;
		}

		if ( minCount === 1 ) {
			return !node[ propertyShape.path ] === undefined;
		}

		return (node[ propertyShape.path ] as unknown[]).length >= minCount;
	}
}

