const mongoose = require("mongoose");

const DetailsSchema = new mongoose.Schema(
  {
    summary: {
      id: {
        type: String,
        required: [true, "Hotel details must contain an ID"],
        unique: true,
        trim: true,
      },

      name: {
        type: String,
        required: [true, "A hotel must have a name"],
      },

      pointsOfInterest: [
        {
          title: {
            type: String,
            required: [true, "A place must have a name"],
            trim: true,
          },

          subtitle: String,

          coordinates: {
            type: ["Point"],
          },
        },
      ],

      policies: {
        checkinInstructions: [String],
        pets: [String],
        shouldMention: [String],
      },

      amenities: [
        {
          title: {
            type: String,
            trim: true,
            required: [true, "Amenities must have a name"],
          },

          contents: [
            {
              text: String,
              items: [String],
            },
          ],
        },
      ],

      topAmenities: [String],
      location: {
        address: {
          addressLine: String,
          city: String,
          province: String,
          countryCode: String,
        },

        whatsAround: String,
      },
    },

    propertyGallery: [
      {
        alt: {
          type: String,
          required: [
            true,
            "A photo must have a description for accessibility purposes",
          ],
          maxLength: [1000, "Photo description is too long"],
        },
        url: {
          type: String,
          required: [
            true,
            "A photo must have a url path that specifies the photo",
          ],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

const Details = mongoose.model("Details", DetailsSchema);
module.exports = Details;
