app.get('/students', (req, res) => {
  let result = [...students];

  // filtering: /students?minMarks=80
  if (req.query.minMarks) {
    result = result.filter(s => s.marks >= Number(req.query.minMarks));
  }

  // sorting: /students?sort=marks&order=desc
  if (req.query.sort) {
    const dir = req.query.order === 'desc' ? -1 : 1;
    result.sort((a, b) => (a[req.query.sort] > b[req.query.sort] ? dir : -dir));
  }

  // pagination: /students?page=2&limit=10
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const start = (page - 1) * limit;
  result = result.slice(start, start + limit);

  res.json({
    page,
    limit,
    total: students.length,
    data: result
  });
});