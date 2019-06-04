const request = require('supertest');
const mongoose = require('mongoose');
const { Student } = require('../../models/student');

let server;
describe('/api/students', () => {
    beforeEach(() => { server = require('../../index'); });

    afterEach(async() => {
        server.close();
        await Student.remove({});
    });

    describe('GET /', () => {
        it('should return all students', async() => {
            Student.collection.insertMany([
                { name: 'student1 name', surname: 'student1 surname', age: 10, courses: ['course1', 'course2'] },
                { name: 'student2 name', surname: 'student2 surname', age: 10, courses: ['course1', 'course2'] },
            ]);

            const res = await request(server).get('/api/students');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(s => s.name === 'student1 name')).toBeTruthy();
            expect(res.body.some(s => s.name === 'student2 name')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return 404 if invalid id is passed', async() => {
            const res = await request(server).get('/api/students/1');
            expect(res.status).toBe(404);
        });

        it('should return 404 if no student with the given id exist', async() => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/students/' + id);
            expect(res.status).toBe(404);
        });

        it('should return the student with the given id', async() => {
            const student = new Student({ name: 'student1 name', surname: 'student1 surname', age: 10, courses: ['course1', 'course2'] })
            await student.save();

            const res = await request(server).get('/api/students/' + student._id);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', student.name);
        });
    })
});