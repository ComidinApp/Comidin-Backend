const employeesToNotify = await Employee.findEmployeesByCommerceIdAndRoleIds(
  orderFull.commerce_id,
  [1, 5, 6]
);