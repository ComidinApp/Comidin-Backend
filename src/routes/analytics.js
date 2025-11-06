const express = require('express');
const router = express.Router();
const { getOverview } = require('../controllers/analyticsController');
const { getExecutiveReportPDF, getOrdersExportXLSX } = require('../controllers/analyticsReportController');

router.get('/overview', getOverview);
router.get('/report/executive', getExecutiveReportPDF); // PDF (R1)
router.get('/report/export', getOrdersExportXLSX);      // XLSX (R6)

module.exports = router;
