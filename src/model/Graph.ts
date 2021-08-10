import { Node } from "./Node";

export interface Graph {
	"@context"?: Record<string, unknown> | string;
	"@graph": Node[];
}
