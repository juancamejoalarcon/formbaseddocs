import { Injectable } from '@angular/core';
import { CommonsService } from '../../../../core';
import * as FormBasedDocsApi from '../../../../../assets/js/wodotexteditor/localfileeditor.js';
@Injectable()
export class DocumentCreatorService {

  public defaultUri = 'data:application/vnd.oasis.opendocument.text;base64,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AAAAAAAAGAAAAENvbmZpZ3VyYXRpb25zMi9tZW51YmFyL1BLAwQKAAAAAADrRU1PAAAAAAAAAAAAAAAAGAAAAENvbmZpZ3VyYXRpb25zMi90b29sYmFyL1BLAwQKAAAAAADrRU1PAAAAAAAAAAAAAAAAHAAAAENvbmZpZ3VyYXRpb25zMi9wcm9ncmVzc2Jhci9QSwMECgAAAAAA60VNTwAAAAAAAAAAAAAAABoAAABDb25maWd1cmF0aW9uczIvcG9wdXBtZW51L1BLAwQKAAAAAADrRU1PAAAAAAAAAAAAAAAAHwAAAENvbmZpZ3VyYXRpb25zMi9pbWFnZXMvQml0bWFwcy9QSwMECgAAAAAA60VNTwAAAAAAAAAAAAAAABoAAABDb25maWd1cmF0aW9uczIvc3RhdHVzYmFyL1BLAwQKAAAAAADrRU1PAAAAAAAAAAAAAAAAHAAAAENvbmZpZ3VyYXRpb25zMi9hY2NlbGVyYXRvci9QSwMECgAAAAAA60VNTwAAAAAAAAAAAAAAABoAAABDb25maWd1cmF0aW9uczIvdG9vbHBhbmVsL1BLAwQKAAAAAADrRU1PtPdo0oMDAACDAwAADAAAAG1hbmlmZXN0LnJkZjw/eG1sIHZlcnNpb249IjEuMCIgZW5jb2Rpbmc9InV0Zi04Ij8+CjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9InN0eWxlcy54bWwiPgogICAgPHJkZjp0eXBlIHJkZjpyZXNvdXJjZT0iaHR0cDovL2RvY3Mub2FzaXMtb3Blbi5vcmcvbnMvb2ZmaWNlLzEuMi9tZXRhL29kZiNTdHlsZXNGaWxlIi8+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiI+CiAgICA8bnMwOmhhc1BhcnQgeG1sbnM6bnMwPSJodHRwOi8vZG9jcy5vYXNpcy1vcGVuLm9yZy9ucy9vZmZpY2UvMS4yL21ldGEvcGtnIyIgcmRmOnJlc291cmNlPSJzdHlsZXMueG1sIi8+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiAg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';

  public originalDocumentBodyClone: any;
  public currentDocumentBodyClone: any;

  constructor(
    private commonsService: CommonsService,
  ) { }

  init() {
    this.commonsService.toggleSpinner();
    this.createEditorFromURI('fillForm', 'editorContainer', this.defaultUri);
      setTimeout(() => {
        this.resizeDocumentContainer();
        window.addEventListener('resize', this.resizeDocumentContainer);
        this.originalDocumentBodyClone = document.getElementsByTagName('office:text')[0].cloneNode(true);
        this.commonsService.toggleSpinner();
      }, 5000);
  }

  destroy() {
    FormBasedDocsApi.closeAndDestroyEditor();
  }

