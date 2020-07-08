/* TAX CALCULATOR */

/* 
- 15% on the first $48,535 of taxable income.
- 20.5% on the next $48,534 of taxable income 
(on the portion of taxable income over 48,535 up to 
$97,069).
- 26% on the next $53,404 of taxable income 
(on the portion of taxable income over $97,069 up to 
$150,473).
- 29% on the next $63,895 of taxable income 
(on the portion of taxable income over 150,473 up to 
$214,368).
- 33% of taxable income over $214,368.
*/

const taxFunc = {

	taxCal: (gross_income) => {
		var r_sum;
		// var gross_income = parseInt(document.getElementById("gross_income").value);

		// Calculating the percentage of income taken per bracket.
		const P = [(100 - 15.0), (100 - 20.5), (100 - 26.0), (100 - 29.0), (100 - 33.0)];

		// Calculating the tax owed per bracket, if maximum is met.
		const TAX = [((48535*100 - 48535*P[1])/(100)),  // BELOW   48K
		             ((48534*100 - 48534*P[2])/(100)),  // 48K  -  97K
		             ((53404*100 - 53404*P[3])/(100)),  // 97K  - 150K
		             ((63895*100 - 63895*P[4])/(100))]; // 150K - 214K

		// Calculating the maximum value per bracket.
		const BR = [48535.00, 97069.00, 150473.0, 214368.0];

		if (gross_income < BR[0]) {
			let total_tax_income = ((gross_income*100 - gross_income*P[0])/(100));

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			//taxWrite(total_tax_income);
			return total_tax_income;

		} else if (BR[0] < gross_income && gross_income < BR[1]) {
			// Subtracts the prior bracket to calculate remaining income.
			let r_sum = (gross_income - BR[0]);
			// Uses kiss-and-flip method of percentile sum to calculate taxes.
			r_sum = ((r_sum*100 - r_sum*P[1])/(100));
			// Adds new bracket calculation with prior bracket calculation.
			let total_tax_income = r_sum + TAX[1];
			
			// Uses the Math.round function to round calculation to
			// the second decimal place, for monetary value. 
			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			//taxWrite(total_tax_income);
			return total_tax_income;
			

		} else if (BR[1] < gross_income && gross_income < BR[2]) {
			let r_sum = (gross_income - BR[1]);
			r_sum = ((r_sum*100 - r_sum*P[2])/(100));
			let total_tax_income = r_sum + TAX[0] + TAX[1];

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			//taxWrite(total_tax_income);
			return total_tax_income; 


		} else if (BR[2] < gross_income && gross_income < BR[3]) {
			let r_sum = (gross_income - BR[2]);
			r_sum = ((r_sum*100 - r_sum*P[3])/(100));
			let total_tax_income = r_sum + TAX[0] + TAX[1] + TAX[2];

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			//taxWrite(total_tax_income);
			return total_tax_income; 

		} else if (gross_income > BR[3]) {
			let r_sum = (gross_income - BR[3]);
			r_sum = ((r_sum*100 - r_sum*P[4])/(100));
			console.log(r_sum)
			let total_tax_income = r_sum + TAX[0] + TAX[1] + TAX[2] + TAX[3];
			console.log(total_tax_income)
			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			console.log(total_tax_income);
			return total_tax_income;

		} else {
			console.log("error!");
		}
	}
}

export default taxFunc;
