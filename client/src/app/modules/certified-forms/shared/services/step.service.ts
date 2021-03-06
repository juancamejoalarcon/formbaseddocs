import { Injectable } from '@angular/core';
import { CommonsService } from '../../../../core';
import { DocCreatorService } from './doc-creator.service';
import {
  Input,
  InputText,
  InputForEach
} from '../../../../core';

@Injectable()
export class StepsService {
  public steps: Array<any>;
  public cacheSteps: Array<any>;

  constructor(
    private documentCreatorService: DocCreatorService,
    private commonsService: CommonsService
  ) { }

  init(steps: Array<Object>) {
    this.steps = steps;
    this.cacheSteps = JSON.parse(JSON.stringify(this.steps));
  }

  refreshCache() {
    this.cacheSteps = JSON.parse(JSON.stringify(this.steps));
  }

  setInitialState() {
    if (!this.steps[0].inited) {
      const buildSteps = () => {
        this.steps.forEach((step) => {
          step = JSON.parse(JSON.stringify(step))
          switch (step.type) {
            case 'start':
              step.inited = true;
              break;
            case 'iText':
              this.input(step.replacement, step.wordToReplace, false);
              break;
            case 'iNumber':
              this.input(step.replacement, step.wordToReplace, false);
              break;
            case 'iDate':
              this.input(step.replacement, step.wordToReplace, false);
              break;
            case 'iForEach':
              this.buildForEach(step.value, step.wordToReplace, false);
              break;
            case 'iRadioB':
              step.radios.forEach((radio) => {
                if (radio.checked) {
                  this.onInputRadioBSelected(radio.radioId, step.wordToReplace, false, true);
                }
              });
              break;
            case 'iRadioC':
              let noneIsChecked = true;
              step.radios.forEach((radio: any) => {
                if (radio.checked) {
                  noneIsChecked = false;
                  this.onInputRadioCSelected(radio.radioId, step.wordToReplace, false);
                }
              });
              if (noneIsChecked) {
                this.onInputRadioCSelected(step.defaultRadioId, step.wordToReplace, false);
              }
              break;
            default:
              break;
          }
        });
      };
      // We need to check the level of depth
      for (let i = 0; i < 5; i++) {
        buildSteps();
      }
    }
    this.buildDocument(false);
  }

  buildDocument(
    scrollToElement: boolean = true,
    buildJustReplacements: boolean = false,
    checkCache: boolean = false
  ) {
    if (checkCache) {
      this.checkCache();
    }
    this.documentCreatorService.buildDocument(this.steps, scrollToElement, buildJustReplacements);
  }

  checkCache() {
    this.steps.forEach((step) => {
      if (this.checkIfIsOfType(['iText', 'iNumber', 'iDate', 'iRadioB'], step)) {
        this.cacheSteps.forEach((cacheStep) => {
          if (step.wordToReplace === cacheStep.wordToReplace) {
            if (step.type === 'iRadioB') {
              cacheStep.radios.forEach((radio) => {
                if (radio.checked) {
                  this.onInputRadioBSelected(radio.radioId, step.wordToReplace, false, true);
                }
              });
            } else {
              step.replacement = cacheStep.replacement;
            }
          }
        });
      }
    });
  }

  checkIfIsOfType(types: string[], step: Input) {
    types.forEach((type: string) => {
      if (step.type === type) {
        return true;
      }
    });
    return false;
  }

  input(
    replacement: string,
    wordToReplace: string,
    buildDocumentAfter: boolean = true,
    buildJustReplacements: boolean = false) {
    const { step, index } = this.findStep(wordToReplace, true, 'wordToReplace');

    step.replacement = replacement;
    step.isFocused = true;
    if (step.type === 'iNumber') {
      this.rulesForInumber(step, index);
    }
    if (buildDocumentAfter) {
      this.buildDocument(true, buildJustReplacements);
    }
  }

