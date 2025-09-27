const pool = require("../config/db");

// 1. Get all Argo IDs for first dropdown
const getArgoIds = async (req, res) => {
  try {
    const result = await pool.query("SELECT argo_id FROM argos ORDER BY argo_id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Get all cycles for a selected Argo ID
const getCyclesByArgo = async (req, res) => {
  try {
    const { argoId } = req.params;
    const result = await pool.query(
      `SELECT cycle_id, pres_mean_dbar AS mean_press, temp_mean_degC AS mean_temp, 
              psal_mean_psu AS mean_salinity, latitude AS lat, longitude AS long
       FROM argo_cycles
       WHERE argo_id = $1
       ORDER BY cycle_id`,
      [argoId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Get all measurements for selected Argo ID + cycle ID
const getCycleDetails = async (req, res) => {
  try {
    const { argoId, cycleId } = req.params;
    const result = await pool.query(
      `SELECT depth_index AS depth, temp_degC AS temp, pres_dbar AS press, psal_psu AS salinity,
              latitude AS lat, longitude AS long
       FROM argo_measurements m
       JOIN argo_cycles c ON m.argo_id = c.argo_id AND m.cycle_id = c.cycle_id
       WHERE m.argo_id = $1 AND m.cycle_id = $2
       ORDER BY depth_index`,
      [argoId, cycleId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getArgoIds, getCyclesByArgo, getCycleDetails };
