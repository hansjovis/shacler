import IPropertyShape from "../Shapes/PropertyShape";

export default interface ValidationResult {
	focusNode: unknown;
	sourceShape: IPropertyShape;
	sourceConstraintComponent: string;
	detail?: string;
	resultPath?: string;
	resultMessage: string;
	resultSeverity: string;
}
