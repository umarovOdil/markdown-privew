
const inputData = document.querySelector('textarea');
const outputData = document.querySelector('.output-box');
const selectedFileType = document.querySelector('.file-type');

const initialMarkdown = `#### **Installation**
___
Just the \`markdown\` library:
\`\`\`
 npm install markdown
\`\`\`
Optionally, install \`md2html\` into your path
\`\`\`
 npm install -g markdown
\`\`\`

#### **Usage**
___
##### **Node**
The simple way to use it with node is:
\`\`\`
 var markdown = require( "markdown" ).markdown;
 console.log( markdown.toHTML( "Hello *World*!" ) );
\`\`\`
`;

inputData.value = initialMarkdown;

outputData.innerHTML = marked.parse(`${inputData.value}`)


inputData.addEventListener('input' , ()=>{

    outputData.innerHTML = marked.parse(`${inputData.value}`);

})

function downloadFile(){

    const fileType = selectedFileType.value

    if(fileType == 'null')
        return;

    if(fileType != 'pdf'){
    const fileType = selectedFileType.value
       downloadMarkdown(fileType);
    }else{
        exportToPDF();
    }
}


function downloadMarkdown(fileType) {
    const text = fileType == 'html' ? outputData.innerHTML : inputData.value ;
    const blob = new Blob([text], { type: fileType == 'md' ? "text/markdown" : fileType == 'html' ? "text/html" : "text/plain"});
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = "markdown." + fileType;
    a.click();
  
    URL.revokeObjectURL(url);
}

function exportToPDF() {

    const htmlContent = outputData.innerHTML;
  
    const container = document.createElement('div');
    container.style.padding = '25px';
    container.innerHTML = htmlContent;
  
    html2pdf()
      .set({ filename: 'markdown.pdf' })
      .from(container)
      .save();
}