  findStep(wordToReplace: string, setFocus: boolean, identifierToUse: string) {
    let stepFound: Input;
    let indexFound: number;
    this.steps.forEach((step: Input, index: number) => {
      if (step[identifierToUse] === wordToReplace) {
        stepFound = step;
        indexFound = index;
      } else if (setFocus) {
        step.isFocused = false;
      }
    });

    return {
      step: stepFound,
      index: indexFound,
    };
  }

  rulesForInumber(step: any, index: number) {
    if (step.rules && step.rules.length) {
      step.rules.forEach((rule: any) => {
        if (rule.rulename === 'extraReplacementToCharacter' && step.extraReplacements) {
          this.extraReplacementToCharacter(step, rule);
        }
        if (rule.rulename === 'extraReplacementAletras' && step.extraReplacements) {
          this.extraReplacementAletras(step, rule);
        }
      });
    }
  }

  extraReplacementToCharacter(step: Input, rule: any) {
    step.extraReplacements.forEach((extraReplacement: any, i: number) => {
      if (extraReplacement.wordToReplace === rule.wordToReplace) {
        step.extraReplacements.splice(i, 1);
      }
    });
    step.extraReplacements.push({
      wordToReplace: rule.wordToReplace,
      replacement: this.commonsService.precioALetras(step.replacement, {
        plural: 'euros',
        singular: 'euro',
        centPlural: 'centavos',
        centSingular: 'centavo'
      })
    });
  }

  extraReplacementAletras(step: Input, rule: any) {
    step.extraReplacements.forEach((extraReplacement: any, i: number) => {
      if (extraReplacement.wordToReplace === rule.wordToReplace) {
        step.extraReplacements.splice(i, 1);
      }
    });
    step.extraReplacements.push({
      wordToReplace: rule.wordToReplace,
      replacement: this.commonsService.numeroALetras(step.replacement)
    });
  }

