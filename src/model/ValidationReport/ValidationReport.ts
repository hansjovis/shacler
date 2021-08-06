import ValidationResult from "./ValidationResult";

export default interface ValidationReport {
	conforms: boolean;
	result?: ValidationResult[];
}