  createEditorFromURI(formType: string, idOfContainer: string = 'editorContainer', dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {type: mimeString});
    const url = URL.createObjectURL(blob);
    window['DOCUMENTOURL'] = url;
    FormBasedDocsApi.createEditor(formType, idOfContainer);
  }

  getEditorSession() {
    return FormBasedDocsApi.getEditorSession();
  }

  resizeDocumentContainer() {
    FormBasedDocsApi.documentToFitScreen();
  }

  buildDocument(steps: any) {
    this.currentDocumentBodyClone = this.originalDocumentBodyClone.cloneNode(true);
    // 1.- Change doc structure
    this.structuralChanges(steps);
    // 2.- Change values
    this.replacements(steps);

    document.getElementsByTagName('office:text')[0].parentElement.replaceChild(
      this.currentDocumentBodyClone.cloneNode(true), document.getElementsByTagName('office:text')[0]
    );
  }
  /************************/
  /* CHANGE DOC STRUCTURE */
  /************************/
  structuralChanges(steps: any) {
    // console.log(steps);
    steps.forEach((step: any) => {
      if (step.type === 'iRadioC') {
        this.buildForRadioC(step);
      } else if (step.type === 'iCheckbox') {
        this.buildForCheckbox(step);
      } else if (step.type === 'iForEach') {
        this.buildForEach(step);
      }
    });
  }

  buildForEach(step: any) {
    step.content.forEach((content: any) => {
      // Find paragrah
      const elementContainingWord = this.findword(content.wordToReplace);
      // Case where we just have the word, and nothing more
      if (elementContainingWord.textContent === content.wordToReplace) {
        // Reversed copy of the array so we inject elements in order
        const newarray = content.modifiedReplacements.slice().reverse();

        newarray.forEach((modifiedReplacement: any, index: number) => {
          let exactElementContainingWord: any;
          const regexp = new RegExp(step.wordToReplace, 'g');

          if (index !== content.modifiedReplacements.length - 1) {
            const elementContainingWordClone = elementContainingWord.cloneNode(true);
            elementContainingWord.parentNode.insertBefore(elementContainingWordClone, elementContainingWord.nextSibling);
            exactElementContainingWord = elementContainingWordClone;
          } else {
            exactElementContainingWord = elementContainingWord;
          }

          exactElementContainingWord = this.findExactContainingElement(step.wordToReplace, exactElementContainingWord);
          console.log(exactElementContainingWord);
          exactElementContainingWord.innerHTML = exactElementContainingWord.innerHTML.replace(regexp, modifiedReplacement);
        });

        const newarray2 = content.modifiedExtraReplacements.slice().reverse();
        newarray2.forEach((modifiedExtraReplacement: any, index: number) => {
          modifiedExtraReplacement.forEach((modifiedExtraReplacementArray: any) => {
            const elementContainingWord2 = this.findword(modifiedExtraReplacementArray[0].identifier);
            const newarray3 = modifiedExtraReplacementArray.slice().reverse();
            newarray3.forEach(((modifiedReplacement: any, indexNewArray3: number) => {
                let exactElementContainingWord2: any;
                const regexp = new RegExp(modifiedReplacement.identifier, 'g');

                if (indexNewArray3 !== modifiedExtraReplacementArray.length - 1) {
                  const elementContainingWordClone = elementContainingWord2.cloneNode(true);
                  elementContainingWord2.parentNode.insertBefore(elementContainingWordClone, elementContainingWord2.nextSibling);
                  exactElementContainingWord2 = this.findExactContainingElement(modifiedReplacement.identifier, elementContainingWordClone);
                } else {
                  exactElementContainingWord2 = this.findExactContainingElement(modifiedReplacement.identifier, elementContainingWord2);
                }
                exactElementContainingWord2.innerHTML = exactElementContainingWord2.innerHTML
                .replace(regexp, modifiedReplacement.replacement);
              }));

          });
        });
      }
    });
  }

  buildForRadioC(step: any) {
    let elementContainingWord = this.findword(step.wordToReplace);
    const regexp = new RegExp(step.wordToReplace, 'g');
    let replacement: string;
    step.radios.forEach((radio) => {
      if (radio.checked) {
        replacement = radio.replacement;
        step.extraReplacements.forEach((extraReplacement: any, index: any) => {
          const regexp2 = new RegExp(extraReplacement.wordToReplace, 'g');
          const elementContainingReplacementWord = this.findword(extraReplacement.wordToReplace);
          const exactElementContainingReplacementWord =
          this.findExactContainingElement(extraReplacement.wordToReplace, elementContainingReplacementWord);
          let replacement2: any;
          radio.extraReplacements.forEach((radioExtraReplacement: any) => {
            if (radioExtraReplacement.insideId === extraReplacement.insideId) {
              // console.log(radioExtraReplacement);
              replacement2 = radioExtraReplacement.replacement;
            }
          });
          exactElementContainingReplacementWord.innerHTML = exactElementContainingReplacementWord.innerHTML
          .replace(regexp2, replacement2);
        });
      }
    });
    // // Case where we have just one paragraph with the wordToReplace
    // if (elementContainingWord.children.length === 1) {
    //   elementContainingWord.firstChild.innerHTML = replacement;
    // } else {
    //   while (elementContainingWord.firstElementChild) {
    //     elementContainingWord = elementContainingWord.firstElementChild;
    //   }
    //   elementContainingWord.innerHTML = elementContainingWord.innerHTML.replace(regexp, replacement);
    // }
    while (elementContainingWord.firstElementChild) {
        elementContainingWord = elementContainingWord.firstElementChild;
      }
    elementContainingWord.innerHTML = elementContainingWord.innerHTML.replace(regexp, replacement);
  }

  buildForCheckbox(step: any) {
    const elementContainingWord = this.findword(step.wordToReplace);
    let replacement = step.replacement;
    step.checkboxes.forEach((checkbox) => {
      // Check if it contains the word (rules)
      if (step.replacement.includes(checkbox.wordToReplace)) {
        if (checkbox.checked) {
          const regexp = new RegExp(checkbox.wordToReplace, 'g');
          replacement = replacement.replace(regexp, checkbox.replacement);
        } else {
          const regexp = new RegExp(checkbox.wordToReplace, 'g');
          replacement = replacement.replace(regexp, '');
        }
      }
    });
    // Case where we have just one paragraph with the wordToReplace
    if (elementContainingWord.innerHTML === step.wordToReplace) {
      elementContainingWord.innerHTML = replacement;
    }
  }
  /*****************************/
  /*END OF CHANGE DOC STRUCTURE*/
  /*****************************/

  replacements(steps: any) {
    steps.forEach((step: any) => {
      if (step.type === 'iText' || step.type === 'iDate') {
        const elementsContainingWord = this.findAllwords(step.wordToReplace);
        const regexp = new RegExp(step.wordToReplace, 'g');
        elementsContainingWord.forEach((elementContainingWord: any) => {
          let element = elementContainingWord;
          if (element.innerHTML !== step.wordToReplace) {
            // Find the innermost element containing the word
            element = this.findExactContainingElement(step.wordToReplace, element);
          }
          if (element) {
            element.innerHTML = element.innerHTML.replace(regexp,
            `<span class="highlight ${step.isFocused ? 'focused' : ''}" data-identifier="${step.wordToReplace}">${step.replacement}</span>`);
          }
        });
      } else if (step.type === 'iRadioB') {
        const elementsContainingWord = this.findAllwords(step.wordToReplace);
        let replacement: any;
        const regexp = new RegExp(step.wordToReplace, 'g');
        elementsContainingWord.forEach((elementContainingWord: any) => {
          step.radios.forEach((radio) => {
            if (radio.checked) {
              replacement = radio.replacement;
              let element = elementContainingWord;
              if (element.innerHTML !== step.wordToReplace) {
                // Find the innermost element containing the word
                element = this.findExactContainingElement(step.wordToReplace, element);
              }
              if (element) {
                element.innerHTML = element.innerHTML.replace(regexp,
                `<span class=" ${step.isFocused ? 'focused' : ''}" data-identifier="${step.wordToReplace}">${step.replacement}</span>`);
              }
            }
          });
          console.log(elementContainingWord);
        });
      }
    });
  }

  findword(wordToReplace: string, bodyClone: any = this.currentDocumentBodyClone) {
    // USE ARRAY FOR ALL VALUES
    const children = bodyClone.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (!this.elementIsExcluded(children[i])) {
        if (children[i].innerHTML.includes(wordToReplace) || children[i].textContent.includes(wordToReplace)) {
          return children[i];
        }
      }
    }
  }

  findAllwords(wordToReplace: string, bodyClone: any = this.currentDocumentBodyClone) {
    const allEelementsContainingWord = [];
    const children = bodyClone.childNodes;
    for (let i = 0; i < children.length; i++) {
      if (!this.elementIsExcluded(children[i])) {
        if (children[i].innerHTML.includes(wordToReplace)) {
          allEelementsContainingWord.push(children[i]);
        }
      }
    }
    return allEelementsContainingWord;
  }

  findExactContainingElement(wordToReplace: string, bodyClone: any) {
  let element: any = bodyClone;
    while (element.childNodes && element.childNodes.length > 0 && element.innerHTML.includes(wordToReplace)) {
      element.childNodes.forEach(((el: any) => {
        if (el.nodeName !== '#text') {
          if (el.innerHTML.includes(wordToReplace)) {
            element = el;
          }
        } else {
          if (el.textContent.includes(wordToReplace)) {
            element = el;
          }
        }
      }));
    }
    if (element.nodeName === '#text') {
      element = element.parentNode;
    }
    return element;
  }

  elementIsExcluded(element: any) {
    const excludedElements = [
        'office:text',
        'text:sequence-decls',
        'text:sequence-decl',
        'draw:frame',
        'draw:image',
        'office:annotation',
        'office:annotation-end',
        'dc:creator',
        'dc:date'
    ];
    return excludedElements.includes(element.nodeName);
  }
}