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
let SubmitReviewInput = class SubmitReviewInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SubmitReviewInput.prototype, "reviewedBy", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SubmitReviewInput.prototype, "reviewedEmployee", void 0);
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
    async submitFeedback({ reviewedBy, reviewedEmployee, feedback, rating }) {
        const draftReview = await Review_1.Review.findOne({ where: { reviewedBy, reviewedEmployee } });
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
        console.log('draft =>', draftReview);
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
    (0, type_graphql_1.Mutation)(() => ReviewResponse),
    __param(0, (0, type_graphql_1.Arg)("submitInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SubmitReviewInput]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "submitFeedback", null);
ReviewResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=review.js.map