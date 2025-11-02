import express from 'express';
import {
  dismissAlert,
  getLeakAlerts,
  getLeakDetectionSystemStatus,
  getWaterLevelReadings,
  getWaterLevelSummary,
} from './waterLevel.js';

const router = express.Router();

// Water level readings endpoints
router.get('/water-level/readings', getWaterLevelReadings);
router.get('/water-level/alerts', getLeakAlerts);
router.post('/water-level/alerts/dismiss', dismissAlert);
router.get('/water-level/status', getLeakDetectionSystemStatus);
router.get('/water-level/summary', getWaterLevelSummary);

export default router;
