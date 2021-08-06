import { INodeShape, NodeShape } from "./NodeShape";

export interface IShapeGraph {
	"@graph": INodeShape[];
}

export class ShapeGraph {
	graph: NodeShape[];

	constructor( shapeGraph: IShapeGraph ) {
		this.graph = shapeGraph[ "@graph" ].map(
			nodeShape => new NodeShape( nodeShape )
		);
	}
}
