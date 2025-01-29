import servicesModel from "../models/servicesModel.js";

export const createService = async (req, res) => {
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

export const getAllService = async (req, res) => {
  try {
    const services = await servicesModel.find().populate("category");
    if (services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Error fetching services" });
  }
};

export const getIdWishService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await servicesModel.findById(id).populate("category");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Error fetching service" });
  }
};
