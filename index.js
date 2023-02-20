"use strict";
class AbsenceManager {
    constructor() {
        this.absenceRequests = [];
        this.users = [
            { id: 1, username: 'admin', password: 'password' },
            { id: 2, username: 'user', password: 'password' },
        ];
    }
    addAbsenceRequest(request) {
        this.absenceRequests.push(request);
    }
    approveAbsenceRequest(id) {
        const request = this.absenceRequests.find(request => request.id === id);
        if (request) {
            request.status = 'Approved';
        }
    }
    denyAbsenceRequest(id) {
        const request = this.absenceRequests.find(request => request.id === id);
        if (request) {
            request.status = 'Denied';
        }
    }
    getAbsenceRequests() {
        return this.absenceRequests;
    }
    getUser(username) {
        return this.users.find(user => user.username === username);
    }
}
class NotificationManager {
    sendNotification(user, message) {
        console.log(`Sending notification to ${user.username}: ${message}`);
    }
}
class DatabaseManager {
    constructor() {
        // Initialize database connection
        this.connection; // Initialize database connection here
    }
    saveAbsenceRequest(request) {
        // Save absence request to database
        this.connection.save(request);
    }
}
// Example usage
const absenceManager = new AbsenceManager();
const notificationManager = new NotificationManager();
const databaseManager = new DatabaseManager();
const user = absenceManager.getUser('admin');
if (user && user.password === 'password') {
    absenceManager.addAbsenceRequest({
        id: 1,
        employeeName: 'John Smith',
        startDate: new Date(2023, 2, 1),
        endDate: new Date(2023, 2, 3),
        status: 'Pending'
    });
    const request = absenceManager.getAbsenceRequests()[0];
    databaseManager.saveAbsenceRequest(request);
    notificationManager.sendNotification(user, `New absence request from ${request.employeeName}`);
}
else {
    console.log('Invalid username or password');
}