  buildForEach(
    value: string,
    wordToReplace: string,
    buildDocumentAfter: boolean = true,
    forEachFocused: boolean = false,
    checkCache: boolean = false) {

    const refreshRadioBSteps = [];
    const refreshRadioCSteps = [];
    // 1. Find the step
    const { step, index } = this.findStep(wordToReplace, false, 'wordToReplace');
    step.forEachFocused = forEachFocused;
    step.value = value;
    // 2. Clean possible previously added steps, so we don't repeat them
    this.cleanPreviouslyAddedSteps(index, step.identifier);
    // 3. Loop through the texts that will be inserted
    step.content.forEach((content, contentIndex) => {
      content.modifiedReplacements = [];
      content.modifiedExtraReplacements = [];
      const modifiedExtraReplacements = [];
      content.extraReplacements.forEach(() => { modifiedExtraReplacements.push([]); });
      // 4. Add steps
      // tslint:disable-next-line:radix
      for (let i = 0; i < parseInt(value); i++) {
        let modifiedReplacement = content.replacementOriginal;
        content.extraReplacements.forEach((extraReplacement: any, indexOfExtraReplace: number) => {
          modifiedExtraReplacements[indexOfExtraReplace].push({
            identifier: extraReplacement.identifier,
            replacement: extraReplacement.replacementOriginal
          });
        });
        content.subSteps.forEach((subStep: any, subStepIndex: any) => {
          // 5. Modify subSteps identifiers and text with index of value loop iteration
          const newIndentifier = step.identifier + subStep.identifier + i.toString() + subStepIndex.toString();
          modifiedReplacement = modifiedReplacement.replace(subStep.identifier, newIndentifier);
          content.extraReplacements.forEach((extraReplacement: any, indexOfExtraReplace: number) => {
            const subStepExtraReplacement = subStep.extraReplacements[indexOfExtraReplace];
            const modifiedExtraReplacement = modifiedExtraReplacements[indexOfExtraReplace][i];
            modifiedExtraReplacement.wordToReplace = extraReplacement.identifier + i.toString() + subStepIndex.toString();
            const newIndentifier2 = step.identifier + subStepExtraReplacement.identifier + i.toString() + subStepIndex.toString();
            modifiedExtraReplacement.replacement =
              modifiedExtraReplacement.replacement.replace(subStepExtraReplacement.identifier, newIndentifier2);
            subStepExtraReplacement.wordToReplace = newIndentifier2;
            subStepExtraReplacement.identifier = newIndentifier2;
            // modifiedExtraReplacements[indexOfExtraReplace].push({
            //   wordToReplace: step.identifier + extraReplacement.identifier + i.toString() + subStepIndex.toString(),
            //   identifier: extraReplacement.identifier
            // });
          });
          // Deep copy
          let copySubStep = JSON.parse(JSON.stringify(subStep));
          this.cacheSteps.forEach((cachedStep) => {
            if (cachedStep.wordToReplace == newIndentifier) {
              copySubStep = JSON.parse(JSON.stringify(cachedStep));
              copySubStep.cached = true;
            }
          });
          copySubStep.identifier = newIndentifier;
          copySubStep.wordToReplace = newIndentifier;

          if (copySubStep.hasIndex) {
            if (parseInt(value) === 1) {
              copySubStep.question = copySubStep.questionOriginal.replace('->(index)', '');
            } else {
              copySubStep.question = copySubStep.questionOriginal.replace('->(index)', i + 1);
            }
          }

          this.steps.splice(
            ((index + 1) +
              (subStepIndex) +
              (i * content.subSteps.length) +
              // tslint:disable-next-line:radix
              ((parseInt(value) * contentIndex) * content.subSteps.length)
            ), 0, copySubStep);

          // refresh radioC inside forEach
          if (copySubStep.type === 'iRadioB') {
            refreshRadioBSteps.push(copySubStep);
          }

          // refresh radioC inside forEach
          if (copySubStep.type === 'iRadioC') {
            // Give new ids to substeps
            copySubStep.radios.forEach((radioC: any) => {
              radioC.subSteps.forEach((radioCsubstep: any) => {
                const newId = newIndentifier + radioCsubstep.identifier;
                const regexp3 = new RegExp(radioCsubstep.identifier, 'g');
                radioC.replacementOriginal = radioC.replacementOriginal.replace(regexp3, newId);
                radioCsubstep.wordToReplace = newId;
                // Mirar si se puede quitar esto
                radioCsubstep.identifier = newId;
              });
            });
            refreshRadioCSteps.push(copySubStep);
          }

        });
        content.modifiedReplacements.push(modifiedReplacement);
      }
      content.modifiedExtraReplacements.push(modifiedExtraReplacements);
      // 5. Insert text in the office document
    });

    refreshRadioBSteps.forEach((step) => {
      step.radios.forEach((radio) => {
        if (radio.checked) {
          this.onInputRadioBSelected(radio.radioId, step.wordToReplace, false, true);
        }
      });
    });

    if (buildDocumentAfter) {
      refreshRadioCSteps.forEach((step) => {
        if (step.cached) {
          step.radios.forEach((radio) => {
            if (radio.checked) {
              this.onInputRadioCSelected(radio.radioId, step.wordToReplace, false);
            }
          });
        } else {
          this.onInputRadioCSelected(step.defaultRadioId, step.wordToReplace, false);
        }
      });
      this.buildDocument(true, false, checkCache);
    }
  }

  cleanPreviouslyAddedSteps(index: number, identifierOrWordToReplace: string) {
    while (this.steps[index + 1] && this.steps[index + 1].wordToReplace.includes(identifierOrWordToReplace)) {
      this.steps.splice((index + 1), 1);
    }
  }

  onInputRadioBSelected(radioSelectedId: any, wordToReplace: string, buildDocumentAfter: boolean = true, avoidFocus: boolean = false) {
    // 1. Find the step
    const { step, index } = this.findStep(wordToReplace, false, 'wordToReplace');
    step.isFocused = avoidFocus ? false : true;
    // 2. Find radio selected
    step.radios.forEach((radio) => {
      if (radio.radioId === radioSelectedId) {
        step.replacement = radio.replacementOriginal;
        radio.checked = true;
        if (step.extraReplacements) {
          step.extraReplacements.forEach((extraReplacement, i) => {
            extraReplacement.replacement = radio.extraReplacements[i].replacement;
          });
        }
      } else {
        radio.checked = false;
      }
    });
    if (buildDocumentAfter) {
      this.buildDocument();
    }
  }

