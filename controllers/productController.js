export const createProduct = async (req, res) => {
  try {
    const {
      name,
      availability,
      category,
      discount,
      price,
      icon,
      tag,
      detail,
      material,
      works_how,
      price_per_time,
      status,
    } = req.body;
    if (!name || !category || !price || !icon) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const formattedDetails = detail?.map((d) => ({
      question1: d.question1 || "",
      ans1: d.ans1 || "",
      img: d.img || "",
    }));

    const serviceAdd = new servicesModel({
      name,
      availability,
      category,
      discount,
      price,
      tag,
      detail: formattedDetails,
      material,
      icon,
      works_how,
      price_per_time,
      status,
    });

    await serviceAdd.save();
    res.status(201).json(serviceAdd);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Error creating service" });
  }
};
