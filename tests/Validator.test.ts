import Validator from "../src/Validator";
import { IShapeGraph } from "../src/model/Shapes/ShapeGraph";

describe( 'Validator', function () {
	it( "can create a new Validator", () => {
		const shapes = {
			"@graph": [],
		};
		const validator = new Validator( shapes );
	} );

	describe( "validate method", () => {
		it( "returns a passing validation report when given an empty graph", () => {
			const shapes = {
				"@graph": [],
			};

			const validator = new Validator( shapes );

			const data = {
				"@graph": []
			};

			const report = validator.validate( data );

			expect( report.conforms ).toStrictEqual( true );
		} );

		it( "counts as invalid when a minimalCount constraint is violated", () => {
			const shapes: IShapeGraph = {
				"@graph": [
					{
						targetClass: "Person",
						property: [
							{
								path: "name",
								minCount: 1,
								message: "A Person should have a name.",
								severity: "Error",
							}
						]
					}
				],
			};

			const validator = new Validator( shapes );

			const data = {
				"@context": "https://schema.org/",
				"@graph": [
					{
						"@type": "Person",
					}
				]
			};

			const report = validator.validate( data );

			console.log( JSON.stringify( report, null, 2 ) );

			expect( report.conforms ).toStrictEqual( false );
			expect( report.result ).toHaveLength( 1 );
		} );
	} );
} );
