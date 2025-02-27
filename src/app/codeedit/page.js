"use client";

import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Search from '../assets/search';
import { AiFillHtml5, } from 'react-icons/ai'
import { FaCss3, FaJs } from 'react-icons/fa'
import { Editor } from '@monaco-editor/react';
export default function Nav() {
  const [htmlCode, setHtmlCode] = useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
    </body>
    </html>
  `);
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [showViewSection, setShowViewSection] = useState(false);
  const [showIndexHtmlSection, setShowIndexHtmlSection] = useState(false);
  const [showStyleCssSection, setShowStyleCssSection] = useState(false);
  const [showScriptJsSection, setShowScriptJsSection] = useState(false);
  const [code, setCode] = useState('');

  const iframeRef = useRef(null);

  useEffect(() => {
    setCode(`
      <style>${cssCode}</style>
      ${htmlCode}
      <script>${jsCode}</script>
    `);
  }, [htmlCode, cssCode, jsCode]);

  const handleHtmlChange = (event) => {
    const newHtmlCode = event.target.value;
    setHtmlCode(newHtmlCode);
  };

  const handleCssChange = (event) => {
    const newCssCode = event.target.value;
    setCssCode(newCssCode);
  };

  const handleJsChange = (event) => {
    const newJsCode = event.target.value;
    setJsCode(newJsCode);
  };

  const handleDownload = () => {
    const zip = new JSZip();

    // Add HTML file to zip
    zip.file('index.html', htmlCode);

    // Add CSS file to zip
    zip.file('style.css', cssCode);

    // Add JS file to zip
    zip.file('script.js', jsCode);

    // Generate the zip file
    zip.generateAsync({ type: 'blob' }).then((content) => {
      // Save the zip file
      saveAs(content, 'code_files.zip');
    });
  };

  const handleViewClick = () => {
    setShowViewSection(true);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(false);
    setShowScriptJsSection(false);
  };

  useEffect(() => {
    if (showViewSection) {
      const iframe = iframeRef.current;
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.writeln(code);
      iframe.contentWindow.document.close();
    }
  }, [showViewSection, code]);

  const handleIndexHtmlClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(true);
    setShowStyleCssSection(false);
    setShowScriptJsSection(false);
  };

  const handleStyleCssClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(true);
    setShowScriptJsSection(false);
  };

  const handleScriptJsClick = () => {
    setShowViewSection(false);
    setShowIndexHtmlSection(false);
    setShowStyleCssSection(false);
    setShowScriptJsSection(true);
  };
  useEffect(() => {
    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
          e.preventDefault();

          // Get the current cursor position
          var start = this.selectionStart;
          var end = this.selectionEnd;

          // Insert three spaces at the cursor position
          this.value = this.value.substring(0, start) + '   ' + this.value.substring(end);

          // Move the cursor position after the inserted spaces
          this.selectionStart = this.selectionEnd = start + 3;
        }
      });
    });
  }, []);
  return (
    <div className='h-screen overflow-hidden'>
      <nav className="bg-blue-500 py-4 px-6 flex">
        <a href='https://web-dev-tools.vercel.app/' className='w-1/5 mr-2 flex border rounded p-2 hover:bg-blue-600'>
          <h1 className="text-white text-2xl font-bold mr-1">Web Dev Tools</h1>
          <p>Code editor</p>
        </a>
        <Search />
      </nav>
      <main className='flex h-full overflow-hidden'>
        <section className='w-1/3 h-full bg-gray-600'>
          <div>
            <button onClick={handleDownload} className='w-full bg-slate-400 hover:bg-slate-500'>Download</button>
          </div>
          <button onClick={handleViewClick} className='w-full text-center bg-slate-800 hover:bg-slate-900 h-10'>View</button>
          <button onClick={handleIndexHtmlClick} className='w-full text-center bg-slate-800 hover:bg-slate-900 h-10 flex pl-8 pt-2'><AiFillHtml5 className='mr-2' size={18} color='#E34F26'></AiFillHtml5>Index.html</button>
          <button onClick={handleStyleCssClick} className='w-full text-center bg-slate-800 hover:bg-slate-900 h-10 flex pl-8 pt-2'><FaCss3 className='mr-2' size={18} color='#0000FF'></FaCss3>Style.css</button>
          <button onClick={handleScriptJsClick} className='w-full text-center bg-slate-800 hover:bg-slate-900 h-10 flex pl-8 pt-2'><FaJs className='mr-2' size={18} color='#FFFF00'></FaJs>Script.js</button>
        </section>

        <section className='w-2/3 h-full'>
          {showViewSection && (
            <section className='p-5 w-full h-full bg-white'>
              <iframe
                id="result-iframe"
                title="Result"
                className="w-full h-full"
                ref={iframeRef}
              ></iframe>
            </section>
          )}
          {showIndexHtmlSection && (
            <section className='w-full h-full'>
              <Editor theme='vs-dark' defaultLanguage='html' width='100%' height='100%' defaultValue={`${htmlCode ? htmlCode : '<!-- add some html code here -->'} `} />
              {/* <textarea value={htmlCode} onChange={handleHtmlChange} className='bg-slate-500 w-full h-full'></textarea> */}
            </section>
          )}
          {showStyleCssSection && (
            <section className='w-full h-full'>
              <Editor theme='vs-dark' defaultLanguage='css' width='100%' height='100%' defaultValue={`${cssCode ? cssCode : '/* add some CSS code here */'} `} />
              {/* <textarea value={cssCode} onChange={handleCssChange} className='bg-slate-500 w-full h-full'></textarea> */}
            </section>
          )}
          {showScriptJsSection && (
            <section className='w-full h-full'>
              <Editor theme='vs-dark' defaultLanguage='javascript' width='100%' height='100%' defaultValue={`${jsCode ? jsCode : '// add some JvaScript code here '} `} />
              {/* <textarea value={jsCode} onChange={handleJsChange} className='bg-slate-500 w-full h-full'></textarea> */}
            </section>
          )}
          {!showViewSection && !showIndexHtmlSection && !showStyleCssSection && !showScriptJsSection && (
            <section className='h-full flex flex-col justify-center items-center'>
              <h1 className='font-bold text-center'>Nothing to view</h1>
              <p className='mt-4 text-center'>Please select a file to view</p>
            </section>
          )}
        </section>
      </main>
    </div>
  );
}
