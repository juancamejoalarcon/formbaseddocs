import { steps, outputExpected } from './forms/contrato-compraventa-vehiculo';

describe('Modelos page', () => {

    describe('Meta tags and links', () => {
        it('Visit modelo page', () => {
            cy.visit('/static/modelos/contrato-compraventa-vehiculo')
        })

        it("should have canonical url", () => {
            cy.get('link[rel="canonical"]').should("have.attr", "href", Cypress.config().baseUrl + "/static/modelos/contrato-compraventa-vehiculo");
        });
    })
    describe('Form', () => {
        it('Visit form page', () => {
            cy.visit(`/certified-forms/${'contrato-compraventa-vehiculo'}`)
        })

        describe('Fill form', () => {
            it('Get to final step', () => {
                cy.get('.button-filled--start-form').click()
                cy.wait(400)
                cy.get('#modal-button').click()
                steps.forEach((step) => {
                    switch (step.type) {
                        case 'number':
                        case 'text':
                            if (step.value !== '') {
                                cy.get('input[type=text]').type(step.value)
                            }
                            break;
                        case 'textarea':
                            if (step.value !== '') {
                                cy.get('textarea').type(step.value)
                            }
                            break;
                        case 'date':
                            cy.get('input[type=date]').type(step.value)
                            break;
                        case 'range':
                            cy.get('input[type=range]')
                                .invoke('val', parseInt(step.value))
                                .trigger('change')
                            break;
                        case 'radioB':
                        case 'radioC':
                            cy.get('.form-creator__fields-area__field__middle > div')
                                .children()
                                .eq(parseInt(step.value) - 1)
                                .find('span')
                                .click();

                            break;
                        case 'select':
                            cy.get('select > option')
                                .eq(parseInt(step.value) - 1)
                                .then(e => cy.get('select').select(e.val()))
                            break;

                        default:
                            break;
                    }
                    cy.get('.icon-chevron-right-solid').click()
                })
            })
            it('Text should be expected', () => {
                cy.get('document').children().eq(6).should($el => {
                    expect($el[0].textContent).to.equal(outputExpected)
                })
            })

        });

    })
})