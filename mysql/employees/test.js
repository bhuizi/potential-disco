import express from "express";
import supertest from "supertest";
import {expect} from "chai";

const app = express();

// Mock route handler for testing
function mockReadHandler(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Missing URL parameter: employeeId");
    }
    // Return a mock response
    const mockEmployeeData = { id, name: "Mock Employee" };
    res.json(mockEmployeeData);
  }
  
app.get('/employee/:id?', mockReadHandler);

describe('GET /employee/:id', () => {
    it('should return 400 if no ID is passed', async () => {
      const response = await supertest(app).get('/employee/');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal("Missing URL parameter: employeeId");
    });
  
    it('should return mock employee data if valid ID is passed', async () => {
      const response = await supertest(app).get('/employee/123');
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: '123', name: "Mock Employee" });
    });
  });
  
