"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeResolver = void 0;
const Employee_1 = require("../entities/Employee");
const type_graphql_1 = require("type-graphql");
let EmployeeResolver = class EmployeeResolver {
    async employees() {
        return await Employee_1.Employee.find();
    }
    async employee(id) {
        return await Employee_1.Employee.findOne(id);
    }
    async createEmployee(name) {
        const newEmployee = Employee_1.Employee.create({ name }).save();
        return newEmployee;
    }
    async updateEmployee(id, name) {
        const updatedEmployee = await Employee_1.Employee.findOne(id);
        if (!updatedEmployee) {
            return null;
        }
        if (name) {
            Object.assign(updatedEmployee, { name });
            await updatedEmployee.save();
        }
        return updatedEmployee;
    }
    async deleteEmployee(id) {
        const deletedEmployee = await Employee_1.Employee.findOne(id);
        await Employee_1.Employee.delete(id);
        return deletedEmployee;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Employee_1.Employee]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "employees", null);
__decorate([
    (0, type_graphql_1.Query)(() => Employee_1.Employee, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "employee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Employee_1.Employee),
    __param(0, (0, type_graphql_1.Arg)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "createEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Employee_1.Employee, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "updateEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Employee_1.Employee),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeeResolver.prototype, "deleteEmployee", null);
EmployeeResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], EmployeeResolver);
exports.EmployeeResolver = EmployeeResolver;
//# sourceMappingURL=employee.js.map