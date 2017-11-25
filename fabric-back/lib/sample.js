/**
 * Track the trade of a commodity from one trader to another
 * @param {org.acme.sample.Trade} trade - the trade to be processed
 * @transaction
 */
function tradeCommodity(trade) {
    trade.commodity.owner = trade.newOwner;
    return getAssetRegistry('org.acme.sample.Commodity')
        .then(function (assetRegistry) {
            return assetRegistry.update(trade.commodity);
        });
}

/**
 * Track the trade of a comment from user to organization
 * @param {org.acme.sample.UserComment} userComment - the trade to be processed
 * @transaction
 */
function tradeComment(userComment){
     var oldOwner = userComment.comment.owner;
 	 userComment.comment.owner = userComment.newOwner;
     userComment.comment.organizationId = userComment.newOwner.organizationId;
     userComment.comment.userId = oldOwner.userId;
     userComment.comment.username = oldOwner.username;
     userComment.comment.wechatId = oldOwner.wechatId;
     userComment.comment.score = userComment.score;
  	 return getAssetRegistry('org.acme.sample.Comment')
        .then(function (assetRegistry) {
            return assetRegistry.update(userComment.comment);
        });
}