import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_provider = require('../models/provider')


// Set up provider's profile

describe('provider profile', function() {

    it("should update provider's personal information", function(done) {

    })

    it("should update provider's company details", function(done) {

    })

    it("should update provider's credit card information", function(done) {

    })

    it("should update provider's membership", function(done) {

    })


    it("should cancel provider's membership", function(done) {

    })

    it("should create provider's widget code", function(done) {

    })



})