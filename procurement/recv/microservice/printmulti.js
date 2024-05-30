const path = require('path');
const fs = require('fs');
const nodemodules_dir = path.join(process.cwd(), 'node_modules');


const html_to_pdf = require(path.join(nodemodules_dir, 'html-pdf-node'));


let options = { 
	format: 'A4', 
// 	path: '/home/agung/Development/fgtacloud4u/server/apps/finact/procurement/recv/microservice'
};

let file = [{ url: "http://localhost/tvone/index.php/printout/finact/procurement/recv/recv.xprint?id=RV21100009", name:"satu.pdf",  }];



// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
// 	console.log("PDF Buffer:-", pdfBuffer);
//   });


// let options = { format: 'A4', path: '/home/agung/Development/fgtacloud4u/server/apps/finact/procurement/recv/microservice/' };
// let file = [{ url: "https://example.com", name: 'example.pdf' }];

html_to_pdf.generatePdfs(file, options).then(output => {
	// console.log("PDF Buffer:-", output); // PDF Buffer:- [{url: "https://example.com", name: "example.pdf", buffer: <PDF buffer>}]

	var path = '/home/agung/Development/fgtacloud4u/server/apps/finact/procurement/recv/microservice/satu.pdf';
	var buffer = Buffer.from(output[0].buffer)

	// console.log(buffer);
	fs.createWriteStream(path).write(buffer);

});
