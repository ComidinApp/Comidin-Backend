const Subscription = require('../models/subscription');
const PlanBenefit = require('../models/planBenefits');

async function getBenefitsByCommerceId(commerceId) {
  const cid = Number(commerceId);

 
  const sub = await Subscription.findOne({ where: { commerce_id: cid } });
  const planId = sub?.plan_id ? Number(sub.plan_id) : 1;

  const benefits = await PlanBenefit.findOne({ where: { plan_id: planId } });

  if (!benefits) {
    return {
      plan_id: planId,
      max_publications: 0,
      can_add_stock: false,
      commerce_listing_visibility: false,
      access_reports: false,
      manage_employees_roles: false,
      better_search_position: false,
      exclusive_promotions: false,
    };
  }

  return benefits;
}

module.exports = { getBenefitsByCommerceId };
