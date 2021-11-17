var service = require("./reviews.service");
var asyncErrorBoundary = require("../errors/asyncErrorBoundary");
var reduceProperties = require("../utils/reduce-properties");

async function reviewExists(req, res, next) {
    let { reviewId } = req.params;
  
    let review = await service.read(reviewId);
  
    if (review) {
      res.locals.reviewId = reviewId;
      res.locals.review = review;
      return next();
    }
  
    next({ status: 404, message: `Review cannot be found.` });
  }

async function update(req, res, next) {
    let { review_id } = res.locals.review;
    let success = await service.update(review_id, req.body.data);
    if (success ==! 1) return next({ status: 500, message: 'Update failed'});

    let data = await service.updatedRead(review_id);
    let reducedReview = reduceProperties("review_id", {
      preferred_name: ["critic", "preferred_name"],
      surname: ["critic", "surname"],
      organization_name: ["critic", "organization_name"],
    });
  
    res.json({ data: reducedReview(data)[0] });
  }

async function destroy(req,res,next) {
    let {review_id} = res.locals.review;
    let data = await service.delete(review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}