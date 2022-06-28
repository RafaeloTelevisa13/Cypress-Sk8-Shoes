import 'cypress-file-upload';

describe('Check contract', () => {
  it('Add contract', () => {
    cy.visit('https://cw-playground.netlify.app')
    cy.get('a[href*="/playground"]').click()
    cy.contains('Add contract').click()
    cy.get('input[id="contract-name"]').type('Testing')
    cy.get('input[id="contract-address"]').type('testing')
    //Add to files
    cy.get('input[type="file"]').eq(0).attachFile("handle_msg.json")
    cy.get('input[id="jsonFile"]').eq(1).attachFile("query_msg.json")
    cy.get('button[ class="sk-bg-black50 sk-border-black50 sk-text-white sk-border-2 sk-w-fit sk-flex sk-items-center sk-justify-center sk-rounded sk-py-2 sk-px-5"]').click()
    //To open the contract
    cy.get('span[class="underline underline-offset-1"]').click()
    //Search into input
    cy.get('input[id="searchMessage"]').type('increment')
    cy.get('img[alt="chevron up"]').eq(0).click();
    cy.get('input[name="increment.author"]').type('testing');
    cy.get('img[alt="chevron up"]').eq(1).click();
    cy.get('input[id="searchQuery"]').type('get')
    
    //Return
    cy.clock().then((clock) => {
      clock.tick(10000)
      cy.contains('Return').click()
    })
 
  })
})