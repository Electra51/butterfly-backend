import bookingModel from "../models/bookingModel.js";

export const addBooking = async (req, res) => {
  try {
    const {
      serviceName,
      serviceImg,
      category,
      price,
      discount,
      totalPrice,
      clientName,
      email,
      age,
      address,
      message,
      appointmentDate,
      paymentMethod,
    } = req.body;

    if (
      !serviceName ||
      !serviceImg ||
      !category ||
      !price ||
      !discount ||
      !totalPrice ||
      !clientName ||
      !email ||
      !age ||
      !address ||
      !appointmentDate ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided." });
    }

    const newBooking = new bookingModel({
      serviceName,
      serviceImg,
      category,
      price,
      discount,
      totalPrice,
      clientName,
      email,
      age,
      address,
      message,
      appointmentDate,
      paymentMethod,
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking appointment added successfully.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred while adding the booking appointment.",
    });
  }
};

export const getAllBooking = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate("category");
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Error fetching bookings" });
  }
};