  onInputRadioCSelected(
    radioSelectedId: any,
    wordToReplace: string,
    buildDocumentAfter: boolean = true,
    radioCfocused: boolean = false,
    checkCache: boolean = false) {
    const refreshForEachInputs = [];
    const refreshNormalInputs = [];
    const refreshRadioBInputs = [];
    const refreshRadioCInputs = [];
    const buildSelectedRadio = (step: any, index: number, radio: any,) => {
      // 3. Clean possible previously added steps, so we don't repeat them
      this.cleanPreviouslyAddedSteps(index, step.wordToReplace);
      // 2. Add steps
      let replacement = radio.replacementOriginal;
      radio.extraReplacements.forEach((extraReplacement) => { extraReplacement.replacement = extraReplacement.replacementOriginal; });
      radio.subSteps.forEach((subStep, subStepIndex) => {

        // Make step unique modifying identifier
        subStep.wordToReplace = step.identifier + subStep.identifier;
        const regexp = new RegExp(subStep.identifier, 'g');
        replacement = replacement.replace(regexp, subStep.wordToReplace);

        radio.extraReplacements.forEach((extraReplacement) => {
          extraReplacement.replacement = extraReplacement.replacement.replace(subStep.identifier, subStep.wordToReplace);
        });
        // reset checkboxes if any
        if (subStep.type === 'iCheckbox') {
          subStep.checkboxes.forEach((checkbox) => { checkbox.checked = false; });
        }
        if (subStep.type === 'iRadioC') {
          // Si falla algo, mete el substep en la variable copysubstep
          subStep.inheritFromRadioC = subStep.wordToReplace;
          subStep.radios.forEach((radioC: any) => {
            radioC.subSteps.forEach((radioCsubstep: any) => {
              const newIndentifier = subStep.wordToReplace + radioCsubstep.identifier;
              const regexp3 = new RegExp(radioCsubstep.identifier, 'g');
              radioC.replacementOriginal = radioC.replacementOriginal.replace(regexp3, newIndentifier);
              radioC.extraReplacements.forEach((extraReplacement) => {
                if (radioC.fixContratoTrabjo) extraReplacement.replacementOriginal = extraReplacement.replacementOriginal.replace(regexp3, newIndentifier)
              });
              radioCsubstep.wordToReplace = newIndentifier;
              // Mirar si se puede quitar esto
              radioCsubstep.identifier = newIndentifier;
              radioCsubstep.inherited = true;
            });
          });
          refreshRadioCInputs.push(subStep);
        }
        if (subStep.type === 'iForEach') {
          subStep.content.forEach((content) => {
            const regexp2 = new RegExp(content.wordToReplace, 'g');
            content.replacementOriginal = content.replacementOriginal.replace(regexp2, subStep.wordToReplace);
            content.subSteps.forEach((contentSubstep) => {
              contentSubstep.wordToReplace = contentSubstep.wordToReplace.replace(regexp2, subStep.wordToReplace);
              contentSubstep.identifier = contentSubstep.identifier.replace(regexp2, subStep.wordToReplace);

            });
            content.wordToReplace = subStep.wordToReplace;
            content.identifier = subStep.wordToReplace;
          });
          refreshForEachInputs.push(subStep);
        }

        if (subStep.type === 'iNumber') {
          subStep.rules.forEach((rule) => {
            if (rule.rulename === 'extraReplacementToCharacter') {
              const newRuleIdentifier = 'i' + Math.random().toString(36).substring(7) + rule.identifier;
              rule.wordToReplace = newRuleIdentifier;
              const regexp4 = new RegExp(rule.identifier, 'g');
              replacement = replacement.replace(regexp4, newRuleIdentifier);
            }
          });
          if (subStep.rules.length) {
            refreshNormalInputs.push(subStep);
          }
        }

        if (subStep.type === 'iRadioB') {
          refreshRadioBInputs.push(subStep);
        }
        this.steps.splice(((index + 1) + subStepIndex), 0, subStep);
      });
      radio.replacement = replacement;
      radio.checked = true;
    };
    // 1. Find the step
    this.steps.forEach((step, index) => {
      if (step.identifier === wordToReplace) {
        // 2. Find radio selected
        step.radios.forEach((radio) => {
          if (radio.radioId === radioSelectedId) {
            buildSelectedRadio(step, index, radio);
          } else {
            radio.checked = false;
          }
        });
      } else if (step.inheritFromRadioC) {
        if (step.inheritFromRadioC === wordToReplace) {
          step.radios.forEach((radio) => {
            if (radio.radioId === radioSelectedId) {
              buildSelectedRadio(step, index, radio);
            } else {
              radio.checked = false;
            }
          });
        }
      }

      if (step.wordToReplace === wordToReplace) {
        step.isFocused = true;
        step.radioCfocused = radioCfocused;
      } else {
        step.isFocused = false;
      }
    });

    refreshForEachInputs.forEach((forEachInput) => {
      this.buildForEach(forEachInput.value, forEachInput.wordToReplace, false, true);
    });
    refreshRadioCInputs.forEach((step) => {
      step.radios.forEach((radio) => {
        if (radio.checked) {
          this.onInputRadioCSelected(radio.radioId, step.wordToReplace, false);
        }
      });
    });
    refreshNormalInputs.forEach((input) => {
      this.input(input.replacement, input.wordToReplace, false);
    });
    refreshRadioBInputs.forEach((step) => {
      step.radios.forEach((radio) => {
        if (radio.checked) {
          this.onInputRadioBSelected(radio.radioId, step.wordToReplace, false, true);
        }
      });
    });

    if (buildDocumentAfter) {
      this.buildDocument(true, false, checkCache);
    }
  }

