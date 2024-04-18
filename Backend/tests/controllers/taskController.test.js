const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { expect } = chai;

chai.use(chaiHttp);

describe('Task Controller Tests', () => {
    describe('POST /tasks', () => {
        it('should create a new task', (done) => {
            const requestBody = {
                userId: 1,
                taskName: 'New Task',
                taskDescription: 'Task Description'
            };
            chai.request(app)
                .post('/tasks')
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message').equal('Task added successfully');
                    done();
                });
        });
    });

    describe('GET /tasks/:userId', () => {
        it('should get all tasks for a user', (done) => {
            const userId = 1; // Assuming user ID 1 exists
            chai.request(app)
                .get(`/tasks/${userId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('PUT /tasks/:taskId', () => {
        it('should update an existing task', (done) => {
            const taskId = 1; // Assuming task ID 1 exists
            const requestBody = {
                taskName: 'Updated Task Name',
                taskDescription: 'Updated Task Description'
            };
            chai.request(app)
                .put(`/tasks/${taskId}`)
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Task updated successfully');
                    done();
                });
        });
    });

    describe('DELETE /tasks/:taskId', () => {
        it('should delete an existing task', (done) => {
            const taskId = 1; // Assuming task ID 1 exists
            chai.request(app)
                .delete(`/tasks/${taskId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Task deleted successfully');
                    done();
                });
        });
    });
});
