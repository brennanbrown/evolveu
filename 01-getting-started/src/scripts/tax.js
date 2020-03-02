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

const tax = {

	taxCal: (gross_income) => {
		var r_sum;
		// var gross_income = parseInt(document.getElementById("gross_income").value);

		const P1 = (100 - 15.0);
		const P2 = (100 - 20.5);
		const P3 = (100 - 26.0);
		const P4 = (100 - 29.0);
		const P5 = (100 - 33.0);

		const TAX1 = ((48535*100 - 48535*P1)/(100)); // BELOW   48K
		const TAX2 = ((48534*100 - 48534*P2)/(100)); // 48K  -  97K
		const TAX3 = ((53404*100 - 53404*P3)/(100)); // 97K  - 150K
		const TAX4 = ((63895*100 - 63895*P4)/(100)); // 150K - 214K

		const BR1 = 48535.00;
		const BR2 = 97069.00;
		const BR3 = 150473.0;
		const BR4 = 214368.0;

		if (gross_income < BR1) {
			// TAX TOTAL
			let total_tax_income = ((gross_income*100 - gross_income*P1)/(100));
			// TAX INCOME TOTAL
			let total_tax = ((gross_income*100 - gross_income*(100-P1))/(100));

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			taxWrite(total_tax_income);
			return total_tax_income;

		} else if (BR1 < gross_income && gross_income < BR2) {
			// Subtracts the prior bracket to calculate remaining income.
			let r_sum = (gross_income - BR1);
			// Uses kiss-and-flip method of percentile sum to calculate taxes.
			r_sum = ((r_sum*100 - r_sum*P2)/(100));
			// Adds new bracket calculation with prior bracket calculation.
			let total_tax_income = r_sum + TAX1;

			let total_tax = ((total_tax_income*100 - total_tax_income*(100-P2))/(100));
			
			// Uses the Math.round function to round calculation to
			// the second decimal place, for monetary value. 
			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			taxWrite(total_tax_income);
			return total_tax_income;
			

		} else if (BR2 < gross_income && gross_income < BR3) {
			let r_sum = (gross_income - BR2);
			r_sum = ((r_sum*100 - r_sum*P3)/(100));
			let total_tax_income = r_sum + TAX1 + TAX2;

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			taxWrite(total_tax_income);
			return total_tax_income; 


		} else if (BR3 < gross_income && gross_income < BR4) {
			let r_sum = (gross_income - BR3);
			r_sum = ((r_sum*100 - r_sum*P4)/(100));
			let total_tax_income = r_sum + TAX1 + TAX2 + TAX3;

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			taxWrite(total_tax_income);
			return total_tax_income; 

		} else if (gross_income > BR4) {
			let r_sum = (gross_income - BR4);
			r_sum = ((r_sum*100 - r_sum*P5)/(100));
			let total_tax_income = r_sum + TAX1 + TAX2 + TAX3 + TAX4;
			let total_tax;

			total_tax_income = Math.round((total_tax_income + Number.EPSILON) * 100) / 100;
			taxWrite(total_tax_income);
			return total_tax_income;

		} else {
			console.log("error!");
		}
	}
}

export default tax;

function taxWrite(total_tax_income) {
	document.getElementById("tax").innerHTML = "$" + total_tax_income;
	return null;
}