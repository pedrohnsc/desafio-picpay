/// <reference types="cypress" />

import constants from '../../support/constants'

describe('Manipulando Usuário', () => {
  const token = 'Bearer 2275e2cbbf8dc1d113b25fb018cdb2e07e088b35bb5f7b7c13ca160ed96a82ba'
  let id

  describe('POST de criar Usuario, GET, para listar o usuario, PUT alterar usuario, e DELETE deletar usuário', () => {
    before(('Post criar usuário', () => {
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
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq(constants.RANDOM_NAME)
        id = response.body.data.id
      })
    }))

    it('GET - Retornar usuário criado no POST de criar usuário', () => {
      cy.request({
        method: 'GET',
        url: '/',
        headers: {
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8'
        },
        qs: { name: constants.RANDOM_NAME }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data[0].name).to.eq(constants.RANDOM_NAME)
      })
    })
  })

  describe('PUT - Editar e visualizar usuário editado', () => {
    it('PUT - Alterar usuário criado no before', () => {
      cy.request({
        method: 'PUT',
        url: '/' + id,
        body: {
          name: 'Pedro alterei aqui'
        },
        headers: {
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq('Pedro alterei aqui')
      })
    })

    it('GET - Retornar usuário alterado no PUT', () => {
      cy.request({
        method: 'GET',
        url: '/' + id,
        headers: {
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.data.name).to.eq('Pedro alterei aqui')
      })
    })
  })

  describe('DELETE - Excluir o usuário que foi editado', () => {
    it('DELETE - Excluir usuário editado', () => {
      cy.request({
        method: 'DELETE',
        url: '/' + id,
        headers: {
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('GET - Retornar usuário excluído', () => {
      cy.request({
        method: 'GET',
        url: '/' + id,
        headers: {
          Authorization: token,
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
