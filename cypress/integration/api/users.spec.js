/// <reference types="cypress" />

import constants from '../../support/constants'

describe('Valida os endpoints de usuários', () => {
  let id

  describe('POST de criar Usuario, GET, para listar o usuario, PUT alterar usuario, e DELETE deletar usuário', () => {
    before(('Deve criar um usuário', () => {
      cy.request({
        method: 'POST',
        url: '/',
        body: {
          name: constants.RANDOM_NAME,
          email: constants.RANDOM_EMAIL,
          gender: 'Male',
          status: 'Active'
        },
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq(constants.RANDOM_NAME)
        id = response.body.data.id
      })
    }))

    it('GET - Deve retornar usuário criado no POST de criar usuário', () => {
      cy.request({
        method: 'GET',
        url: '/',
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        },
        qs: { name: constants.RANDOM_NAME }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0].name).to.eq(constants.RANDOM_NAME)
      })
    })
  })

  describe('PUT - Deve editar e visualizar usuário editado', () => {
    it('PUT - Alterar usuário criado no before', () => {
      cy.request({
        method: 'PUT',
        url: '/' + id,
        body: {
          name: 'Pedro alterei aqui'
        },
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq('Pedro alterei aqui')
      })
    })

    it('GET - Deve retornar usuário alterado no PUT', () => {
      cy.request({
        method: 'GET',
        url: '/' + id,
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq('Pedro alterei aqui')
      })
    })
  })

  describe('DELETE - Deve excluir o usuário que foi editado', () => {
    it('DELETE - Excluir usuário editado', () => {
      cy.request({
        method: 'DELETE',
        url: '/' + id,
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('GET - Deve retornar usuário excluído', () => {
      cy.request({
        method: 'GET',
        url: '/' + id,
        headers: {
          Authorization: constants.TOKEN,
          'Content-type': 'application/json; charset=UTF-8'
        },
        qs: { name: 'Pedro alterei aqui' }
      }).then((response) => {
        expect(response.body.data[0]).to.not.exist
        expect(response.status).to.eq(200)
      })
    })
  })
})
