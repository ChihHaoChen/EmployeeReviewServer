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
exports.ReviewResolver = void 0;
const Review_1 = require("../entities/Review");
const type_graphql_1 = require("type-graphql");
const Employee_1 = require("../entities/Employee");
let SubmitReviewInput = class SubmitReviewInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SubmitReviewInput.prototype, "reviewedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SubmitReviewInput.prototype, "reviewedEmployeeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SubmitReviewInput.prototype, "feedback", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SubmitReviewInput.prototype, "rating", void 0);
SubmitReviewInput = __decorate([
    (0, type_graphql_1.InputType)()
], SubmitReviewInput);
let ReviewAdminInput = class ReviewAdminInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewAdminInput.prototype, "reviewedEmployeeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReviewAdminInput.prototype, "feedback", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReviewAdminInput.prototype, "rating", void 0);
ReviewAdminInput = __decorate([
    (0, type_graphql_1.InputType)()
], ReviewAdminInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let ReviewResponse = class ReviewResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], ReviewResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Review_1.Review, { nullable: true }),
    __metadata("design:type", Review_1.Review)
], ReviewResponse.prototype, "review", void 0);
ReviewResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], ReviewResponse);
let ReviewResolver = class ReviewResolver {
    async reviews() {
        return await Review_1.Review.find();
    }
    async reviewedEmployee(review) {
        return await Employee_1.Employee.findOne({ id: review.reviewedEmployeeId });
    }
    async assignReview(reviewedBy, revieweeId) {
        const unfinishedReview = await Review_1.Review.findOne({
            where: { reviewedBy, reviewedEmployeeId: revieweeId, isCompleted: false },
            relations: ['reviewedEmployee']
        });
        if (unfinishedReview !== undefined)
            return;
        return await Review_1.Review.create({
            reviewedBy: reviewedBy,
            reviewedEmployeeId: revieweeId,
            feedback: ''
        }).save();
    }
    async adminReview({ feedback, rating, reviewedEmployeeId }) {
        const existingAdminReview = await Review_1.Review.findOne({ reviewedBy: 'admin', reviewedEmployeeId });
        const inputState = {
            reviewedBy: 'admin',
            reviewedEmployeeId: reviewedEmployeeId,
            isCompleted: true,
            rating,
            feedback
        };
        if (existingAdminReview !== undefined) {
            Object.assign(existingAdminReview, inputState);
            await existingAdminReview.save();
            return existingAdminReview;
        }
        return await Review_1.Review.create(inputState).save();
    }
    async submitFeedback({ reviewedBy, feedback, rating, reviewedEmployeeId }) {
        const draftReview = await Review_1.Review.findOne({ reviewedBy, reviewedEmployeeId });
        if (!draftReview) {
            return {
                errors: [{
                        field: "database",
                        message: "No this piece of data in database"
                    }]
            };
        }
        Object.assign(draftReview, {
            feedback,
            rating,
            isCompleted: true
        });
        await draftReview.save();
        return { draftReview };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Review_1.Review]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "reviews", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(() => Employee_1.Employee),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Review_1.Review]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "reviewedEmployee", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Review_1.Review),
    __param(0, (0, type_graphql_1.Arg)('reviewerName')),
    __param(1, (0, type_graphql_1.Arg)('revieweeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "assignReview", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Review_1.Review),
    __param(0, (0, type_graphql_1.Arg)('reviewAdminInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReviewAdminInput]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "adminReview", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ReviewResponse),
    __param(0, (0, type_graphql_1.Arg)('submitInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SubmitReviewInput]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "submitFeedback", null);
ReviewResolver = __decorate([
    (0, type_graphql_1.Resolver)(() => Review_1.Review)
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.js.map