  onInputCheckboxSelected(checkboxIdentifier: any, wordToReplace: any, checked: any, buildDocumentAfter: boolean = true) {
    // 1. Find the step
    this.steps.forEach((step, index) => {
      if (step.wordToReplace === wordToReplace) {
        let replacement = step.replacementOriginal;
        // 2. Find checkbox selected
        step.checkboxes.forEach((checkbox: any) => {
          // Make step unique modifying identifier
          checkbox.wordToReplace = step.wordToReplace + checkbox.identifier;
          replacement = replacement.replace(checkbox.identifier, checkbox.wordToReplace);
          if (checkbox.identifier === checkboxIdentifier) {
            // 3. Clean possible previously added steps, so we don't repeat them
            const lengthOfRestOfArray = this.steps.length - index;
            for (let i = 0; i < lengthOfRestOfArray; i++) {
              if (this.steps[(index + 1) + i] && this.steps[(index + 1) + i].wordToReplace.includes(checkbox.identifier)) {
                this.steps.splice((index + 1 + i), 1);
              }
            }
            // 2. Add steps
            if (checked) {
              let replacementSubstep = checkbox.replacementOriginal;
              checkbox.subSteps.forEach((subStep, subStepIndex) => {
                subStep.wordToReplace = checkbox.wordToReplace + subStep.identifier;
                replacementSubstep = replacementSubstep.replace(subStep.identifier, subStep.wordToReplace);
                this.steps.splice(((index + 1) + subStepIndex), 0, subStep);
              });
              checkbox.replacement = replacementSubstep;
            }
            checkbox.checked = checked;
          }
        });
        step.replacement = replacement;
        // Aplly rules
        if (step.rules && step.rules.length) {
          step.rules.forEach((rule: any) => {
            if (rule.condition === 'noneIsChecked') {
              let isAnyCheck = false;
              step.checkboxes.forEach((checkbox: any) => {
                if (checkbox.checked) { isAnyCheck = true; }
              });
              if (!isAnyCheck) {
                step.replacement = rule.replacement;
                rule.isFulfilled = true;
              } else {
                rule.isFulfilled = false;
              }
            }
          });
        }
      }
    });
    if (buildDocumentAfter) {
      this.buildDocument();
    }
  }

  getStepsModel() {
    return this.steps;
  }
}
